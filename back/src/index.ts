import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import mailRoutes from "./routes/mail";
import chatbotRoutes from "./routes/chatbot";
import tokenRoutes from "./routes/token";

const app = express();

// Middleware de logging para depuración
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());

// app.use(cors()); // Permitir todas las solicitudes CORS durante el desarrollo

app.use(cors({
  origin: ["http://localhost:5173", "https://mst-web-page.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));


// Rutas
app.use("/api/mail", mailRoutes);
app.use("/api", authRoutes);
app.use("/api", chatbotRoutes);
app.use("/api", tokenRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
