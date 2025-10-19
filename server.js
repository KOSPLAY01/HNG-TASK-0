import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const USER_PROFILE = {
  email: process.env.EMAIL,
  name: process.env.NAME,
  stack: process.env.STACK,
};

async function fetchCatFact() {
  try {
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000,
    });
    return response.data.fact;
  } catch (error) {
    console.error(" Error fetching cat fact:", error.message);
    return "Cats are adorable creatures with a love for naps!";
  }
}

app.get("/me", async (req, res) => {
  const fact = await fetchCatFact();
  const timestamp = new Date().toISOString();

  res.status(200).json({
    status: "success",
    user: USER_PROFILE,
    timestamp,
    fact,
  });
});

// Export the app so it can be used by serverless functions.
import { fileURLToPath } from "url";
import path from "path";

const PORT = process.env.PORT || 3000;
export default app;

// If run directly (node server.js), start a local server. When imported as a function
// (for Netlify), this block will not run.
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
