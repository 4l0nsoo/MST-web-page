import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
