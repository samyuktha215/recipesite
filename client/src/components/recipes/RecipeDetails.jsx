import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";

export default function RecipeDetails() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("https://grupp1-mqzle.reky.se/api/recipes")
      .then((res) => res.json())
      .then((allRecipes) => {
        const match = allRecipes.find((r) => {
          const recipeSlug = r.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[åä]/g, "a")
            .replace(/ö/g, "o");
          return recipeSlug === slug;
        });
        setRecipe(match);
      })
      .catch((err) => console.error("Fel vid hämtning:", err));
  }, [slug]);

  if (!recipe) return <p className="loading">Laddar recept...</p>;

  return (
    <div className="recipe-details">
      <h1 className="recipe-details-title">{recipe.title}</h1>
    </div>
  );
}
