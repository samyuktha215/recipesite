import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./RecipeDetails.css";

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(location.state?.recipe || null);

  // Optional: fetch by ID if state is not available
  useEffect(() => {
    if (!recipe) {
      fetch(`https://grupp1-mqzle.reky.se/recipes/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Recipe not found");
          return res.json();
        })
        .then((data) => setRecipe(data))
        .catch((err) => setRecipe("notfound"));
    }
  }, [id, recipe]);

  if (!recipe) return <p className="loading">Laddar recept...</p>;
  if (recipe === "notfound") return <p className="loading">Recept hittades inte 😢</p>;

  return (
    <div className="recipe-details">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Tillbaka till alla recept
      </button>

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
