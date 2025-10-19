// utils/getFact.js
export async function getRandomFact() {
  try {
    const { default: axios } = await import("axios"); // ✅ dynamic import
    const { data } = await axios.get("https://catfact.ninja/fact");
    return data.fact;
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);
    return "Cats love naps — sometimes up to 16 hours a day!";
  }
}
