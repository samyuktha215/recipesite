// React and router hooks for params, navigation, and location
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Component styles and shared components
import "./RecipeDetails.css";
import BackButton from "../BackButton";
import Sidebar from "../../pages/sidebar";

export default function RecipeDetailsPage() {
const { id } = useParams();

  // Access navigation and any passed state from previous page
  const location = useLocation();
  const navigate = useNavigate();

  // Store the selected recipe (from navigation or to be fetched)
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


  // Render the recipe details page
  return (
    <div className="recipe-details">
      {/* Global back button component */}
      <BackButton />

      {/* Page title */}
      <h1 className="recipe-details-title">Drinkrecept: {recipe.title}</h1>

      {/* Main layout container */}
      <div className="recipe-details-container">
        
        {/* Recipe image */}
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="recipe-details-card-image"
        />

        {/* Recipe text content */}
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

        {/* Sidebar placed to the right */}
        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
