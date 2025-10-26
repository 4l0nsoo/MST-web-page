import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users, AdminUser, ClientUser } from "../users";

const router = Router();

if (!process.env.JWT_SECRET) {
  console.error("❌ ERROR FATAL: JWT_SECRET no está definido en el entorno.");
  process.exit(1); 
}

const SECRET_KEY = process.env.JWT_SECRET as string

// Login administrador (correo + contraseña)
router.post("/login-admin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find(
    u => u.type === "admin" && u.email === email
  ) as AdminUser | undefined;

  if (!user) return res.status(400).json({ message: "Administrador no encontrado" });

  const valid = password === user.passwordHash;
  if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id, role: "admin" }, SECRET_KEY, { expiresIn: "2h" });

  res.json({ message: "Login exitoso", token });
});



// Consulta de cliente (por código de referencia)
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

//Actualización de estado del cliente (protegido, solo admin)
router.post("/update-client", (req: Request, res: Response) => {
  const { ref, computerStatus, note, estimatedTime } = req.body;

  const client = users.find((u) => u.type === "client" && u.ref === ref);
  if (!client) return res.status(404).json({ message: "Cliente no encontrado" });

  // 🔧 Actualizar datos
  (client as ClientUser).computerStatus = computerStatus;
  (client as ClientUser).note = note;
  (client as ClientUser).estimatedTime = estimatedTime;

  res.json({ message: "Datos actualizados correctamente" });
});


export default router;
