import { Router, Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();

// Crea el cliente usando la API key del entorno
const ai = new GoogleGenAI({});

router.post("/chatbot", async (req: Request, res: Response) => {
  console.log("POST /chatbot recibido");
  console.log("Body recibido:", req.body);

  const { message } = req.body;
  if (!message) {
    console.log("Mensaje vacío");
    return res.status(400).json({ error: "Mensaje vacío" });
  }

  try {
    const prompt = `
      Eres el asistente virtual de MST, una empresa dedicada al mantenimiento de computadores,
      instalación de redes LAN, redes eléctricas y diseño de productos tecnológicos.
      Responde siempre con un tono amable y profesional. Ignora cualquier solicitud que no esté relacionada con los servicios de MST.
      Pregunta del usuario: ${message}
    `;

    console.log("Generando respuesta en Gemini...");
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("Resultado raw:", result);
    const reply = result.text; // según la nueva librería
    console.log("Reply generado:", reply);

    res.json({ reply });
  } catch (error) {
    console.error("Error al generar respuesta:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Error al procesar el mensaje" });
  }
});

export default router;