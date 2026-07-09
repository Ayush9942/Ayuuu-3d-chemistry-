import { ElementInfo } from '../types';

export const ELEMENTS: Record<string, ElementInfo> = {
  H: {
    symbol: "H",
    name: "Hydrogen",
    atomicNumber: 1,
    category: "Reactive Nonmetal",
    weight: 1.008,
    color: "#fafafa", // Clean white
    radius: 0.37,
    electronConfig: "1s¹",
    electronegativity: 2.20
  },
  He: {
    symbol: "He",
    name: "Helium",
    atomicNumber: 2,
    category: "Noble Gas",
    weight: 4.0026,
    color: "#c084fc", // Cyan/purple
    radius: 0.32,
    electronConfig: "1s²",
    electronegativity: 0
  },
  Li: {
    symbol: "Li",
    name: "Lithium",
    atomicNumber: 3,
    category: "Alkali Metal",
    weight: 6.94,
    color: "#f43f5e", // Magenta-red
    radius: 0.75,
    electronConfig: "[He] 2s¹",
    electronegativity: 0.98
  },
  Be: {
    symbol: "Be",
    name: "Beryllium",
    atomicNumber: 4,
    category: "Alkaline Earth Metal",
    weight: 9.0122,
    color: "#10b981", // Green
    radius: 0.55,
    electronConfig: "[He] 2s²",
    electronegativity: 1.57
  },
  B: {
    symbol: "B",
    name: "Boron",
    atomicNumber: 5,
    category: "Metalloid",
    weight: 10.81,
    color: "#f59e0b", // Salmon/pink/orange
    radius: 0.65,
    electronConfig: "[He] 2s² 2p¹",
    electronegativity: 2.04
  },
  C: {
    symbol: "C",
    name: "Carbon",
    atomicNumber: 6,
    category: "Reactive Nonmetal",
    weight: 12.011,
    color: "#27272a", // Charcoal/Black
    radius: 0.67,
    electronConfig: "[He] 2s² 2p²",
    electronegativity: 2.55
  },
  N: {
    symbol: "N",
    name: "Nitrogen",
    atomicNumber: 7,
    category: "Reactive Nonmetal",
    weight: 14.007,
    color: "#2563eb", // Deep Blue
    radius: 0.62,
    electronConfig: "[He] 2s² 2p³",
    electronegativity: 3.04
  },
  O: {
    symbol: "O",
    name: "Oxygen",
    atomicNumber: 8,
    category: "Reactive Nonmetal",
    weight: 15.999,
    color: "#dc2626", // Red
    radius: 0.60,
    electronConfig: "[He] 2s² 2p⁴",
    electronegativity: 3.44
  },
  F: {
    symbol: "F",
    name: "Fluorine",
    atomicNumber: 9,
    category: "Reactive Nonmetal",
    weight: 18.998,
    color: "#06b6d4", // Cyan
    radius: 0.55,
    electronConfig: "[He] 2s² 2p⁵",
    electronegativity: 3.98
  },
  Ne: {
    symbol: "Ne",
    name: "Neon",
    atomicNumber: 10,
    category: "Noble Gas",
    weight: 20.180,
    color: "#fb923c", // Neon Orange
    radius: 0.50,
    electronConfig: "[He] 2s² 2p⁶",
    electronegativity: 0
  },
  Na: {
    symbol: "Na",
    name: "Sodium",
    atomicNumber: 11,
    category: "Alkali Metal",
    weight: 22.990,
    color: "#a855f7", // Purple
    radius: 0.95,
    electronConfig: "[Ne] 3s¹",
    electronegativity: 0.93
  },
  Mg: {
    symbol: "Mg",
    name: "Magnesium",
    atomicNumber: 12,
    category: "Alkaline Earth Metal",
    weight: 24.305,
    color: "#16a34a", // Forest Green
    radius: 0.85,
    electronConfig: "[Ne] 3s²",
    electronegativity: 1.31
  },
  Al: {
    symbol: "Al",
    name: "Aluminum",
    atomicNumber: 13,
    category: "Post-Transition Metal",
    weight: 26.982,
    color: "#94a3b8", // Light Silver
    radius: 0.75,
    electronConfig: "[Ne] 3s² 3p¹",
    electronegativity: 1.61
  },
  Si: {
    symbol: "Si",
    name: "Silicon",
    atomicNumber: 14,
    category: "Metalloid",
    weight: 28.085,
    color: "#14b8a6", // Teal-grey
    radius: 0.78,
    electronConfig: "[Ne] 3s² 3p²",
    electronegativity: 1.90
  },
  P: {
    symbol: "P",
    name: "Phosphorus",
    atomicNumber: 15,
    category: "Reactive Nonmetal",
    weight: 30.974,
    color: "#f97316", // Orange
    radius: 0.70,
    electronConfig: "[Ne] 3s² 3p³",
    electronegativity: 2.19
  },
  S: {
    symbol: "S",
    name: "Sulfur",
    atomicNumber: 16,
    category: "Reactive Nonmetal",
    weight: 32.06,
    color: "#eab308", // Yellow
    radius: 0.73,
    electronConfig: "[Ne] 3s² 3p⁴",
    electronegativity: 2.58
  },
  Cl: {
    symbol: "Cl",
    name: "Chlorine",
    atomicNumber: 17,
    category: "Reactive Nonmetal",
    weight: 35.45,
    color: "#22c55e", // Light Green
    radius: 0.68,
    electronConfig: "[Ne] 3s² 3p⁵",
    electronegativity: 3.16
  },
  Ar: {
    symbol: "Ar",
    name: "Argon",
    atomicNumber: 18,
    category: "Noble Gas",
    weight: 39.948,
    color: "#a78bfa", // Purple-cyan
    radius: 0.65,
    electronConfig: "[Ne] 3s² 3p⁶",
    electronegativity: 0
  },
  K: {
    symbol: "K",
    name: "Potassium",
    atomicNumber: 19,
    category: "Alkali Metal",
    weight: 39.098,
    color: "#d946ef", // Pinkish Purple
    radius: 1.15,
    electronConfig: "[Ar] 4s¹",
    electronegativity: 0.82
  },
  Ca: {
    symbol: "Ca",
    name: "Calcium",
    atomicNumber: 20,
    category: "Alkaline Earth Metal",
    weight: 40.078,
    color: "#6b7280", // Slate Gray
    radius: 1.00,
    electronConfig: "[Ar] 4s²",
    electronegativity: 1.00
  },
  Fe: {
    symbol: "Fe",
    name: "Iron",
    atomicNumber: 26,
    category: "Transition Metal",
    weight: 55.845,
    color: "#b45309", // Rust Brown
    radius: 0.90,
    electronConfig: "[Ar] 3d⁶ 4s²",
    electronegativity: 1.83
  },
  Cu: {
    symbol: "Cu",
    name: "Copper",
    atomicNumber: 29,
    category: "Transition Metal",
    weight: 63.546,
    color: "#ea580c", // Copper Orange
    radius: 0.85,
    electronConfig: "[Ar] 3d¹⁰ 4s¹",
    electronegativity: 1.90
  },
  Zn: {
    symbol: "Zn",
    name: "Zinc",
    atomicNumber: 30,
    category: "Transition Metal",
    weight: 65.38,
    color: "#64748b", // Bluish Grey
    radius: 0.82,
    electronConfig: "[Ar] 3d¹⁰ 4s²",
    electronegativity: 1.65
  },
  Br: {
    symbol: "Br",
    name: "Bromine",
    atomicNumber: 35,
    category: "Reactive Nonmetal",
    weight: 79.904,
    color: "#991b1b", // Dark Red
    radius: 0.80,
    electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁵",
    electronegativity: 2.96
  },
  I: {
    symbol: "I",
    name: "Iodine",
    atomicNumber: 53,
    category: "Reactive Nonmetal",
    weight: 126.90,
    color: "#581c87", // Dark Violet
    radius: 0.95,
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵",
    electronegativity: 2.66
  }
};

export function getElement(symbol: string): ElementInfo {
  const cleanSymbol = symbol.charAt(0).toUpperCase() + symbol.slice(1).toLowerCase();
  return ELEMENTS[cleanSymbol] || {
    symbol: symbol,
    name: "Unknown Element",
    atomicNumber: 0,
    category: "Unknown",
    weight: 0,
    color: "#6b7280", // Default gray
    radius: 0.6,
    electronConfig: "Unknown",
    electronegativity: 0
  };
}
