import { MoleculeData } from '../types';

export const PREDEFINED_MOLECULES: Record<string, MoleculeData> = {
  water: {
    name: "Water",
    formula: "H₂O",
    weight: 18.015,
    description: "Water is a polar inorganic compound that is at room temperature a tasteless and odorless liquid, which is nearly colorless apart from an inherent hint of blue. It is by far the most studied chemical compound and is described as the 'universal solvent' for its ability to dissolve many substances.",
    properties: {
      meltingPoint: "0 °C (32 °F)",
      boilingPoint: "100 °C (212 °F)",
      density: "0.998 g/cm³",
      solubility: "Miscible",
      charge: "Neutral (Polar)",
      iupacName: "Oxidane",
      casNumber: "7732-18-5"
    },
    applications: [
      "Biological solvent essential for all known forms of life.",
      "Industrial coolant and heat transfer fluid.",
      "Agriculture and domestic irrigation.",
      "Standard for temperature scales (Celsius) and density definitions."
    ],
    safety: [
      "Generally recognized as safe (GRAS).",
      "Risk of drowning if inhaled.",
      "High thermal burns when in steam phase."
    ],
    historyAndTrivia: [
      "Water covers approximately 71% of the Earth's surface, mostly in seas and oceans.",
      "Unlike most other substances, water expands as it freezes, which is why ice floats.",
      "The bent shape of water is due to two lone pairs of electrons on the oxygen atom, which repel the hydrogen atoms."
    ],
    atoms: [
      { id: "O1", element: "O", position: [0, 0.12, 0] },
      { id: "H1", element: "H", position: [-0.76, -0.48, 0] },
      { id: "H2", element: "H", position: [0.76, -0.48, 0] }
    ],
    bonds: [
      { id: "b1", from: "O1", to: "H1", order: 1 },
      { id: "b2", from: "O1", to: "H2", order: 1 }
    ]
  },
  co2: {
    name: "Carbon Dioxide",
    formula: "CO₂",
    weight: 44.01,
    description: "Carbon dioxide is an acidic colorless gas with a density about 53% higher than that of dry air. It is a linear molecule consisting of a carbon atom covalently double-bonded to two oxygen atoms. It occurs naturally in Earth's atmosphere as a trace gas and is key to photosynthesis.",
    properties: {
      meltingPoint: "-56.6 °C (-69.8 °F) at 5.2 atm",
      boilingPoint: "-78.5 °C (-109.3 °F) (Sublimes)",
      density: "1.977 g/L (gas)",
      solubility: "1.45 g/L in water",
      charge: "Neutral (Non-polar)",
      iupacName: "Carbon dioxide",
      casNumber: "124-38-9"
    },
    applications: [
      "Carbonation in soft drinks and sparkling beverages.",
      "Dry ice used as a clean and convenient cooling agent.",
      "Fire extinguishers (displaces oxygen).",
      "Shielding gas in welding and chemical processing."
    ],
    safety: [
      "Asphyxiant at high concentrations (replaces oxygen).",
      "Dry ice can cause severe frostbite upon direct skin contact.",
      "Primary greenhouse gas responsible for modern climate change."
    ],
    historyAndTrivia: [
      "Carbon dioxide was first discovered by Joseph Black in the 1750s as 'fixed air'.",
      "Although its C-O bonds are polar, the linear, symmetrical geometry of the molecule cancels out the dipole moments, rendering CO₂ completely non-polar."
    ],
    atoms: [
      { id: "C1", element: "C", position: [0, 0, 0] },
      { id: "O1", element: "O", position: [-1.16, 0, 0] },
      { id: "O2", element: "O", position: [1.16, 0, 0] }
    ],
    bonds: [
      { id: "b1", from: "C1", to: "O1", order: 2 },
      { id: "b2", from: "C1", to: "O2", order: 2 }
    ]
  },
  methane: {
    name: "Methane",
    formula: "CH₄",
    weight: 16.04,
    description: "Methane is a chemical compound with the chemical formula CH₄. It is a group-14 hydride and the simplest alkane, and is the main constituent of natural gas. Methane is an attractive fuel but its release is a significant environmental concern.",
    properties: {
      meltingPoint: "-182.5 °C (-296.5 °F)",
      boilingPoint: "-161.6 °C (-258.9 °F)",
      density: "0.657 g/L (gas)",
      solubility: "22.7 mg/L in water",
      charge: "Neutral (Non-polar)",
      iupacName: "Methane",
      casNumber: "74-82-8"
    },
    applications: [
      "Primary fuel source for heating, electricity generation, and cooking (as natural gas).",
      "Feedstock for producing hydrogen gas via steam reforming.",
      "Raw material for industrial carbon black and synthesis gas."
    ],
    safety: [
      "Extremely flammable; forms explosive mixtures with air.",
      "Asphyxiant in enclosed spaces.",
      "Potent greenhouse gas, 28-36 times more heat-trapping than CO₂ over a 100-year timescale."
    ],
    historyAndTrivia: [
      "Alessandro Volta discovered methane in 1776 while studying 'marsh gas' in Lake Maggiore.",
      "Methane molecules have a perfect tetrahedral geometry, with a H-C-H bond angle of exactly 109.5°."
    ],
    atoms: [
      { id: "C1", element: "C", position: [0, 0, 0] },
      { id: "H1", element: "H", position: [0, 1.09, 0] },
      { id: "H2", element: "H", position: [1.02, -0.36, 0] },
      { id: "H3", element: "H", position: [-0.51, -0.36, -0.89] },
      { id: "H4", element: "H", position: [-0.51, -0.36, 0.89] }
    ],
    bonds: [
      { id: "b1", from: "C1", to: "H1", order: 1 },
      { id: "b2", from: "C1", to: "H2", order: 1 },
      { id: "b3", from: "C1", to: "H3", order: 1 },
      { id: "b4", from: "C1", to: "H4", order: 1 }
    ]
  },
  ethanol: {
    name: "Ethanol",
    formula: "C₂H₅OH",
    weight: 46.07,
    description: "Ethanol, also called alcohol, ethyl alcohol, and grain alcohol, is a clear, colorless liquid and the principle ingredient in alcoholic beverages like beer, wine or brandy. Because it can readily dissolve in water and other organic compounds, ethanol also is an ingredient in cosmetics, paints and fuels.",
    properties: {
      meltingPoint: "-114.1 °C (-173.4 °F)",
      boilingPoint: "78.37 °C (173.07 °F)",
      density: "0.789 g/cm³",
      solubility: "Miscible in water",
      charge: "Neutral (Polar)",
      iupacName: "Ethanol",
      casNumber: "64-17-5"
    },
    applications: [
      "Active ingredient in alcoholic beverages.",
      "Industrial solvent for chemicals, pharmaceuticals, and perfumes.",
      "Biofuel additive for gasoline (e.g., E10, E85).",
      "Disinfectant and antiseptic (hand sanitizer)."
    ],
    safety: [
      "Flammable liquid and vapor.",
      "Causes central nervous system depression upon consumption.",
      "Chronic use leads to liver damage, addiction, and is carcinogenic."
    ],
    historyAndTrivia: [
      "Fermentation of sugar into ethanol is one of the earliest chemical reactions harnessed by humanity, dating back over 9,000 years.",
      "The 'hangover' associated with drinking is caused by acetaldehyde, which the liver produces as it breaks down ethanol."
    ],
    atoms: [
      { id: "C1", element: "C", position: [-0.75, -0.25, 0] },
      { id: "C2", element: "C", position: [0.75, 0.25, 0] },
      { id: "O1", element: "O", position: [1.5, -0.75, 0] },
      { id: "H1", element: "H", position: [-1.2, 0.2, 0.88] },
      { id: "H2", element: "H", position: [-1.2, 0.2, -0.88] },
      { id: "H3", element: "H", position: [-0.75, -1.3, 0] },
      { id: "H4", element: "H", position: [0.85, 0.85, 0.88] },
      { id: "H5", element: "H", position: [0.85, 0.85, -0.88] },
      { id: "H6", element: "H", position: [2.4, -0.45, 0] }
    ],
    bonds: [
      { id: "b1", from: "C1", to: "C2", order: 1 },
      { id: "b2", from: "C2", to: "O1", order: 1 },
      { id: "b3", from: "C1", to: "H1", order: 1 },
      { id: "b4", from: "C1", to: "H2", order: 1 },
      { id: "b5", from: "C1", to: "H3", order: 1 },
      { id: "b6", from: "C2", to: "H4", order: 1 },
      { id: "b7", from: "C2", to: "H5", order: 1 },
      { id: "b8", from: "O1", to: "H6", order: 1 }
    ]
  },
  benzene: {
    name: "Benzene",
    formula: "C₆H₆",
    weight: 78.11,
    description: "Benzene is an organic chemical compound with the chemical formula C₆H₆. The benzene molecule is composed of six carbon atoms joined in a planar ring with one hydrogen atom attached to each. Because it contains only carbon and hydrogen atoms, benzene is classed as a hydrocarbon.",
    properties: {
      meltingPoint: "5.53 °C (41.95 °F)",
      boilingPoint: "80.1 °C (176.2 °F)",
      density: "0.876 g/cm³",
      solubility: "1.79 g/L in water",
      charge: "Neutral (Non-polar)",
      iupacName: "Benzene",
      casNumber: "71-43-2"
    },
    applications: [
      "Crucial industrial precursor to plastics, resins, nylon, and synthetic fibers.",
      "Starting material for aniline, phenol, and alkylbenzenes (detergents).",
      "Historically used as an industrial solvent and gasoline additive."
    ],
    safety: [
      "Highly toxic and classified as a Group 1 carcinogen (causes leukemia).",
      "Extremely flammable liquid and vapor.",
      "Vapors can cause dizziness, headaches, and unconsciousness."
    ],
    historyAndTrivia: [
      "August Kekulé famously claimed to have discovered the ring shape of benzene after having a daydream of a snake eating its own tail (Ouroboros).",
      "The carbon-carbon bonds in benzene are not alternating single and double bonds; instead, they are hybrid resonance bonds of order 1.5, making the ring extraordinarily stable."
    ],
    atoms: [
      { id: "C1", element: "C", position: [0, 1.4, 0] },
      { id: "C2", element: "C", position: [1.21, 0.7, 0] },
      { id: "C3", element: "C", position: [1.21, -0.7, 0] },
      { id: "C4", element: "C", position: [0, -1.4, 0] },
      { id: "C5", element: "C", position: [-1.21, -0.7, 0] },
      { id: "C6", element: "C", position: [-1.21, 0.7, 0] },
      { id: "H1", element: "H", position: [0, 2.48, 0] },
      { id: "H2", element: "H", position: [2.15, 1.24, 0] },
      { id: "H3", element: "H", position: [2.15, -1.24, 0] },
      { id: "H4", element: "H", position: [0, -2.48, 0] },
      { id: "H5", element: "H", position: [-2.15, -1.24, 0] },
      { id: "H6", element: "H", position: [-2.15, 1.24, 0] }
    ],
    bonds: [
      { id: "b1", from: "C1", to: "C2", order: 2 },
      { id: "b2", from: "C2", to: "C3", order: 1 },
      { id: "b3", from: "C3", to: "C4", order: 2 },
      { id: "b4", from: "C4", to: "C5", order: 1 },
      { id: "b5", from: "C5", to: "C6", order: 2 },
      { id: "b6", from: "C6", to: "C1", order: 1 },
      { id: "b7", from: "C1", to: "H1", order: 1 },
      { id: "b8", from: "C2", to: "H2", order: 1 },
      { id: "b9", from: "C3", to: "H3", order: 1 },
      { id: "b10", from: "C4", to: "H4", order: 1 },
      { id: "b11", from: "C5", to: "H5", order: 1 },
      { id: "b12", from: "C6", to: "H6", order: 1 }
    ]
  },
  caffeine: {
    name: "Caffeine",
    formula: "C₈H₁₀N₄O₂",
    weight: 194.19,
    description: "Caffeine is a central nervous system stimulant of the methylxanthine class. It is the world's most widely consumed psychoactive substance. Unlike most other psychoactive substances, it is legal and unregulated in nearly all parts of the world.",
    properties: {
      meltingPoint: "235 °C (455 °F)",
      boilingPoint: "Sublimes at 178 °C",
      density: "1.23 g/cm³",
      solubility: "21.7 g/L in water (at 25°C)",
      charge: "Neutral",
      iupacName: "1,3,7-Trimethylpurine-2,6-dione",
      casNumber: "58-08-2"
    },
    applications: [
      "Stimulant in coffee, tea, energy drinks, and sodas to reduce fatigue.",
      "Analgesic adjuvant, combined with aspirin or acetaminophen to treat migraines.",
      "Cosmetic ingredient in skin creams to reduce puffiness."
    ],
    safety: [
      "Safe in moderate doses (up to 400 mg daily for healthy adults).",
      "Overdose causes insomnia, anxiety, rapid heart rate, and jitteriness.",
      "Lethal dose is high (about 10 grams, or 75-100 cups of coffee)."
    ],
    historyAndTrivia: [
      "Caffeine was first isolated by the German chemist Friedlieb Ferdinand Runge in 1819, at the suggestion of writer Johann Wolfgang von Goethe.",
      "In plants, caffeine acts as a natural pesticide to paralyze and kill insects feeding on them, and also prevents neighboring seeds from germinating."
    ],
    atoms: [
      // Purine core ring (6-membered ring fused to 5-membered ring)
      // 6-membered ring: N1, C2, N3, C4, C5, C6
      { id: "N1", element: "N", position: [-0.9, 1.2, 0] },
      { id: "C2", element: "C", position: [-1.4, -0.05, 0] },
      { id: "O2", element: "O", position: [-2.6, -0.25, 0] }, // carbonyl on C2
      { id: "N3", element: "N", position: [-0.6, -1.15, 0] },
      { id: "C4", element: "C", position: [0.75, -1.0, 0] },
      { id: "C5", element: "C", position: [1.25, 0.35, 0] },
      { id: "C6", element: "C", position: [0.45, 1.45, 0] },
      { id: "O6", element: "O", position: [0.95, 2.55, 0] }, // carbonyl on C6

      // 5-membered ring fused to C4-C5: N7, C8, N9
      { id: "N7", element: "N", position: [2.5, 0.75, 0] },
      { id: "C8", element: "C", position: [2.8, -0.55, 0] },
      { id: "H8", element: "H", position: [3.8, -0.9, 0] },
      { id: "N9", element: "N", position: [1.8, -1.55, 0] },

      // Methyl groups: C10 on N1, C11 on N3, C12 on N7
      { id: "C10", element: "C", position: [-1.75, 2.4, 0] }, // methyl on N1
      { id: "H10a", element: "H", position: [-1.2, 3.25, 0.5] },
      { id: "H10b", element: "H", position: [-2.4, 2.2, 0.8] },
      { id: "H10c", element: "H", position: [-2.4, 2.4, -0.8] },

      { id: "C11", element: "C", position: [-1.25, -2.45, 0] }, // methyl on N3
      { id: "H11a", element: "H", position: [-0.6, -3.2, 0.5] },
      { id: "H11b", element: "H", position: [-1.9, -2.4, 0.8] },
      { id: "H11c", element: "H", position: [-1.9, -2.6, -0.8] },

      { id: "C12", element: "C", position: [3.55, 1.75, 0] }, // methyl on N7
      { id: "H12a", element: "H", position: [3.2, 2.7, 0.3] },
      { id: "H12b", element: "H", position: [4.1, 1.5, 0.8] },
      { id: "H12c", element: "H", position: [4.2, 1.8, -0.8] }
    ],
    bonds: [
      // 6-membered ring
      { id: "b1", from: "N1", to: "C2", order: 1 },
      { id: "b2", from: "C2", to: "N3", order: 1 },
      { id: "b3", from: "N3", to: "C4", order: 1 },
      { id: "b4", from: "C4", to: "C5", order: 2 },
      { id: "b5", from: "C5", to: "C6", order: 1 },
      { id: "b6", from: "C6", to: "N1", order: 1 },

      // Carbonyl bonds
      { id: "b7", from: "C2", to: "O2", order: 2 },
      { id: "b8", from: "C6", to: "O6", order: 2 },

      // 5-membered ring (fused at C4-C5)
      { id: "b9", from: "C5", to: "N7", order: 1 },
      { id: "b10", from: "N7", to: "C8", order: 1 },
      { id: "b11", from: "C8", to: "N9", order: 2 },
      { id: "b12", from: "N9", to: "C4", order: 1 },

      // C8 hydrogen
      { id: "b13", from: "C8", to: "H8", order: 1 },

      // Methyl groups bonds
      { id: "b14", from: "N1", to: "C10", order: 1 },
      { id: "b15", from: "C10", to: "H10a", order: 1 },
      { id: "b16", from: "C10", to: "H10b", order: 1 },
      { id: "b17", from: "C10", to: "H10c", order: 1 },

      { id: "b18", from: "N3", to: "C11", order: 1 },
      { id: "b19", from: "C11", to: "H11a", order: 1 },
      { id: "b20", from: "C11", to: "H11b", order: 1 },
      { id: "b21", from: "C11", to: "H11c", order: 1 },

      { id: "b22", from: "N7", to: "C12", order: 1 },
      { id: "b23", from: "C12", to: "H12a", order: 1 },
      { id: "b24", from: "C12", to: "H12b", order: 1 },
      { id: "b25", from: "C12", to: "H12c", order: 1 }
    ]
  }
};
export const PREDEFINED_KEYS = Object.keys(PREDEFINED_MOLECULES);
