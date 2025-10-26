import { Router, Request, Response} from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/api/chatbot", async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensaje vacío" });
  }

  try {
    const prompt = `
      Eres el asistente virtual de MST, una empresa dedicada al mantenimiento de computadores,
      instalación de redes LAN, redes eléctricas y diseño de productos tecnológicos.
      Responde siempre con un tono amable y profesional.
      Pregunta del usuario: ${message}
    `;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();
    res.json({ reply });
  } catch (error) {
    console.error("Error al generar respuesta:", error);
    res.status(500).json({ error: "Error al procesar el mensaje" });
  }
});

export default router;