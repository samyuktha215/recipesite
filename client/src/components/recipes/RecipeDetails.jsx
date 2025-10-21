// React and router hooks for params, navigation, and location
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addRating } from "../recipes/ratings";

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

  const [userRating, setUserRating] = useState(0);
  const [message, setMessage] = useState("");

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


  // Rating function
  const handleStarClick = async (index) => {
    const chosenRating = index + 1;
    setUserRating(chosenRating);
    setMessage("Sparar betyg...");

    try {
      const result = await addRating(recipe._id, chosenRating);
      console.log("Omdömde sparat:", result);
      setMessage("Tack för ditt betyg!")
    } catch(err) {
      console.error(err);
      setMessage("Kunde inte spara ditt betyg!😢")
    }
  }


  // Render the recipe details page
  return (
    <div className="recipe-details">
      {/* Global back button component */}
      <BackButton />

      {/* Page title */}
      <h1 className="recipe-details-title">{recipe.title}</h1>

      {/* Main layout container */}
      <div className="recipe-details-container">

        <div className="image-container">
          {/* Recipe image */}
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="recipe-details-card-image"
          />

          {/* Rating */}
          <h2>Ge ditt betyg:</h2>
          <div className="recipe-card-rating">
            {[...Array(5)].map((_, index) => (
              <span
              key={index}
              className={index < userRating ? "star filled" : "star"}
              onClick={() => handleStarClick(index)}
              >⭐</span>
            ))}
          </div>
        </div>

        {/* Recipe text content */}
        <div className="recipe-details-info">
          <p>{recipe.descrption}</p>
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
