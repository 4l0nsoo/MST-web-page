import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users, AdminUser, ClientUser } from "../users.js";

const router = Router();
const SECRET_KEY = "clave_super_secreta";

// 🔐 Login administrador (correo + contraseña)
router.post("/login-admin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find(
    u => u.type === "admin" && u.email === email
  ) as AdminUser | undefined;

  if (!user) return res.status(400).json({ message: "Administrador no encontrado" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id, role: "admin" }, SECRET_KEY, { expiresIn: "2h" });

  res.json({ message: "Login exitoso", token });
});

// 🔎 Consulta de cliente (por código de referencia)
router.get("/client/:code", (req: Request, res: Response) => {
  const { code } = req.params;

  const client = users.find(
    u => u.type === "client" && u.ref === code
  ) as ClientUser | undefined;

  if (!client) return res.status(404).json({ message: "Código no encontrado" });

  res.json({
    referenceCode: client.ref,
    computerStatus: client.computerStatus,
    note: client.note,
    estimatedTime: client.estimatedTime,
  });
});

export default router;
