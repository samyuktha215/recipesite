import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeCard } from "./RecipeCard"; // Component for displaying a recipe card
import "./RecipesPage.css"; // Page styling

export default function RecipesPage() {
  // State to store fetched recipes
  const [recipes, setRecipes] = useState([]);
  // Loading indicator while fetching
  const [loading, setLoading] = useState(true);
  // Navigation hook for redirecting
  const navigate = useNavigate();

  // Fetch recipes on component mount
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

  // Show loading state while fetching data
  if (loading) return <p className="loading">Laddar recept...</p>;

  return (
    <div className="recipes-page">
      {/* Page heading */}
      <h1 className="recipes-title">Look for your favourite Drink</h1>

      {/* Grid with all recipe cards */}
      <div className="grid-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => {
            // Shape the recipe data to fit RecipeCard props
            const adaptedDrink = {
              image: recipe.imageUrl || "/default-image.jpg",
              name: recipe.title,
              rating: recipe.avgRating || 0,
              category: recipe.categories?.[0] || "Okänd",
              difficulty: recipe.difficulty || "Medel",
              timeInMins: recipe.timeInMins || 0,
              _id: recipe._id,
            };

            // Clickable wrapper around each card
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
          // Fallback if no recipes exist
          <p className="no-results">Inga recept hittades.</p>
        )}
      </div>
    </div>
  );
}
