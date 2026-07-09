export interface Atom {
  id: string;
  element: string; // e.g., "H", "C", "O", "N", "S", "P", "F", "Cl", "Br", "I", "Na"
  position: [number, number, number]; // 3D coordinates in Angstroms
}

export interface Bond {
  id: string;
  from: string; // ID of the source atom
  to: string; // ID of the target atom
  order: number; // 1 = single, 2 = double, 3 = triple
}

export interface MoleculeProperties {
  meltingPoint?: string;
  boilingPoint?: string;
  density?: string;
  solubility?: string;
  charge?: string;
  iupacName?: string;
  casNumber?: string;
}

export interface MoleculeData {
  name: string;
  formula: string;
  weight: number; // in g/mol
  description: string;
  properties: MoleculeProperties;
  applications: string[];
  safety: string[];
  historyAndTrivia: string[];
  atoms: Atom[];
  bonds: Bond[];
}

export interface ElementInfo {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: string;
  weight: number;
  color: string;
  radius: number; // relative size for rendering
  electronConfig: string;
  electronegativity: number;
}
