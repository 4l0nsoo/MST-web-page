import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();
const SECRET_KEY = process.env.JWT_SECRET as string;

// Verifica si el token aún es válido
router.get("/verify-token", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ valid: true, decoded });
  } catch (err) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
});

export default router;