const BASE_URL = "https://grupp1-mqzle.reky.se";

export async function addRating(recipeId, rating) {
  const response = await fetch(`${BASE_URL}/recipes/${recipeId}/ratings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating }),
  });

  if (!response.ok) {
    throw new Error(`Kunde inte lägga till betyg: ${response.status}`);
  }

  return response.json();
}