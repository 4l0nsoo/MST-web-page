import { Router, Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();

// Crea el cliente usando la API key del entorno
const ai = new GoogleGenAI({});
const FAQ = `
Preguntas Frecuentes de MST:

1. ¿Qué servicios ofrecen?
   Ofrecemos mantenimiento de computadores, instalación de redes de datos, redes eléctricas y desarrollo de soluciones tecnológicas con Arduino.

2. ¿Atienden a domicilio?
   Sí, ofrecemos servicio técnico a domicilio o en las instalaciones del cliente.

3. ¿Qué incluye el mantenimiento preventivo?
   Limpieza física, revisión de hardware y software, actualización del sistema y diagnóstico de fallas.

4. ¿Realizan proyectos con Arduino personalizados?
   Sí, desarrollamos soluciones automatizadas e IoT para hogares, empresas o instituciones educativas.

5. ¿En qué ciudad operan?
   Operamos principalmente en Cali.

6. ¿Ofrecen contratos de mantenimiento empresarial?
   Sí, contamos con planes preventivos y correctivos con soporte prioritario.

7. ¿Tienen garantía en los servicios?
   Sí, todos los servicios incluyen garantía según el tipo de trabajo realizado.

8. Donde estan ubicados?
   Estamos ubicados en Cra. 33 #42c82 42c- a Cali, Valle del Cauca
`;

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
      instalación de redes LAN, redes eléctricas y diseño de productos tecnológicos en Cali, valle del cauca, esto ultimo no hace falta especificarlo en tu presentacion.
      Responde siempre con un tono amable, profesional y breve. Ignora cualquier solicitud que no esté relacionada con los servicios de MST. esta son unas preguntas
      frecuentes que te pueden ayudar a responder mejor las dudas de los usuarios pero puedes usar sinonimos o darle un trato agradable: ${FAQ}
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