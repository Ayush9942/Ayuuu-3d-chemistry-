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
  },
  glucose: {
    name: "Glucose",
    formula: "C₆H₁₂O₆",
    weight: 180.16,
    description: "Glucose is a simple sugar with the molecular formula C₆H₁₂O₆. Glucose is the most abundant monosaccharide, a subcategory of carbohydrates. It is the primary source of energy for cell function and is produced by plants during photosynthesis.",
    properties: {
      meltingPoint: "146 °C (295 °F)",
      boilingPoint: "Decomposes",
      density: "1.54 g/cm³",
      solubility: "909 g/L in water",
      charge: "Neutral",
      iupacName: "D-glucose",
      casNumber: "50-99-7"
    },
    applications: [
      "Primary source of energy for cellular respiration in living organisms.",
      "Used in baking, brewing, and food processing as a sweetener and preservative.",
      "Intravenous solution in medicine to restore blood sugar levels."
    ],
    safety: [
      "Generally recognized as safe (GRAS).",
      "Excess consumption is linked to diabetes, obesity, and cardiovascular diseases."
    ],
    historyAndTrivia: [
      "Glucose was first isolated from raisins by the German chemist Andreas Marggraf in 1747.",
      "The name 'glucose' comes from the Greek word 'gleukos', meaning 'sweet wine'."
    ],
    atoms: [
      { id: "C1", element: "C", position: [1.17, -0.42, -0.22] },
      { id: "C2", element: "C", position: [0.12, -1.01, 0.72] },
      { id: "C3", element: "C", position: [-1.22, -0.32, 0.47] },
      { id: "C4", element: "C", position: [-1.15, 1.15, 0.88] },
      { id: "C5", element: "C", position: [-0.06, 1.70, -0.05] },
      { id: "O5", element: "O", position: [1.14, 0.95, 0.22] },
      { id: "C6", element: "C", position: [-0.03, 3.20, 0.21] },
      { id: "O1", element: "O", position: [2.42, -1.05, 0.04] },
      { id: "O2", element: "O", position: [0.52, -0.83, 2.07] },
      { id: "O3", element: "O", position: [-2.23, -0.98, 1.22] },
      { id: "O4", element: "O", position: [-2.38, 1.77, 0.58] },
      { id: "O6", element: "O", position: [1.18, 3.81, -0.23] },
      { id: "H1", element: "H", position: [1.25, -0.56, -1.31] },
      { id: "H2", element: "H", position: [0.08, -2.09, 0.54] },
      { id: "H3", element: "H", position: [-1.43, -0.45, -0.60] },
      { id: "H4", element: "H", position: [-0.96, 1.28, 1.96] },
      { id: "H5", element: "H", position: [-0.31, 1.50, -1.10] },
      { id: "HO1", element: "H", position: [2.97, -0.99, -0.75] },
      { id: "HO2", element: "H", position: [1.38, -1.25, 2.19] },
      { id: "HO3", element: "H", position: [-2.11, -1.93, 1.12] },
      { id: "HO4", element: "H", position: [-2.32, 2.70, 0.84] },
      { id: "HO6", element: "H", position: [1.13, 4.74, -0.01] }
    ],
    bonds: [
      { id: "b1", from: "C1", to: "C2", order: 1 },
      { id: "b2", from: "C2", to: "C3", order: 1 },
      { id: "b3", from: "C3", to: "C4", order: 1 },
      { id: "b4", from: "C4", to: "C5", order: 1 },
      { id: "b5", from: "C5", to: "O5", order: 1 },
      { id: "b6", from: "O5", to: "C1", order: 1 },
      { id: "b7", from: "C5", to: "C6", order: 1 },
      { id: "b8", from: "C6", to: "O6", order: 1 },
      { id: "b9", from: "C1", to: "O1", order: 1 },
      { id: "b10", from: "C2", to: "O2", order: 1 },
      { id: "b11", from: "C3", to: "O3", order: 1 },
      { id: "b12", from: "C4", to: "O4", order: 1 },
      { id: "b13", from: "C1", to: "H1", order: 1 },
      { id: "b14", from: "C2", to: "H2", order: 1 },
      { id: "b15", from: "C3", to: "H3", order: 1 },
      { id: "b16", from: "C4", to: "H4", order: 1 },
      { id: "b17", from: "C5", to: "H5", order: 1 },
      { id: "b18", from: "O1", to: "HO1", order: 1 },
      { id: "b19", from: "O2", to: "HO2", order: 1 },
      { id: "b20", from: "O3", to: "HO3", order: 1 },
      { id: "b21", from: "O4", to: "HO4", order: 1 },
      { id: "b22", from: "O6", to: "HO6", order: 1 }
    ]
  },
  aspirin: {
    name: "Aspirin",
    formula: "C₉H₈O₄",
    weight: 180.15,
    description: "Aspirin, also known as acetylsalicylic acid, is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation. It is one of the most widely used medications globally.",
    properties: {
      meltingPoint: "136 °C (277 °F)",
      boilingPoint: "140 °C (284 °F) (Decomposes)",
      density: "1.40 g/cm³",
      solubility: "3 g/L in water",
      charge: "Neutral",
      iupacName: "2-Acetoxybenzoic acid",
      casNumber: "50-78-2"
    },
    applications: [
      "Relief of minor aches, pains, headaches, and fevers.",
      "Long-term low-dose use to prevent heart attacks, strokes, and blood clots.",
      "Treatment of inflammatory conditions like rheumatoid arthritis."
    ],
    safety: [
      "Can cause gastrointestinal bleeding and stomach ulcers.",
      "Risk of Reye's syndrome in children with viral infections.",
      "May cause allergic reactions, asthma flare-ups, or bleeding issues."
    ],
    historyAndTrivia: [
      "Aspirin's active ingredient originates from willow tree bark, used for pain relief since antiquity.",
      "Synthesized in its modern, pure form by Felix Hoffmann at Bayer in 1897."
    ],
    atoms: [
      { id: "C1", element: "C", position: [-0.64, -0.68, 0.05] },
      { id: "C2", element: "C", position: [0.73, -0.92, -0.06] },
      { id: "C3", element: "C", position: [1.63, 0.13, -0.13] },
      { id: "C4", element: "C", position: [1.17, 1.44, -0.09] },
      { id: "C5", element: "C", position: [-0.19, 1.68, 0.02] },
      { id: "C6", element: "C", position: [-1.11, 0.63, 0.09] },
      { id: "H3", element: "H", position: [2.69, -0.07, -0.21] },
      { id: "H4", element: "H", position: [1.87, 2.26, -0.14] },
      { id: "H5", element: "H", position: [-0.56, 2.69, 0.05] },
      { id: "H6", element: "H", position: [-2.17, 0.83, 0.17] },
      { id: "C7", element: "C", position: [-1.66, -1.82, 0.12] },
      { id: "O1", element: "O", position: [-2.85, -1.61, 0.23] },
      { id: "O2", element: "O", position: [-1.14, -3.07, 0.06] },
      { id: "H1", element: "H", position: [-1.82, -3.75, 0.11] },
      { id: "O3", element: "O", position: [1.27, -2.18, -0.10] },
      { id: "C8", element: "C", position: [2.49, -2.48, 0.44] },
      { id: "O4", element: "O", position: [3.16, -1.72, 1.09] },
      { id: "C9", element: "C", position: [2.90, -3.90, 0.11] },
      { id: "H9a", element: "H", position: [2.22, -4.61, 0.58] },
      { id: "H9b", element: "H", position: [3.91, -4.08, 0.47] },
      { id: "H9c", element: "H", position: [2.91, -4.02, -0.97] }
    ],
    bonds: [
      { id: "b1", from: "C1", to: "C2", order: 2 },
      { id: "b2", from: "C2", to: "C3", order: 1 },
      { id: "b3", from: "C3", to: "C4", order: 2 },
      { id: "b4", from: "C4", to: "C5", order: 1 },
      { id: "b5", from: "C5", to: "C6", order: 2 },
      { id: "b6", from: "C6", to: "C1", order: 1 },
      { id: "b7", from: "C3", to: "H3", order: 1 },
      { id: "b8", from: "C4", to: "H4", order: 1 },
      { id: "b9", from: "C5", to: "H5", order: 1 },
      { id: "b10", from: "C6", to: "H6", order: 1 },
      { id: "b11", from: "C1", to: "C7", order: 1 },
      { id: "b12", from: "C7", to: "O1", order: 2 },
      { id: "b13", from: "C7", to: "O2", order: 1 },
      { id: "b14", from: "O2", to: "H1", order: 1 },
      { id: "b15", from: "C2", to: "O3", order: 1 },
      { id: "b16", from: "O3", to: "C8", order: 1 },
      { id: "b17", from: "C8", to: "O4", order: 2 },
      { id: "b18", from: "C8", to: "C9", order: 1 },
      { id: "b19", from: "C9", to: "H9a", order: 1 },
      { id: "b20", from: "C9", to: "H9b", order: 1 },
      { id: "b21", from: "C9", to: "H9c", order: 1 }
    ]
  },
  ammonia: {
    name: "Ammonia",
    formula: "NH₃",
    weight: 17.031,
    description: "Ammonia is a compound of nitrogen and hydrogen with the formula NH₃. A stable binary hydride, ammonia is a colorless gas with a characteristic pungent smell. It is a vital building block in agriculture and chemical manufacturing.",
    properties: {
      meltingPoint: "-77.73 °C (-107.91 °F)",
      boilingPoint: "-33.34 °C (-28.01 °F)",
      density: "0.73 g/L (gas)",
      solubility: "31% w/w in water",
      charge: "Neutral",
      iupacName: "Azane",
      casNumber: "7664-41-7"
    },
    applications: [
      "Key source for nitrogen fertilizers (urea, ammonium nitrate).",
      "Industrial and commercial refrigerant gas.",
      "Manufacture of plastics, explosives, fabrics, and household cleaners."
    ],
    safety: [
      "Highly toxic if inhaled in high concentrations; highly corrosive to skin and eyes.",
      "Anhydrous ammonia must be handled under extreme pressure or refrigeration."
    ],
    historyAndTrivia: [
      "Fritz Haber and Carl Bosch developed the Haber-Bosch process to synthesize ammonia from atmospheric nitrogen, which now sustains global food production.",
      "Ammonia has a trigonal pyramidal shape with a bond angle of 107.8°, which is slightly less than the tetrahedral 109.5° due to the lone pair's repulsion."
    ],
    atoms: [
      { id: "N1", element: "N", position: [0, 0.11, 0] },
      { id: "H1", element: "H", position: [0.94, -0.26, 0] },
      { id: "H2", element: "H", position: [-0.47, -0.26, 0.81] },
      { id: "H3", element: "H", position: [-0.47, -0.26, -0.81] }
    ],
    bonds: [
      { id: "b1", from: "N1", to: "H1", order: 1 },
      { id: "b2", from: "N1", to: "H2", order: 1 },
      { id: "b3", from: "N1", to: "H3", order: 1 }
    ]
  },
  propane: {
    name: "Propane",
    formula: "C₃H₈",
    weight: 44.1,
    description: "Propane is a three-carbon alkane gas, normally gaseous but compressible to a transportable liquid. A by-product of natural gas processing and petroleum refining, it is commonly used as a fuel for grills, heaters, and vehicles.",
    properties: {
      meltingPoint: "-187.7 °C (-305.9 °F)",
      boilingPoint: "-42.1 °C (-43.8 °F)",
      density: "2.009 g/L (gas)",
      solubility: "47 mg/L in water",
      charge: "Neutral (Non-polar)",
      iupacName: "Propane",
      casNumber: "74-98-6"
    },
    applications: [
      "Fuel for domestic heating, cooking, hot water, and outdoor grilling.",
      "Alternative vehicle fuel known as Autogas.",
      "Propellant in aerosol sprays and industrial refrigerant."
    ],
    safety: [
      "Extremely flammable gas under pressure.",
      "Risk of rapid frostbite from liquid leaks.",
      "Asphyxiant by displacing air in enclosed spaces."
    ],
    historyAndTrivia: [
      "Propane was identified as a volatile component in gasoline by Walter O. Snelling in 1910.",
      "The C-C-C backbone in propane is not straight; it has a tetrahedral bend with a bond angle of about 111.5°."
    ],
    atoms: [
      { id: "C1", element: "C", position: [-1.27, -0.19, 0] },
      { id: "C2", element: "C", position: [0, 0.58, 0] },
      { id: "C3", element: "C", position: [1.27, -0.19, 0] },
      { id: "H1a", element: "H", position: [-1.29, -0.83, 0.88] },
      { id: "H1b", element: "H", position: [-1.29, -0.83, -0.88] },
      { id: "H1c", element: "H", position: [-2.14, 0.47, 0] },
      { id: "H2a", element: "H", position: [0, 1.23, 0.88] },
      { id: "H2b", element: "H", position: [0, 1.23, -0.88] },
      { id: "H3a", element: "H", position: [1.29, -0.83, 0.88] },
      { id: "H3b", element: "H", position: [1.29, -0.83, -0.88] },
      { id: "H3c", element: "H", position: [2.14, 0.47, 0] }
    ],
    bonds: [
      { id: "b1", from: "C1", to: "C2", order: 1 },
      { id: "b2", from: "C2", to: "C3", order: 1 },
      { id: "b3", from: "C1", to: "H1a", order: 1 },
      { id: "b4", from: "C1", to: "H1b", order: 1 },
      { id: "b5", from: "C1", to: "H1c", order: 1 },
      { id: "b6", from: "C2", to: "H2a", order: 1 },
      { id: "b7", from: "C2", to: "H2b", order: 1 },
      { id: "b8", from: "C3", to: "H3a", order: 1 },
      { id: "b9", from: "C3", to: "H3b", order: 1 },
      { id: "b10", from: "C3", to: "H3c", order: 1 }
    ]
  },
  adrenaline: {
    name: "Adrenaline",
    formula: "C₉H₁₃NO₃",
    weight: 183.20,
    description: "Adrenaline, also known as epinephrine, is a hormone and medication which is involved in regulating visceral functions (e.g., respiration). It is produced by both the adrenal glands and certain neurons, activating the 'fight-or-flight' survival response.",
    properties: {
      meltingPoint: "211 °C (412 °F)",
      boilingPoint: "Decomposes",
      density: "1.28 g/cm³",
      solubility: "Slightly soluble in water",
      charge: "Neutral",
      iupacName: "(R)-4-(1-hydroxy-2-(methylamino)ethyl)benzene-1,2-diol",
      casNumber: "51-43-4"
    },
    applications: [
      "Emergency treatment of life-threatening allergic reactions (anaphylaxis).",
      "Cardiac arrest resuscitation to restore heart rhythm.",
      "Added to local anesthetics to prolong their numbing effect by constricting blood vessels."
    ],
    safety: [
      "Administered strictly under medical supervision or via autoinjectors (EpiPen) for emergencies.",
      "Side effects include rapid heart rate, anxiety, sweating, tremors, and high blood pressure."
    ],
    historyAndTrivia: [
      "First isolated and purified in 1901 by the Japanese chemist Jokichi Takamine.",
      "The term 'adrenaline' is derived from Latin words 'ad' and 'renes', literally meaning 'at the kidneys', referencing the adrenal glands."
    ],
    atoms: [
      { id: "C1", element: "C", position: [-1.2, 0.8, 0] },
      { id: "C2", element: "C", position: [-1.9, -0.4, 0] },
      { id: "C3", element: "C", position: [-1.2, -1.6, 0] },
      { id: "C4", element: "C", position: [0.2, -1.6, 0] },
      { id: "C5", element: "C", position: [0.9, -0.4, 0] },
      { id: "C6", element: "C", position: [0.2, 0.8, 0] },
      { id: "H1", element: "H", position: [-1.75, 1.73, 0] },
      { id: "H4", element: "H", position: [0.75, -2.53, 0] },
      { id: "H6", element: "H", position: [0.75, 1.73, 0] },
      { id: "O1", element: "O", position: [-3.25, -0.4, 0] },
      { id: "HO1", element: "H", position: [-3.65, -1.27, 0] },
      { id: "O2", element: "O", position: [-1.9, -2.8, 0] },
      { id: "HO2", element: "H", position: [-2.85, -2.8, 0] },
      { id: "C7", element: "C", position: [2.4, -0.4, 0] },
      { id: "H7", element: "H", position: [2.75, -0.9, 0.88] },
      { id: "O3", element: "O", position: [2.9, 0.9, 0] },
      { id: "HO3", element: "H", position: [3.85, 0.9, 0] },
      { id: "C8", element: "C", position: [3.1, -1.1, -1.1] },
      { id: "H8a", element: "H", position: [2.75, -0.6, -1.98] },
      { id: "H8b", element: "H", position: [2.75, -2.1, -1.1] },
      { id: "N1", element: "N", position: [4.55, -1.1, -1.1] },
      { id: "HN", element: "H", position: [4.9, -1.6, -0.25] },
      { id: "C9", element: "C", position: [5.25, -1.8, -2.2] },
      { id: "H9a", element: "H", position: [4.9, -1.4, -3.15] },
      { id: "H9b", element: "H", position: [6.3, -1.8, -2.2] },
      { id: "H9c", element: "H", position: [4.9, -2.85, -2.2] }
    ],
    bonds: [
      { id: "b1", from: "C1", to: "C2", order: 1.5 },
      { id: "b2", from: "C2", to: "C3", order: 1.5 },
      { id: "b3", from: "C3", to: "C4", order: 1.5 },
      { id: "b4", from: "C4", to: "C5", order: 1.5 },
      { id: "b5", from: "C5", to: "C6", order: 1.5 },
      { id: "b6", from: "C6", to: "C1", order: 1.5 },
      { id: "b7", from: "C1", to: "H1", order: 1 },
      { id: "b8", from: "C4", to: "H4", order: 1 },
      { id: "b9", from: "C6", to: "H6", order: 1 },
      { id: "b10", from: "C2", to: "O1", order: 1 },
      { id: "b11", from: "O1", to: "HO1", order: 1 },
      { id: "b12", from: "C3", to: "O2", order: 1 },
      { id: "b13", from: "O2", to: "HO2", order: 1 },
      { id: "b14", from: "C5", to: "C7", order: 1 },
      { id: "b15", from: "C7", to: "H7", order: 1 },
      { id: "b16", from: "C7", to: "O3", order: 1 },
      { id: "b17", from: "O3", to: "HO3", order: 1 },
      { id: "b18", from: "C7", to: "C8", order: 1 },
      { id: "b19", from: "C8", to: "H8a", order: 1 },
      { id: "b20", from: "C8", to: "H8b", order: 1 },
      { id: "b21", from: "C8", to: "N1", order: 1 },
      { id: "b22", from: "N1", to: "HN", order: 1 },
      { id: "b23", from: "N1", to: "C9", order: 1 },
      { id: "b24", from: "C9", to: "H9a", order: 1 },
      { id: "b25", from: "C9", to: "H9b", order: 1 },
      { id: "b26", from: "C9", to: "H9c", order: 1 }
    ]
  },
  acetone: {
    name: "Acetone",
    formula: "C₃H₆O",
    weight: 58.08,
    description: "Acetone, also known as propanone, is an organic compound with the formula (CH₃)₂CO. It is the simplest and smallest ketone, and is a colorless, highly volatile and flammable liquid with a characteristic sweetish odor.",
    properties: {
      meltingPoint: "-94.7 °C (-138.5 °F)",
      boilingPoint: "56.05 °C (132.89 °F)",
      density: "0.784 g/cm³",
      solubility: "Miscible in water",
      charge: "Neutral (Polar)",
      iupacName: "Propan-2-one",
      casNumber: "67-64-1"
    },
    applications: [
      "Important industrial solvent for plastics, paints, and synthetic fibers.",
      "Active ingredient in nail polish remover.",
      "Chemical precursor to methyl methacrylate and bisphenol A."
    ],
    safety: [
      "Highly flammable liquid and vapor.",
      "Causes severe eye irritation.",
      "Inhalation may cause drowsiness, dizziness, or headaches."
    ],
    historyAndTrivia: [
      "Acetone was first produced by Chaim Weizmann during World War I using bacterial fermentation, which was critical for gunpowder production.",
      "Acetone is naturally produced in the human body through metabolic processes, especially during ketosis."
    ],
    atoms: [
      { id: "C2", element: "C", position: [0, 0.18, 0] },
      { id: "O1", element: "O", position: [0, 1.40, 0] },
      { id: "C1", element: "C", position: [-1.28, -0.62, 0] },
      { id: "C3", element: "C", position: [1.28, -0.62, 0] },
      { id: "H1a", element: "H", position: [-1.28, -1.26, 0.88] },
      { id: "H1b", element: "H", position: [-1.28, -1.26, -0.88] },
      { id: "H1c", element: "H", position: [-2.14, 0.04, 0] },
      { id: "H3a", element: "H", position: [1.28, -1.26, 0.88] },
      { id: "H3b", element: "H", position: [1.28, -1.26, -0.88] },
      { id: "H3c", element: "H", position: [2.14, 0.04, 0] }
    ],
    bonds: [
      { id: "b1", from: "C2", to: "O1", order: 2 },
      { id: "b2", from: "C2", to: "C1", order: 1 },
      { id: "b3", from: "C2", to: "C3", order: 1 },
      { id: "b4", from: "C1", to: "H1a", order: 1 },
      { id: "b5", from: "C1", to: "H1b", order: 1 },
      { id: "b6", from: "C1", to: "H1c", order: 1 },
      { id: "b7", from: "C3", to: "H3a", order: 1 },
      { id: "b8", from: "C3", to: "H3b", order: 1 },
      { id: "b9", from: "C3", to: "H3c", order: 1 }
    ]
  },
  ethylene: {
    name: "Ethylene",
    formula: "C₂H₄",
    weight: 28.05,
    description: "Ethylene, IUPAC name ethene, is a gaseous hydrocarbon with the formula C₂H₄. It is a colorless, sweet-smelling gas. It is the simplest alkene and plays a massive role in organic chemistry, polymer manufacturing, and as a natural plant hormone.",
    properties: {
      meltingPoint: "-169.2 °C (-272.6 °F)",
      boilingPoint: "-103.7 °C (-154.7 °F)",
      density: "1.178 g/L (gas)",
      solubility: "131 mg/L in water",
      charge: "Neutral (Non-polar)",
      iupacName: "Ethene",
      casNumber: "74-85-1"
    },
    applications: [
      "Primary feedstock for polyethylene, the world's most common plastic.",
      "Agricultural ripening agent for fruits like bananas and tomatoes.",
      "Precursor to ethylene glycol (antifreeze) and ethanol."
    ],
    safety: [
      "Extremely flammable gas; forms explosive mixtures with air.",
      "Asphyxiant at high concentrations."
    ],
    historyAndTrivia: [
      "Ethylene's role as a fruit ripener was discovered when farmers noticed that leakage from gas-powered street lights caused nearby trees to shed leaves and fruits to ripen early.",
      "It has a planar geometry with a strong double bond between the carbons, with a H-C-H bond angle of 117.4°."
    ],
    atoms: [
      { id: "C1", element: "C", position: [-0.67, 0, 0] },
      { id: "C2", element: "C", position: [0.67, 0, 0] },
      { id: "H1", element: "H", position: [-1.23, 0.93, 0] },
      { id: "H2", element: "H", position: [-1.23, -0.93, 0] },
      { id: "H3", element: "H", position: [1.23, 0.93, 0] },
      { id: "H4", element: "H", position: [1.23, -0.93, 0] }
    ],
    bonds: [
      { id: "b1", from: "C1", to: "C2", order: 2 },
      { id: "b2", from: "C1", to: "H1", order: 1 },
      { id: "b3", from: "C1", to: "H2", order: 1 },
      { id: "b4", from: "C2", to: "H3", order: 1 },
      { id: "b5", from: "C2", to: "H4", order: 1 }
    ]
  },
  methanol: {
    name: "Methanol",
    formula: "CH₃OH",
    weight: 32.04,
    description: "Methanol, also known as methyl alcohol amongst other names, is a chemical and the simplest alcohol, with the formula CH₃OH. It is a light, volatile, colorless, flammable liquid with a distinctive alcoholic odor.",
    properties: {
      meltingPoint: "-97.6 °C (-143.7 °F)",
      boilingPoint: "64.7 °C (148.5 °F)",
      density: "0.792 g/cm³",
      solubility: "Miscible in water",
      charge: "Neutral (Polar)",
      iupacName: "Methanol",
      casNumber: "67-56-1"
    },
    applications: [
      "Industrial solvent and fuel source.",
      "Precursor to formaldehyde, plastics, and synthetic resins.",
      "Denaturant for ethanol to prevent human consumption."
    ],
    safety: [
      "Highly toxic; ingestion of even small amounts (10mL) can cause permanent blindness, and larger amounts (30mL) can be fatal.",
      "Flammable liquid and vapor; burns with an invisible flame in daylight."
    ],
    historyAndTrivia: [
      "Methanol was first isolated in 1661 by Robert Boyle via the distillation of wood, which is why it is historically called 'wood alcohol'.",
      "During the Prohibition era, the US government ordered the 'denaturing' of industrial alcohols with methanol, leading to thousands of accidental poisonings."
    ],
    atoms: [
      { id: "C1", element: "C", position: [-0.66, -0.02, 0] },
      { id: "O1", element: "O", position: [0.74, 0.12, 0] },
      { id: "H1", element: "H", position: [1.14, -0.75, 0] },
      { id: "H2", element: "H", position: [-1.02, 0.49, 0.88] },
      { id: "H3", element: "H", position: [-1.02, 0.49, -0.88] },
      { id: "H4", element: "H", position: [-1.02, -1.05, 0] }
    ],
    bonds: [
      { id: "b1", from: "C1", to: "O1", order: 1 },
      { id: "b2", from: "O1", to: "H1", order: 1 },
      { id: "b3", from: "C1", to: "H2", order: 1 },
      { id: "b4", from: "C1", to: "H3", order: 1 },
      { id: "b5", from: "C1", to: "H4", order: 1 }
    ]
  },
  hcl: {
    name: "Hydrochloric Acid",
    formula: "HCl",
    weight: 36.46,
    description: "Hydrochloric acid is an inorganic, highly corrosive, strong acid. A solution of hydrogen chloride (HCl) gas in water, it is a key laboratory reagent and industrial chemical, also found naturally as stomach acid.",
    properties: {
      meltingPoint: "-30 °C (-22 °F) (37% sol.)",
      boilingPoint: "48 °C (118 °F) (37% sol.)",
      density: "1.19 g/cm³ (37% sol.)",
      solubility: "Highly miscible in water",
      charge: "Neutral (Polar diatomic)",
      iupacName: "Chlorane",
      casNumber: "7647-01-0"
    },
    applications: [
      "Pickling of steel to remove rust or scale before processing.",
      "pH regulation in water treatment, food, and pharmaceuticals.",
      "Regeneration of ion exchange resins used in water purification."
    ],
    safety: [
      "Extremely corrosive to skin, eyes, and mucous membranes.",
      "Vapors are highly irritating and toxic to breathe."
    ],
    historyAndTrivia: [
      "Historically called 'muriatic acid' or 'spirits of salt', hydrochloric acid was discovered by the alchemist Jabir ibn Hayyan around 800 AD by distilling salt with vitriol.",
      "The parietal cells of the human stomach secrete hydrochloric acid to achieve an extremely low pH of 1.5 to 3.5, essential for digesting proteins."
    ],
    atoms: [
      { id: "Cl1", element: "Cl", position: [-0.08, 0, 0] },
      { id: "H1", element: "H", position: [1.19, 0, 0] }
    ],
    bonds: [
      { id: "b1", from: "Cl1", to: "H1", order: 1 }
    ]
  },
  nacl: {
    name: "Sodium Chloride",
    formula: "NaCl",
    weight: 58.44,
    description: "Sodium chloride, commonly known as salt or table salt, is an ionic compound with the chemical formula NaCl, representing a 1:1 ratio of sodium and chloride ions. It is the salt most responsible for the salinity of seawater and of the extracellular fluid of many multicellular organisms.",
    properties: {
      meltingPoint: "801 °C (1,474 °F)",
      boilingPoint: "1,465 °C (2,669 °F)",
      density: "2.16 g/cm³",
      solubility: "360 g/L in water",
      charge: "Neutral (Ionic diatomic)",
      iupacName: "Sodium chloride",
      casNumber: "7647-14-5"
    },
    applications: [
      "Essential dietary nutrient and seasoning/preservative for foods.",
      "De-icing of roads and highways in winter.",
      "Feedstock for the chloralkali process to manufacture chlorine and sodium hydroxide."
    ],
    safety: [
      "Generally non-hazardous in standard dietary amounts.",
      "Excessive intake leads to hypertension and cardiovascular risk.",
      "Causes mild skin/eye irritation in high dry concentrations."
    ],
    historyAndTrivia: [
      "Salt was so valuable in ancient times that Roman soldiers were sometimes paid in salt, which is the origin of the word 'salary' (from Latin 'salarium').",
      "While sodium is a highly reactive, explosive metal and chlorine is a toxic green gas, combining them creates a stable, edible mineral essential for life."
    ],
    atoms: [
      { id: "Na1", element: "Na", position: [-1.18, 0, 0] },
      { id: "Cl1", element: "Cl", position: [1.18, 0, 0] }
    ],
    bonds: [
      { id: "b1", from: "Na1", to: "Cl1", order: 1 }
    ]
  }
};
export const PREDEFINED_KEYS = Object.keys(PREDEFINED_MOLECULES);
