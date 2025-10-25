import { Router, Request, Response } from "express";
import { transporter } from "../mailer";

const router = Router();

router.post("/send-mail", async (req: Request, res: Response) => {
  const { nombre, email, telefono, mensaje } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"Formulario de servicio" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: "Nueva solicitud de servicio",
      html: `
        <h3>Datos del cliente</h3>
        <ul>
          <li><b>Nombre:</b> ${nombre}</li>
          <li><b>Email:</b> ${email}</li>
          <li><b>Teléfono:</b> ${telefono}</li>
        </ul>
        <p><b>Mensaje:</b> ${mensaje}</p>
      `,
    });

    console.log("Correo enviado:", info);
    res.status(200).json({ message: "Correo enviado correctamente ✅" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).json({ message: "Error al enviar el correo ❌", error });
  }
});

export default router;