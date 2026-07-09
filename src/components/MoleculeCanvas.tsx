import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { AlertTriangle, Cpu, RefreshCw, Check, Info } from "lucide-react";
import { Atom, Bond, ElementInfo } from "../types";
import { getElement } from "../data/elements";

// Error boundary to catch WebGL or R3F rendering failures
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class CanvasErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("React Three Fiber/WebGL error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Interactive 2D schematic of the molecule if WebGL fails
const WebGLFallback: React.FC<{
  atoms: Atom[];
  bonds: Bond[];
  onRetry: () => void;
}> = ({ atoms, bonds, onRetry }) => {
  const [selectedAtomId, setSelectedAtomId] = useState<string | null>(null);

  // Group bonds per atom for easy connectivity view
  const connectionsMap = useMemo(() => {
    const map = new Map<string, Array<{ partner: Atom; order: number }>>();
    
    // Build atom map for quick lookup
    const atomLookup = new Map<string, Atom>();
    atoms.forEach(a => atomLookup.set(a.id, a));

    atoms.forEach(a => map.set(a.id, []));

    bonds.forEach(bond => {
      const fromAtom = atomLookup.get(bond.from);
      const toAtom = atomLookup.get(bond.to);
      if (fromAtom && toAtom) {
        map.get(bond.from)?.push({ partner: toAtom, order: bond.order });
        map.get(bond.to)?.push({ partner: fromAtom, order: bond.order });
      }
    });

    return { map, atomLookup };
  }, [atoms, bonds]);

  const selectedAtomData = selectedAtomId ? connectionsMap.atomLookup.get(selectedAtomId) : null;
  const selectedAtomConnections = selectedAtomId ? connectionsMap.map.get(selectedAtomId) || [] : [];

  return (
    <div className="w-full h-full min-h-[480px] bg-slate-950 p-4 lg:p-6 flex flex-col xl:flex-row gap-5 overflow-y-auto max-h-[85vh]">
      {/* Troubleshooting guide */}
      <div className="flex-1 max-w-xl bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-amber-400">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">WebGL Graphics Blocked or Disabled</h3>
              <p className="text-xs text-slate-400">We detected that WebGL hardware acceleration failed to initialize.</p>
            </div>
          </div>

          <div className="h-[1px] bg-slate-800/80 my-1" />

          {/* Platform customized troubleshooting */}
          <div className="flex flex-col gap-4 text-xs text-slate-300">
            {/* Brave section */}
            <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-3 flex flex-col gap-2">
              <span className="font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                🦁 Fix for Brave Browser (Shields Protection)
              </span>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Brave's default shields include aggressive fingerprint protection which blocks WebGL canvas tools.
              </p>
              <ol className="list-decimal list-inside text-[11px] space-y-1 text-slate-300 pl-1">
                <li>Click the <span className="font-semibold text-white">Brave Lion shield icon</span> in your URL address bar.</li>
                <li>Turn <span className="font-semibold text-amber-400">OFF Shields</span> for this site (or set fingerprinting to Standard).</li>
                <li>Refresh the page to enjoy the gorgeous 3D visualizer!</li>
              </ol>
            </div>

            {/* Chrome / General section */}
            <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-3 flex flex-col gap-2">
              <span className="font-bold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                <Cpu className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Fix for Google Chrome / Other Browsers
              </span>
              <p className="text-[11px] leading-relaxed text-slate-400">
                WebGL needs hardware acceleration enabled in browser settings to interact with 3D spaces.
              </p>
              <ol className="list-decimal list-inside text-[11px] space-y-1 text-slate-300 pl-1">
                <li>Open Chrome settings (<span className="font-mono text-white">chrome://settings/system</span>).</li>
                <li>Turn ON <span className="font-semibold text-white">"Use graphics acceleration when available"</span>.</li>
                <li>Restart your browser and return to this page.</li>
              </ol>
            </div>
          </div>
        </div>

        <button
          onClick={onRetry}
          className="mt-5 w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-indigo-600/10 border border-indigo-500/30"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Test & Relaunch 3D Visualizer
        </button>
      </div>

      {/* Interactive 2D Blueprint Panel */}
      <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-xl backdrop-blur-sm min-h-[320px]">
        <div>
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-indigo-400" />
            Interactive 2D Blueprint Schematic
          </h4>
          <p className="text-[11px] text-slate-400">WebGL fallback interface. Click any atom to see its bond connections below.</p>
        </div>

        {/* Atom CPK Chip Grid */}
        <div className="flex-1 overflow-y-auto max-h-[220px] bg-slate-950/50 border border-slate-850/60 rounded-xl p-3 flex flex-wrap gap-2.5 content-start">
          {atoms.map((atom) => {
            const info = getElement(atom.element);
            const isSelected = selectedAtomId === atom.id;
            return (
              <button
                key={atom.id}
                onClick={() => setSelectedAtomId(isSelected ? null : atom.id)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left transition cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600/20 border-indigo-500/80 text-white shadow-md shadow-indigo-600/5"
                    : "bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-300"
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full border border-slate-650 shrink-0"
                  style={{ backgroundColor: info.color }}
                />
                <div className="text-[11px]">
                  <span className="font-bold">{info.symbol}</span>
                  <span className="opacity-40 text-[9px] ml-1 font-mono">{atom.id}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic connection output */}
        <div className="bg-slate-950/90 border border-slate-850 rounded-xl p-3 min-h-[110px] flex flex-col justify-between">
          {selectedAtomData ? (
            <div className="flex flex-col gap-2 text-[11px]">
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-1.5">
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: getElement(selectedAtomData.element).color }}
                />
                <span className="font-bold text-slate-200">
                  {getElement(selectedAtomData.element).name} ({getElement(selectedAtomData.element).symbol})
                </span>
                <span className="font-mono text-slate-500 text-[10px]">Atoms bonds list:</span>
              </div>
              {selectedAtomConnections.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {selectedAtomConnections.map((conn, idx) => {
                    const connInfo = getElement(conn.partner.element);
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px]"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: connInfo.color }}
                        />
                        <span className="font-semibold text-slate-300">
                          {connInfo.symbol} <span className="opacity-40 font-mono">({conn.partner.id})</span>
                        </span>
                        <span className="text-[9px] text-indigo-400 font-bold ml-1 px-1 py-0.2 bg-indigo-950/40 rounded border border-indigo-900/10">
                          {conn.order === 1 ? "Single" : conn.order === 2 ? "Double" : conn.order === 3 ? "Triple" : "Aromatic"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-500 italic text-[10px]">No active bonds detected for this atom (monatomic element).</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-slate-500 text-[11px] text-center">
              <Info className="w-5 h-5 text-slate-600 mb-1.5" />
              <span>Select any atom above to explore its molecular bonds and chemical context in detail.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean | null>(null);

  const checkWebGL = () => {
    try {
      const canvas = document.createElement("canvas");
      const supports = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setIsWebGLSupported(supports);
    } catch (e) {
      setIsWebGLSupported(false);
    }
  };

  // Run WebGL compatibility check on mount
  useEffect(() => {
    checkWebGL();
  }, []);

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

  if (isWebGLSupported === false) {
    return (
      <WebGLFallback
        atoms={atoms}
        bonds={bonds}
        onRetry={() => {
          setIsWebGLSupported(null);
          setTimeout(checkWebGL, 200);
        }}
      />
    );
  }

  const fallbackView = (
    <WebGLFallback
      atoms={atoms}
      bonds={bonds}
      onRetry={() => {
        setIsWebGLSupported(null);
        setTimeout(checkWebGL, 200);
      }}
    />
  );

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

      <CanvasErrorBoundary fallback={fallbackView}>
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
      </CanvasErrorBoundary>
    </div>
  );
};
