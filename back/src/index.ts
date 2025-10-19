import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import mailRoutes from "./routes/mail";
import bodyParser from "body-parser";


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/mail", mailRoutes);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
