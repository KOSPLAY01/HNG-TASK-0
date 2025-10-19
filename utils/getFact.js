// utils/getFact.js
export async function getRandomFact() {
  const fallbackFact = "Cats love naps — sometimes up to 16 hours a day!";

  try {
    const response = await fetch("https://catfact.ninja/fact");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return typeof data?.fact === "string" ? data.fact : fallbackFact;
  } catch (error) {
    console.error("Error fetching cat fact:", error);
    return fallbackFact;
  }
}
