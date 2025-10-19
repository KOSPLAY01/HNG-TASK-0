import express from "express";
// Use native fetch (available in Node 18+). Avoid axios to simplify Netlify bundling.
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
  const url = "https://catfact.ninja/fact";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return "Cats are adorable creatures with a love for naps!";
    const data = await res.json();
    return data?.fact || "Cats are adorable creatures with a love for naps!";
  } catch (err) {
    console.error("Error fetching cat fact:", err?.message || err);
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
import path from "path";

const PORT = process.env.PORT || 3000;
export default app;

if (process.argv[1] && path.basename(process.argv[1]) === "server.js") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
