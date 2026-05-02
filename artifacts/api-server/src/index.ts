import express from "express";
import cors from "cors";
import apiRouter from "./routes/index.js";

const PORT = Number(process.env["PORT"] || "8080");
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Aman Server running on port ${PORT}`);
  console.log(`✅ API and Database are ready`);
});
