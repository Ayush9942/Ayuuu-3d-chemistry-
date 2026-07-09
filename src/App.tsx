import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Sparkles,
  RotateCw,
  Grid3X3,
  Download,
  Info,
  Thermometer,
  Droplets,
  ShieldAlert,
  History,
  Atom,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Bookmark,
  Activity,
  Heart,
  HelpCircle,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MoleculeCanvas } from "./components/MoleculeCanvas";
import { Atom as AtomType, MoleculeData } from "./types";
import { PREDEFINED_MOLECULES, PREDEFINED_KEYS } from "./data/predefinedMolecules";
import { getElement } from "./data/elements";
import { synthesizeMoleculeClientSide } from "./lib/geminiClient";

const LOADING_STEPS = [
  "Formulating electron orbitals...",
  "Calculating covalent bond distances...",
  "Assembling valence electron shells...",
  "Centering atomic coordinate systems...",
  "Retrieving physical properties & boiling points...",
  "Synthesizing safety datasheet (GHS)...",
  "Optimizing 3D molecular geometry..."
];

export default function App() {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMolecule, setCurrentMolecule] = useState<MoleculeData>(PREDEFINED_MOLECULES.water);
  const [selectedMoleculeKey, setSelectedMoleculeKey] = useState<string>("water");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(LOADING_STEPS[0]);
  const [error, setError] = useState<{ type: string; message: string } | null>(null);
  
  // Controls
  const [viewStyle, setViewStyle] = useState<"ball-stick" | "vdw" | "stick">("ball-stick");
  const [autoRotate, setAutoRotate] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const visualizerRef = useRef<HTMLDivElement>(null);
  
  // Selected single atom inspector state
  const [selectedAtom, setSelectedAtom] = useState<AtomType | null>(null);

  // Sync native fullscreen exit (e.g. user pressing ESC key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      try {
        if (visualizerRef.current?.requestFullscreen) {
          await visualizerRef.current.requestFullscreen();
        }
      } catch (e) {
        console.warn("Native fullscreen blocked or unsupported:", e);
      }
    } else {
      setIsFullscreen(false);
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      } catch (e) {
        console.warn("Error exiting native fullscreen:", e);
      }
    }
  };

  // Quick info cycling text during loading
  useEffect(() => {
    if (!isLoading) return;
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % LOADING_STEPS.length;
      setLoadingText(LOADING_STEPS[stepIndex]);
    }, 1400);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Handle selecting an atom from the 3D canvas
  const handleSelectAtom = (atom: AtomType | null) => {
    setSelectedAtom(atom);
  };

  // Perform search (local, direct client-side Gemini, or backend Express endpoint fallback)
  const handleSearch = async (queryStr: string) => {
    const cleanQuery = queryStr.trim().toLowerCase();
    if (!cleanQuery) return;

    setError(null);
    setSelectedAtom(null);

    // Dynamic alias dictionary for intelligent local matches
    const aliases: Record<string, string> = {
      "table salt": "nacl",
      "salt": "nacl",
      "sodium chloride": "nacl",
      "nacl": "nacl",
      "sugar": "glucose",
      "d-glucose": "glucose",
      "glucose": "glucose",
      "c6h12o6": "glucose",
      "aspirin": "aspirin",
      "acetylsalicylic acid": "aspirin",
      "c9h8o4": "aspirin",
      "adrenaline": "adrenaline",
      "epinephrine": "adrenaline",
      "c9h13no3": "adrenaline",
      "water": "water",
      "h2o": "water",
      "oxidane": "water",
      "carbon dioxide": "co2",
      "co2": "co2",
      "methane": "methane",
      "ch4": "methane",
      "natural gas": "methane",
      "alcohol": "ethanol",
      "ethanol": "ethanol",
      "c2h5oh": "ethanol",
      "drinking alcohol": "ethanol",
      "benzene": "benzene",
      "c6h6": "benzene",
      "caffeine": "caffeine",
      "coffee": "caffeine",
      "c8h10n4o2": "caffeine",
      "ammonia": "ammonia",
      "nh3": "ammonia",
      "propane": "propane",
      "c3h8": "propane",
      "acetone": "acetone",
      "propanone": "acetone",
      "c3h6o": "acetone",
      "nail polish": "acetone",
      "ethylene": "ethylene",
      "ethene": "ethylene",
      "c2h4": "ethylene",
      "methanol": "methanol",
      "wood alcohol": "methanol",
      "ch3oh": "methanol",
      "hydrochloric acid": "hcl",
      "muriatic acid": "hcl",
      "hcl": "hcl",
    };

    // Try finding direct alias first
    let matchedPredefinedKey = aliases[cleanQuery];

    // If not found in direct aliases, search in names or formulas
    if (!matchedPredefinedKey) {
      matchedPredefinedKey = PREDEFINED_KEYS.find(
        (k) =>
          k === cleanQuery ||
          PREDEFINED_MOLECULES[k].name.toLowerCase() === cleanQuery ||
          PREDEFINED_MOLECULES[k].name.toLowerCase().includes(cleanQuery) ||
          PREDEFINED_MOLECULES[k].formula.toLowerCase() === cleanQuery.replace(/[₂,₃,₄,₅,₆,₈,₉,₁₀,₁₂,₁₃]/g, "") ||
          PREDEFINED_MOLECULES[k].formula.toLowerCase().replace(/[₂₃₄₅₆₈₉]/g, "") === cleanQuery.replace(/[₂₃₄₅₆₈₉]/g, "")
      );
    }

    if (matchedPredefinedKey) {
      setCurrentMolecule(PREDEFINED_MOLECULES[matchedPredefinedKey]);
      setSelectedMoleculeKey(matchedPredefinedKey);
      setSearchQuery("");
      return;
    }

    setIsLoading(true);

    // Try client-side synthesis directly if client has VITE_GEMINI_API_KEY
    const clientSideApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (clientSideApiKey) {
      try {
        console.log("Synthesizing molecule client-side via VITE_GEMINI_API_KEY...");
        const data = await synthesizeMoleculeClientSide(queryStr, clientSideApiKey);
        setCurrentMolecule(data);
        setSelectedMoleculeKey(""); // Custom search loaded
        setSearchQuery("");
        setIsLoading(false);
        return;
      } catch (err: any) {
        console.error("Client-side synthesis failed, falling back to server:", err);
      }
    }

    // Fallback to full-stack Express API endpoint
    try {
      const response = await fetch("/api/molecule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryStr }),
      });

      if (response.status === 404) {
        throw new Error("SERVER_NOT_AVAILABLE");
      }

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "API_KEY_MISSING") {
          setError({
            type: "API_KEY_MISSING",
            message: data.message || "API key is not configured.",
          });
        } else {
          setError({
            type: "GENERATION_ERROR",
            message: data.message || "Failed to analyze and build 3D structure.",
          });
        }
        setIsLoading(false);
        return;
      }

      // Load successful
      setCurrentMolecule(data);
      setSelectedMoleculeKey(""); // Custom search loaded
      setSearchQuery("");
    } catch (err: any) {
      console.error(err);
      if (err.message === "SERVER_NOT_AVAILABLE") {
        setError({
          type: "VERCEL_STATIC_HOSTING",
          message: "The backend synthesis server is offline because this website is hosted statically on Vercel. Dynamic generation is supported by configuring client-side keys.",
        });
      } else {
        setError({
          type: "CONNECTION_ERROR",
          message: "Unable to contact the synthesis server. Check your network.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const selectPredefined = (key: string) => {
    setError(null);
    setSelectedAtom(null);
    setCurrentMolecule(PREDEFINED_MOLECULES[key]);
    setSelectedMoleculeKey(key);
  };

  // Capture current canvas as PNG
  const handleCaptureImage = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      // Create temporary download link
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${currentMolecule.name.replace(/\s+/g, "_")}_3d_model.png`;
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Background radial effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main App Bar Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-xl">
              <Atom className="w-6 h-6 text-indigo-400 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Ayuuu<span className="text-indigo-400 font-normal">3D Chemistry</span>
              </h1>
              <p className="text-xs text-slate-400">Interactive 3D molecular physics visualizer & catalog</p>
            </div>
          </div>

          {/* Search Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchQuery);
            }}
            className="flex items-center relative w-full md:max-w-md"
          >
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search any molecule... (e.g. 'Adrenaline', 'Glucose', 'C2H4')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isLoading}
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-indigo-500 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="ml-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-medium text-sm rounded-xl transition-all duration-200 flex items-center gap-1.5 shrink-0 shadow-lg shadow-indigo-600/10"
            >
              <Sparkles className="w-4 h-4" />
              <span>Synthesize</span>
            </button>
          </form>
        </div>
      </header>

      {/* Main Workspace Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        
        {/* Left Side: Predefined Quick Library & 3D Canvas (7 columns) */}
        <section className="lg:col-span-7 flex flex-col gap-4 h-full min-h-[500px]">
          
          {/* Quick Library selector */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-3 flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
              Classic Offline Compounds
            </span>
            <div className="flex flex-wrap gap-2">
              {PREDEFINED_KEYS.map((key) => {
                const mol = PREDEFINED_MOLECULES[key];
                const isActive = selectedMoleculeKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => selectPredefined(key)}
                    disabled={isLoading}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-600/5"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <span className="font-sans font-bold">{mol.name}</span>
                    <span className="text-[10px] opacity-75 font-mono bg-slate-950/60 px-1 py-0.5 rounded border border-slate-800">
                      {mol.formula}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Visualizer Window (Relative, takes remaining height) */}
          <div
            ref={visualizerRef}
            className={`transition-all duration-300 overflow-hidden relative flex flex-col ${
              isFullscreen
                ? "fixed inset-0 z-50 bg-slate-950 w-screen h-screen"
                : "flex-1 min-h-[400px] lg:min-h-[500px] bg-slate-900/40 border border-slate-900 rounded-2xl shadow-2xl"
            }`}
          >
            
            {/* 3D Canvas wrapper */}
            <div className="flex-1 w-full h-full relative">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-slate-950 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="relative flex items-center justify-center w-20 h-20 mb-6">
                      <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin" />
                      <Atom className="w-10 h-10 text-indigo-400 animate-pulse" />
                    </div>
                    <motion.p
                      key={loadingText}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-base font-semibold text-slate-200"
                    >
                      {loadingText}
                    </motion.p>
                    <p className="text-xs text-slate-500 mt-2 max-w-xs">
                      Gemini is currently computing 3D orbital alignments and electrostatic bond connections.
                    </p>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-slate-950/95 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="w-14 h-14 bg-rose-600/20 border border-rose-500/30 text-rose-400 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-200 mb-2">Synthesis Failed</h3>
                    <p className="text-sm text-slate-400 max-w-md mb-6">{error.message}</p>
                    
                    {error.type === "API_KEY_MISSING" ? (
                      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-left max-w-md text-xs text-slate-400 flex flex-col gap-2">
                        <span className="font-bold text-indigo-400 uppercase tracking-wide">How to resolve:</span>
                        <p>1. Open the **Secrets** panel in your development environment.</p>
                        <p>2. Add a new secret named <code className="text-slate-200 font-mono">GEMINI_API_KEY</code> with your free Google Gemini API Key.</p>
                        <p>3. Refresh or search again! Generation will work instantly.</p>
                      </div>
                    ) : error.type === "VERCEL_STATIC_HOSTING" ? (
                      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-left max-w-md text-xs text-slate-400 flex flex-col gap-2">
                        <span className="font-bold text-emerald-400 uppercase tracking-wide">Vercel Deployment Guide:</span>
                        <p>Because Vercel static environments do not run Node.js backend servers, configure a client-side API key:</p>
                        <p className="mt-1">1. Add <code className="text-slate-200 font-mono">VITE_GEMINI_API_KEY</code> to your **Vercel Project Environment Variables**.</p>
                        <p>2. Deploy or reload, and dynamic custom searches will run securely and directly client-side!</p>
                        <p className="mt-1 text-slate-500">In the meantime, click any predefined compound (such as **Sodium Chloride** or **Water**) below to explore stunning 3D orbits instantly offline!</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSearch(currentMolecule.name)}
                        className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-medium text-sm rounded-xl transition"
                      >
                        Retry Query
                      </button>
                    )}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* R3F Canvas Viewport */}
              <MoleculeCanvas
                atoms={currentMolecule.atoms}
                bonds={currentMolecule.bonds}
                style={viewStyle}
                autoRotate={autoRotate}
                selectedAtomId={selectedAtom?.id || null}
                onSelectAtom={handleSelectAtom}
                showGrid={showGrid}
              />

              {/* Floating Head-Up Display (HUD) in Fullscreen Mode */}
              {isFullscreen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-4 left-4 z-10 pointer-events-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md max-w-sm flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-black text-white leading-tight">
                        {currentMolecule.name}
                      </h2>
                      {currentMolecule.properties.iupacName && (
                        <p className="text-[10px] text-slate-400 font-mono">
                          {currentMolecule.properties.iupacName}
                        </p>
                      )}
                    </div>
                    <span className="text-sm font-mono font-black text-indigo-400 bg-indigo-950/50 border border-indigo-900/30 px-2.5 py-0.5 rounded-lg shrink-0">
                      {currentMolecule.formula}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-3">
                    {currentMolecule.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-1.5 pt-2 border-t border-slate-800/60 text-[10px]">
                    <div className="flex flex-col">
                      <span className="text-slate-500 font-bold uppercase tracking-wider text-[9px]">Molecular Mass</span>
                      <span className="font-mono text-slate-300 font-semibold">{currentMolecule.weight.toFixed(3)} g/mol</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-500 font-bold uppercase tracking-wider text-[9px]">Boiling Point</span>
                      <span className="text-slate-300 truncate font-semibold">{currentMolecule.properties.boilingPoint || "N/A"}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Floating Atom Inspector in Fullscreen Mode */}
              {isFullscreen && selectedAtom && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute top-4 right-4 z-10 pointer-events-auto bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md w-72 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-1.5">
                      <Atom className="w-4 h-4 text-indigo-400 animate-spin-slow" />
                      <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">
                        Atom Inspector
                      </span>
                    </div>
                    <button
                      onClick={() => handleSelectAtom(null)}
                      className="text-[10px] text-slate-400 hover:text-slate-200 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 transition"
                    >
                      Dismiss
                    </button>
                  </div>
                  {(() => {
                    const info = getElement(selectedAtom.element);
                    return (
                      <div className="flex gap-3 text-xs items-center">
                        <div
                          className="w-12 h-12 rounded-full flex flex-col items-center justify-center font-sans font-black text-base shadow-inner shrink-0 border border-slate-700/50"
                          style={{
                            backgroundColor: info.color,
                            color: info.color === "#fafafa" ? "#000" : "#fff",
                          }}
                        >
                          <span className="text-[9px] leading-none opacity-80">{info.atomicNumber}</span>
                          <span className="leading-tight text-lg">{info.symbol}</span>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                          <p className="font-bold text-slate-200 truncate text-sm">{info.name}</p>
                          <p className="text-[10px] text-indigo-300 font-semibold truncate bg-indigo-950/40 border border-indigo-900/20 rounded px-1.5 py-0.5 w-fit">{info.category}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">Config: {info.electronConfig}</p>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}

              {/* Interactive Controls Floating Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-wrap items-center justify-center bg-slate-900/95 border border-slate-800 px-3 py-2 rounded-2xl gap-3 shadow-2xl backdrop-blur-md max-w-[95%]">
                
                {/* Visual Representation Style */}
                <div className="flex bg-slate-950/60 p-1 rounded-xl border border-slate-850">
                  {(["ball-stick", "vdw", "stick"] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => setViewStyle(style)}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all duration-200 ${
                        viewStyle === style
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {style === "ball-stick" ? "Ball & Stick" : style === "vdw" ? "Space Fill" : "Stick"}
                    </button>
                  ))}
                </div>

                <div className="h-5 w-[1px] bg-slate-800" />

                {/* Spin Switch */}
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`p-1.5 rounded-lg border text-xs transition flex items-center gap-1.5 ${
                    autoRotate
                      ? "bg-indigo-600/10 border-indigo-500/30 text-indigo-300"
                      : "bg-slate-950 border-slate-850 text-slate-500 hover:text-slate-400"
                  }`}
                  title="Toggle Auto Rotation"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin-slow" : ""}`} />
                  <span className="hidden sm:inline font-medium">Spin</span>
                </button>

                {/* Grid Switch */}
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-1.5 rounded-lg border text-xs transition flex items-center gap-1.5 ${
                    showGrid
                      ? "bg-indigo-600/10 border-indigo-500/30 text-indigo-300"
                      : "bg-slate-950 border-slate-850 text-slate-500 hover:text-slate-400"
                  }`}
                  title="Toggle Laboratory Floor Grid"
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline font-medium">Grid</span>
                </button>

                <div className="h-5 w-[1px] bg-slate-800" />

                {/* Screenshot capture export */}
                <button
                  onClick={handleCaptureImage}
                  className="p-1.5 rounded-lg bg-slate-950 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs transition flex items-center gap-1.5"
                  title="Download High-Res 3D Render Image"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline font-medium">Capture</span>
                </button>

                <div className="h-5 w-[1px] bg-slate-800" />

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-indigo-300 hover:text-indigo-200 text-xs transition flex items-center gap-1.5 shadow-md shadow-indigo-600/5"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Immersive Fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  <span className="font-semibold">{isFullscreen ? "Exit" : "Fullscreen"}</span>
                </button>
              </div>

              {/* Instructions Overlay top right */}
              {!isFullscreen && (
                <div className="absolute top-4 right-4 z-10 pointer-events-none hidden md:flex items-center gap-1 text-[10px] text-slate-500 bg-slate-950/80 px-2 py-1 rounded border border-slate-900 backdrop-blur">
                  <span>Drag to Orbit</span>
                  <span>•</span>
                  <span>Scroll to Zoom</span>
                  <span>•</span>
                  <span>Tap atom to inspect</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right Side: Chemistry Profile & Info Cards (5 columns) */}
        <section className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-140px)] pr-1">
          
          {/* Main Info Header Card */}
          <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 flex flex-col gap-3 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white leading-tight">
                  {currentMolecule.name}
                </h2>
                {currentMolecule.properties.iupacName && (
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {currentMolecule.properties.iupacName}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xl font-mono font-black text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 px-2.5 py-0.5 rounded-xl">
                  {currentMolecule.formula}
                </span>
                <span className="text-[10px] font-mono text-slate-500 mt-1">
                  Formula
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {currentMolecule.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-1.5 pt-3 border-t border-slate-900">
              <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-900 flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-indigo-400" />
                  Molecular Mass
                </span>
                <span className="text-sm font-mono font-bold text-slate-200 mt-1">
                  {currentMolecule.weight.toFixed(3)} <span className="text-xs text-slate-400">g/mol</span>
                </span>
              </div>
              <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-900 flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1">
                  <Bookmark className="w-3 h-3 text-indigo-400" />
                  CAS Registry
                </span>
                <span className="text-sm font-mono font-bold text-slate-200 mt-1 truncate">
                  {currentMolecule.properties.casNumber || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Atom Inspector (Only visible if an atom is tapped) */}
          <AnimatePresence mode="wait">
            {selectedAtom ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.2 }}
                className="bg-indigo-950/20 border border-indigo-500/30 rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-indigo-900/30 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-indigo-500/20 rounded-lg">
                      <Atom className="w-4.5 h-4.5 text-indigo-400 animate-spin-slow" />
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wide">
                      Atom Inspector
                    </h3>
                  </div>
                  <button
                    onClick={() => handleSelectAtom(null)}
                    className="text-xs text-slate-400 hover:text-slate-200 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 transition"
                  >
                    Clear Focus
                  </button>
                </div>

                {(() => {
                  const info = getElement(selectedAtom.element);
                  return (
                    <div className="grid grid-cols-3 gap-3">
                      {/* Big Element Badge */}
                      <div className="col-span-1 bg-slate-950/50 border border-slate-900 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-mono text-slate-500 font-bold leading-none mb-1">
                          {info.atomicNumber}
                        </span>
                        <div
                          className="w-10 h-10 rounded-full border border-slate-700/50 flex items-center justify-center font-sans font-black text-xl shadow-inner text-slate-100"
                          style={{
                            backgroundColor: info.color,
                            color: info.color === "#fafafa" ? "#000" : "#fff",
                          }}
                        >
                          {info.symbol}
                        </div>
                        <span className="text-xs font-bold text-slate-200 mt-2 truncate max-w-full">
                          {info.name}
                        </span>
                      </div>

                      {/* Info details */}
                      <div className="col-span-2 flex flex-col gap-2 text-xs">
                        <div className="flex justify-between border-b border-slate-900/40 pb-1">
                          <span className="text-slate-400">Class:</span>
                          <span className="font-semibold text-slate-200 truncate max-w-[110px]">
                            {info.category}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-900/40 pb-1">
                          <span className="text-slate-400">Electron Config:</span>
                          <span className="font-mono font-bold text-slate-200 text-[10px]">
                            {info.electronConfig}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-900/40 pb-1">
                          <span className="text-slate-400">Electronegativity:</span>
                          <span className="font-mono font-bold text-slate-200">
                            {info.electronegativity ? info.electronegativity.toFixed(2) : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-900/40 pb-1">
                          <span className="text-slate-400">Atomic Weight:</span>
                          <span className="font-mono text-slate-200">
                            {info.weight.toFixed(3)} u
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Atom Position ID:</span>
                          <span className="font-mono font-semibold text-indigo-400">
                            {selectedAtom.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Physical Properties Bento */}
          <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 pb-1 border-b border-slate-900">
              <Thermometer className="w-3.5 h-3.5 text-indigo-400" />
              Physical Characteristics
            </span>

            <div className="grid grid-cols-2 gap-3.5 text-xs">
              <div className="flex flex-col">
                <span className="text-slate-500 font-medium">Melting Point</span>
                <span className="font-semibold text-slate-200 mt-0.5">
                  {currentMolecule.properties.meltingPoint || "Unavailable"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 font-medium">Boiling Point</span>
                <span className="font-semibold text-slate-200 mt-0.5">
                  {currentMolecule.properties.boilingPoint || "Unavailable"}
                </span>
              </div>
              <div className="flex flex-col border-t border-slate-900/60 pt-2">
                <span className="text-slate-500 font-medium">Density</span>
                <span className="font-semibold text-slate-200 mt-0.5">
                  {currentMolecule.properties.density || "Unavailable"}
                </span>
              </div>
              <div className="flex flex-col border-t border-slate-900/60 pt-2">
                <span className="text-slate-500 font-medium">Solubility</span>
                <span className="font-semibold text-slate-200 mt-0.5 truncate" title={currentMolecule.properties.solubility}>
                  {currentMolecule.properties.solubility || "Unavailable"}
                </span>
              </div>
              <div className="col-span-2 flex flex-col border-t border-slate-900/60 pt-2">
                <span className="text-slate-500 font-medium">Overall Net Charge</span>
                <span className="font-semibold text-slate-200 mt-0.5">
                  {currentMolecule.properties.charge || "Neutral"}
                </span>
              </div>
            </div>
          </div>

          {/* Applications Card */}
          <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 pb-1 border-b border-slate-900">
              <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
              Real-World Applications
            </span>

            <ul className="flex flex-col gap-2.5">
              {currentMolecule.applications.map((app, index) => (
                <li key={index} className="flex gap-2 text-xs text-slate-300 leading-relaxed items-start">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0 mt-1.5" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety Card (GHS Overview) */}
          <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 pb-1 border-b border-slate-900">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Hazards & Safety Datasheet (GHS)
            </span>

            <ul className="flex flex-col gap-2.5">
              {currentMolecule.safety.map((warn, index) => (
                <li key={index} className="flex gap-2.5 text-xs text-slate-300 leading-relaxed items-start">
                  <div className="p-0.5 bg-rose-600/10 border border-rose-500/20 rounded text-rose-400 mt-0.5 shrink-0">
                    <AlertTriangle className="w-3 h-3" />
                  </div>
                  <span>{warn}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Historical Fact / Trivia Card */}
          <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 pb-1 border-b border-slate-900">
              <History className="w-3.5 h-3.5 text-emerald-400" />
              History & Chemical Trivia
            </span>

            <ul className="flex flex-col gap-3">
              {currentMolecule.historyAndTrivia.map((trivia, index) => (
                <li key={index} className="flex gap-2.5 text-xs text-slate-300 leading-relaxed items-start bg-slate-950/20 p-2.5 rounded-xl border border-slate-900">
                  <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{trivia}</span>
                </li>
              ))}
            </ul>
          </div>

        </section>
      </main>

      {/* Footer bar */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-[10px] text-slate-500 flex items-center justify-between max-w-7xl w-full mx-auto mt-6">
        <span>Powered by standard React Three Fiber & real-time Gemini AI physics synthesis.</span>
        <span>Ayuuu Chemistry © 2026. Free, open, and educational.</span>
      </footer>
    </div>
  );
}
