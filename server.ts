import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json({ limit: "5mb" }));

  // API Route: Dynamic Molecule Generation
  app.post("/api/molecule", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== "string" || !query.trim()) {
        return res.status(400).json({ error: "A search query is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        return res.status(400).json({
          error: "API_KEY_MISSING",
          message: "Gemini API Key is not configured. Please add GEMINI_API_KEY to your Secrets panel, or enjoy our local library of 6 pre-built classic molecules!"
        });
      }

      // Lazy initialize GoogleGenAI with proper headers for AI Studio
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `Retrieve and construct the structural and chemical profile of the molecule: "${query.trim()}".
Requirements:
1. Find the closest valid chemistry compound name if the query is a synonym or common term (e.g., 'table salt' -> 'Sodium Chloride', 'aspirin' -> 'Aspirin').
2. Atoms MUST be placed in realistic 3D coordinates [x, y, z] in Angstroms, adhering to proper bond lengths (~1.0 to 2.2 Å) and appropriate chemical bond angles (VSEPR geometries, e.g. bent for water, tetrahedral for sp3 carbon, planar for benzene rings).
3. The coordinate system must be centered: average all atom positions to be close to [0, 0, 0].
4. Connect all bonds correctly with appropriate orders (1 = single, 2 = double, 3 = triple).
5. For extremely large macromolecules, polymers, proteins, or DNA strands, do NOT return thousands of atoms; instead, generate a beautiful, simplified, and representative segment (e.g. 15 to 40 atoms) representing the monomer, active site, or unit structure so it renders smoothly on mobile.
6. Provide accurate extra information (melting/boiling point, applications, safety, history, and trivia).`;

      // Define the schema strictly using Type from @google/genai
      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "Common name of the molecule (e.g. Acetic Acid)"
          },
          formula: {
            type: Type.STRING,
            description: "Chemical formula (e.g. CH3COOH). Use standard subscript characters if preferred, or plain text."
          },
          weight: {
            type: Type.NUMBER,
            description: "Molecular weight in g/mol"
          },
          description: {
            type: Type.STRING,
            description: "An educational, clear description summarizing what the molecule is, its primary role, and significance."
          },
          properties: {
            type: Type.OBJECT,
            properties: {
              meltingPoint: { type: Type.STRING, description: "Melting point with units (e.g. 16.6 °C)" },
              boilingPoint: { type: Type.STRING, description: "Boiling point with units (e.g. 118.1 °C)" },
              density: { type: Type.STRING, description: "Density (e.g. 1.05 g/cm³)" },
              solubility: { type: Type.STRING, description: "Solubility details (e.g. Miscible in water)" },
              charge: { type: Type.STRING, description: "Molecular net charge (e.g. Neutral)" },
              iupacName: { type: Type.STRING, description: "Official systematic IUPAC name" },
              casNumber: { type: Type.STRING, description: "CAS Registry Number (e.g. 64-19-7)" }
            },
            required: ["iupacName"]
          },
          applications: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of real-world uses, biological roles, or industrial processes."
          },
          safety: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Hazard notices, handling cautions, or safety characteristics."
          },
          historyAndTrivia: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Interesting history, discovery stories, nomenclature origins, or chemical secrets."
          },
          atoms: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: "Unique alphanumeric id (e.g., C1, H1, O1)" },
                element: { type: Type.STRING, description: "Element symbol matching PT (e.g., H, C, O, N, S, P, Cl, Na)" },
                position: {
                  type: Type.ARRAY,
                  items: { type: Type.NUMBER },
                  description: "3D coordinates [x, y, z] in Angstroms. Must represent true geometric shapes, centered around [0,0,0]."
                }
              },
              required: ["id", "element", "position"]
            },
            description: "List of atoms comprising the compound segment."
          },
          bonds: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: "Unique bond id (e.g. b1, b2)" },
                from: { type: Type.STRING, description: "Id of the starting atom" },
                to: { type: Type.STRING, description: "Id of the destination atom" },
                order: { type: Type.INTEGER, description: "Covalent order: 1 (single), 2 (double), 3 (triple)" }
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

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received from the Gemini model.");
      }

      const moleculeData = JSON.parse(responseText);
      return res.json(moleculeData);
    } catch (error: any) {
      console.error("Error generating molecule:", error);
      return res.status(500).json({
        error: "GENERATION_ERROR",
        message: error.message || "Failed to analyze and build 3D structure for this molecule. Please try again with a different name."
      });
    }
  });

  // Handle Vite Asset Serving & Routing
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Web server successfully running on http://localhost:${PORT}`);
  });
}

startServer();
