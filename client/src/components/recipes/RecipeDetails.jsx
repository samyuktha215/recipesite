import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./RecipeDetails.css";
import BackButton from "../BackButton";

export default function RecipeDetailsPage() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(location.state?.recipe || null);


useEffect(() => {
  fetch("https://grupp1-mqzle.reky.se/recipes")
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
      setRecipe(match || "notfound");
    })
    .catch((err) => setRecipe("notfound"));
}, [slug]);


  if (!recipe) return <p className="loading">Laddar recept...</p>;
  if (recipe === "notfound") return <p className="loading">Recept hittades inte 😢</p>;

  return (
    <div className="recipe-details">
      <BackButton/>

      <h1 className="recipe-details-title">Drinkrecept: {recipe.title}</h1>

      <div className="recipe-details-container">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="recipe-details-card-image"
        />

        <div className="recipe-details-info">
          <h2>Ingredienser:</h2>
          <ul>
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>
                {ing.amount} {ing.unit} {ing.name}
              </li>
            ))}
          </ul>

          <h2>Instruktioner:</h2>
          <ol>
            {recipe.instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>

          <p>Tid: {recipe.timeInMins} min</p>
          <p>Svårighetsgrad: {recipe.difficulty}</p>
        </div>
      </div>
    </div>
  );
}
