const BASE_URL = "https://grupp1-mqzle.reky.se"; // backend-URL, inte localhost:3000

export async function addRating(recipeId, rating, token) {
  const response = await fetch(`${BASE_URL}/recipes/${recipeId}/ratings`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`, // skicka Auth0-token
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating }),
  });

  if (!response.ok) {
    throw new Error(`Kunde inte lägga till betyg: ${response.status}`);
  }

  // Om backend inte returnerar JSON, hoppa över response.json()
  try {
    return await response.json();
  } catch {
    return null; // returnerar null om det inte finns JSON
  }
}
