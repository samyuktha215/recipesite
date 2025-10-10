import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecipesPage.css";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://grupp1-mqzle.reky.se/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Fel vid hämtning:", err));
  }, []);

  return (
    <div className="recipes-page">
      <h1 className="recipes-title">Alla Recept</h1>
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card-list">
            <h2>
              <Link to={`/recipes/${recipe._id}`} className="recipe-list-link">
                {recipe.title}
              </Link>
            </h2>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
