import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Atom, Bond, ElementInfo } from "../types";
import { getElement } from "../data/elements";

// Helper to calculate bond offsets for multiple bonds (double/triple)
function getOffsetVector(dir: THREE.Vector3, index: number, count: number, spacing: number = 0.18): THREE.Vector3 {
  // Find a vector perpendicular to the bond direction
  let perp = new THREE.Vector3(0, 1, 0);
  if (Math.abs(dir.dot(perp)) > 0.95) {
    perp.set(1, 0, 0);
  }
  const right = new THREE.Vector3().crossVectors(dir, perp).normalize();
  
  if (count === 1) return new THREE.Vector3(0, 0, 0);
  if (count === 2) {
    const factor = index === 0 ? -0.5 : 0.5;
    return right.multiplyScalar(spacing * factor);
  }
  if (count === 3) {
    const factor = index === 0 ? -1 : index === 1 ? 0 : 1;
    return right.multiplyScalar(spacing * factor);
  }
  return new THREE.Vector3(0, 0, 0);
}

// Sub-component to render a single Atom
interface AtomMeshProps {
  atom: Atom;
  style: "ball-stick" | "vdw" | "stick";
  isSelected: boolean;
  onSelect: (atom: Atom) => void;
  hoveredAtomId: string | null;
  setHoveredAtomId: (id: string | null) => void;
}

