import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import mailRoutes from "./routes/mail";
import bodyParser from "body-parser";
import chatbotRoutes from "./routes/chatbot";



const app = express();


// Desarrollo
// app.use(cors());

// Produccion
app.use(express.json());
app.use(cors({
  origin: ["https://mst-web-page.vercel.app"],
  methods: ["GET", "POST","OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));
app.use("/api/mail", mailRoutes);
app.use("/api", authRoutes);
app.use("/api", chatbotRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
