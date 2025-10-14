import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeCard } from "./RecipeCard"; // adjust path if needed
import "./RecipesPage.css";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://grupp1-mqzle.reky.se/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(Array.isArray(data) ? data : data.recipes || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Laddar recept...</p>;

  return (
    <div className="recipes-page">
      <h1 className="recipes-title">Look for your favourite Drink</h1>

      <div className="grid-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => {
            const adaptedDrink = {
              image: recipe.imageUrl || "/default-image.jpg",
              name: recipe.title,
              rating: recipe.avgRating || 0,
              category: recipe.categories?.[0] || "Okänd",
              difficulty: recipe.difficulty || "Medel",
              timeInMins: recipe.timeInMins || 0,
              _id: recipe._id,
            };

            return (
              <div
                key={recipe._id}
                onClick={() => navigate(`/recipes/${recipe._id}`)}
                style={{ cursor: "pointer" }}
              >
                <RecipeCard drink={adaptedDrink} />
              </div>
            );
          })
        ) : (
          <p className="no-results">Inga recept hittades.</p>
        )}
      </div>
    </div>
  );
}
