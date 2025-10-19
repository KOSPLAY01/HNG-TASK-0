import axios from "axios";

export const getRandomFact = async () => {
  try {
    const { data } = await axios.get("https://catfact.ninja/fact");
    return data.fact;
  } catch {
    return "Cats sleep for 70% of their lives — no kidding!";
  }
};
