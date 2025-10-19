import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";
import { getRandomFact } from "../../utils/getFact.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/me", async (req, res) => {
  try {
    const fact = await getRandomFact();
    res.status(200).json({
      status: "success",
      user: {
        email: process.env.EMAIL,
        name: process.env.NAME,
        stack: process.env.STACK,
      },
      timestamp: new Date().toISOString(),
      fact,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export const handler = serverless(app);