const AtomMesh: React.FC<AtomMeshProps> = ({
  atom,
  style,
  isSelected,
  onSelect,
  hoveredAtomId,
  setHoveredAtomId,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const elementInfo = useMemo(() => getElement(atom.element), [atom.element]);

  // Determine size based on style
  const radius = useMemo(() => {
    if (style === "vdw") {
      // Use scaled-down VDW radius to look nice
      return elementInfo.radius * 1.6;
    }
    if (style === "stick") {
      return 0.15; // Small joint sphere
    }
    // Ball & stick
    return elementInfo.radius;
  }, [style, elementInfo.radius]);

  const color = elementInfo.color;

  // Pulse animation on selected atom
  useFrame((state) => {
    if (isSelected && meshRef.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.08;
      meshRef.current.scale.set(scale, scale, scale);
    } else if (meshRef.current) {
      meshRef.current.scale.set(1, 1, 1);
    }
  });

  const isHovered = hoveredAtomId === atom.id;

  return (
    <mesh
      ref={meshRef}
      position={new THREE.Vector3(...atom.position)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(atom);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredAtomId(atom.id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        if (hoveredAtomId === atom.id) {
          setHoveredAtomId(null);
        }
        document.body.style.cursor = "auto";
      }}
    >
      <sphereGeometry args={[radius, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.15}
        metalness={0.1}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        emissive={isHovered ? color : "#000000"}
        emissiveIntensity={isHovered ? 0.25 : 0}
      />
    </mesh>
  );
};

// Sub-component to render a single Bond (split in half for CPK coloring)
interface BondMeshProps {
  bond: Bond;
  atomsMap: Map<string, Atom>;
  style: "ball-stick" | "vdw" | "stick";
}

const BondMesh: React.FC<BondMeshProps> = ({ bond, atomsMap, style }) => {
  const atomFrom = atomsMap.get(bond.from);
  const atomTo = atomsMap.get(bond.to);

  if (!atomFrom || !atomTo) return null;

  const posA = useMemo(() => new THREE.Vector3(...atomFrom.position), [atomFrom]);
  const posB = useMemo(() => new THREE.Vector3(...atomTo.position), [atomTo]);

  const elementFrom = useMemo(() => getElement(atomFrom.element), [atomFrom]);
  const elementTo = useMemo(() => getElement(atomTo.element), [atomTo]);

  // Helper to ensure bond colors are bright enough to see clearly on dark background
  const getBondColor = (color: string) => {
    const cleanColor = color.toLowerCase();
    if (cleanColor === "#27272a" || cleanColor === "#202020" || cleanColor === "#000000") {
      return "#71717a"; // Clear zinc-500 silver-grey for high contrast
    }
    return color;
  };

  // Bond settings
  const bondRadius = style === "stick" ? 0.12 : 0.085;
  const doubleSpacing = style === "stick" ? 0.40 : 0.32;

  // Let's render cylinders for this bond
  const cylinders = useMemo(() => {
    const list: Array<{
      key: string;
      position: THREE.Vector3;
      quaternion: THREE.Quaternion;
      length: number;
      color: string;
    }> = [];

    const direction = new THREE.Vector3().subVectors(posB, posA);
    const totalLength = direction.length();
    const normalizedDir = direction.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, normalizedDir);

    const orderCount = bond.order || 1;

    for (let i = 0; i < orderCount; i++) {
      const offset = getOffsetVector(normalizedDir, i, orderCount, doubleSpacing);

      // Half-bond from A to Midpoint
      const halfLength = totalLength / 2;
      const midA = new THREE.Vector3()
        .addVectors(posA, posB)
        .multiplyScalar(0.5)
        .add(posA)
        .multiplyScalar(0.5) // Center of first half
        .add(offset);

      list.push({
        key: `${bond.id}-${i}-halfA`,
        position: midA,
        quaternion,
        length: halfLength,
        color: getBondColor(elementFrom.color),
      });

      // Half-bond from Midpoint to B
      const midB = new THREE.Vector3()
        .addVectors(posA, posB)
        .multiplyScalar(0.5)
        .add(posB)
        .multiplyScalar(0.5) // Center of second half
        .add(offset);

      list.push({
        key: `${bond.id}-${i}-halfB`,
        position: midB,
        quaternion,
        length: halfLength,
        color: getBondColor(elementTo.color),
      });
    }

    return list;
  }, [bond, posA, posB, elementFrom.color, elementTo.color]);

  if (style === "vdw") return null; // No bonds in space-filling model

  return (
    <group>
      {cylinders.map((cyl) => (
        <mesh key={cyl.key} position={cyl.position} quaternion={cyl.quaternion}>
          <cylinderGeometry args={[bondRadius, bondRadius, cyl.length, 16]} />
          <meshStandardMaterial
            color={cyl.color}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

// Component to handle auto-rotation and auto-fitting of the camera
interface SceneManagerProps {
  atoms: Atom[];
  autoRotate: boolean;
}

const SceneManager: React.FC<SceneManagerProps> = ({ atoms, autoRotate }) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Auto-fit camera view on molecule load
  useEffect(() => {
    if (atoms.length === 0) return;

    // Calculate bounding box of the atoms
    const box = new THREE.Box3();
    atoms.forEach((atom) => {
      box.expandByPoint(new THREE.Vector3(...atom.position));
    });

    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Position camera based on molecule size to fit perfectly
    const distance = Math.max(maxDim * 1.5, 6);
    camera.position.set(0, distance * 0.5, distance * 1.2);
    camera.lookAt(0, 0, 0);
  }, [atoms, camera]);

  // Constant rotation
  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25; // Gentle spin
    }
  });

  return <group ref={groupRef}>{/* Visual components will render here */}</group>;
};

interface MoleculeCanvasProps {
  atoms: Atom[];
  bonds: Bond[];
  style: "ball-stick" | "vdw" | "stick";
  autoRotate: boolean;
  selectedAtomId: string | null;
  onSelectAtom: (atom: Atom | null) => void;
  showGrid: boolean;
}

export const MoleculeCanvas: React.FC<MoleculeCanvasProps> = ({
  atoms,
  bonds,
  style,
  autoRotate,
  selectedAtomId,
  onSelectAtom,
  showGrid,
}) => {
  const [hoveredAtomId, setHoveredAtomId] = React.useState<string | null>(null);

  // Map atoms for fast lookup in bonds
  const atomsMap = useMemo(() => {
    const map = new Map<string, Atom>();
    atoms.forEach((atom) => map.set(atom.id, atom));
    return map;
  }, [atoms]);

  // Reset hovered atom if atoms list changes
  useEffect(() => {
    setHoveredAtomId(null);
  }, [atoms]);

  return (
    <div className="w-full h-full relative select-none touch-none bg-slate-950">
      {/* Dynamic Hover Tooltip overlay inside the canvas container */}
      {hoveredAtomId && (
        <div className="absolute top-4 left-4 z-10 pointer-events-none bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 shadow-xl backdrop-blur-md transition-opacity">
          {(() => {
            const atom = atomsMap.get(hoveredAtomId);
            if (!atom) return null;
            const info = getElement(atom.element);
            return (
              <div className="flex items-center gap-2">
                <div
                  className="w-3.5 h-3.5 rounded-full border border-slate-500/50"
                  style={{ backgroundColor: info.color }}
                />
                <span className="font-sans font-semibold text-slate-100 text-sm">
                  {info.name} ({info.symbol})
                </span>
                <span className="font-mono text-xs text-slate-400">
                  ID: {atom.id}
                </span>
              </div>
            );
          })()}
        </div>
      )}

      <Canvas
        camera={{ fov: 45, near: 0.1, far: 100 }}
        shadows
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        <color attach="background" args={["#030712"]} />

        {/* Ambient lighting */}
        <ambientLight intensity={1.2} />

        {/* Key directional light */}
        <directionalLight
          position={[10, 15, 10]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* Fill directional light from opposite side */}
        <directionalLight
          position={[-10, -5, -10]}
          intensity={0.6}
        />

        {/* Soft rim light from top back */}
        <spotLight
          position={[0, 10, -10]}
          intensity={0.8}
          angle={Math.PI / 4}
          penumbra={1}
        />

        {/* Bouncing grid floor indicator for structural feel if toggled */}
        {showGrid && (
          <gridHelper
            args={[30, 30, "#1e293b", "#0f172a"]}
            position={[0, -2.5, 0]}
          />
        )}

        {/* Center the group of items */}
        <group onClick={() => onSelectAtom(null)}>
          <group>
            {/* Render all Bonds */}
            {bonds.map((bond) => (
              <BondMesh
                key={bond.id}
                bond={bond}
                atomsMap={atomsMap}
                style={style}
              />
            ))}

            {/* Render all Atoms */}
            {atoms.map((atom) => (
              <AtomMesh
                key={atom.id}
                atom={atom}
                style={style}
                isSelected={selectedAtomId === atom.id}
                onSelect={onSelectAtom}
                hoveredAtomId={hoveredAtomId}
                setHoveredAtomId={setHoveredAtomId}
              />
            ))}
          </group>

          {/* Manage Camera positioning and Spin */}
          <SceneManager atoms={atoms} autoRotate={autoRotate} />
        </group>

        {/* Smooth camera interaction */}
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.08}
          maxDistance={40}
          minDistance={1.5}
          makeDefault
        />
      </Canvas>
    </div>
  );
};
