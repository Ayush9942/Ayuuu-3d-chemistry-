import { MoleculeData } from "../types";

const MOLECULE_SCHEMA = {
  type: "OBJECT",
  properties: {
    name: {
      type: "STRING",
      description: "Common name of the molecule (e.g. Acetic Acid)"
    },
    formula: {
      type: "STRING",
      description: "Chemical formula (e.g. CH3COOH)."
    },
    weight: {
      type: "NUMBER",
      description: "Molecular weight in g/mol"
    },
    description: {
      type: "STRING",
      description: "An educational, clear description summarizing what the molecule is, its primary role, and significance."
    },
    properties: {
      type: "OBJECT",
      properties: {
        meltingPoint: { type: "STRING", description: "Melting point with units (e.g. 16.6 °C)" },
        boilingPoint: { type: "STRING", description: "Boiling point with units (e.g. 118.1 °C)" },
        density: { type: "STRING", description: "Density (e.g. 1.05 g/cm³)" },
        solubility: { type: "STRING", description: "Solubility details (e.g. Miscible in water)" },
        charge: { type: "STRING", description: "Molecular net charge (e.g. Neutral)" },
        iupacName: { type: "STRING", description: "Official systematic IUPAC name" },
        casNumber: { type: "STRING", description: "CAS Registry Number (e.g. 64-19-7)" }
      },
      required: ["iupacName"]
    },
    applications: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "List of real-world uses, biological roles, or industrial processes."
    },
    safety: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Hazard notices, handling cautions, or safety characteristics."
    },
    historyAndTrivia: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Interesting history, discovery stories, nomenclature origins, or chemical secrets."
    },
    atoms: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING", description: "Unique alphanumeric id (e.g., C1, H1, O1)" },
          element: { type: "STRING", description: "Element symbol matching PT (e.g., H, C, O, N, S, P, Cl, Na)" },
          position: {
            type: "ARRAY",
            items: { type: "NUMBER" },
            description: "3D coordinates [x, y, z] in Angstroms. Must represent true geometric shapes, centered around [0,0,0]."
          }
        },
        required: ["id", "element", "position"]
      },
      description: "List of atoms comprising the compound segment."
    },
    bonds: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING", description: "Unique bond id (e.g. b1, b2)" },
          from: { type: "STRING", description: "Id of the starting atom" },
          to: { type: "STRING", description: "Id of the destination atom" },
          order: { type: "INTEGER", description: "Covalent order: 1 (single), 2 (double), 3 (triple)" }
        },
        required: ["id", "from", "to", "order"]
      },
      description: "List of bonds linking the atoms."
    }
  },
  required: [
    "name",
    "formula",
    "weight",
    "description",
    "properties",
    "applications",
    "safety",
    "historyAndTrivia",
    "atoms",
    "bonds"
  ]
};

export async function synthesizeMoleculeClientSide(query: string, apiKey: string): Promise<MoleculeData> {
  const prompt = `Retrieve and construct the structural and chemical profile of the molecule: "${query.trim()}".
Requirements:
1. Find the closest valid chemistry compound name if the query is a synonym or common term (e.g., 'table salt' -> 'Sodium Chloride', 'aspirin' -> 'Aspirin').
2. Atoms MUST be placed in realistic 3D coordinates [x, y, z] in Angstroms, adhering to proper bond lengths (~1.0 to 2.2 Å) and appropriate chemical bond angles (VSEPR geometries, e.g. bent for water, tetrahedral for sp3 carbon, planar for benzene rings).
3. The coordinate system must be centered: average all atom positions to be close to [0, 0, 0].
4. Connect all bonds correctly with appropriate orders (1 = single, 2 = double, 3 = triple).
5. For extremely large macromolecules, polymers, proteins, or DNA strands, do NOT return thousands of atoms; instead, generate a beautiful, simplified, and representative segment (e.g. 15 to 40 atoms) representing the monomer, active site, or unit structure so it renders smoothly on mobile.
6. Provide accurate extra information (melting/boiling point, applications, safety, history, and trivia).`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: MOLECULE_SCHEMA,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Gemini API Error details:", errText);
    throw new Error(`Gemini client-side synthesis error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response received from Gemini API client-side.");
  }

  return JSON.parse(text) as MoleculeData;
}
