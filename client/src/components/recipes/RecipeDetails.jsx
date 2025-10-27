import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { addRating } from "../recipes/ratings";
import { useAuth0 } from "@auth0/auth0-react";


// Component styles and shared components
import "./RecipeDetails.css";
import BackButton from "../BackButton";
import Sidebar from "../../pages/sidebar";

import drinkImage from "../../assets/rating-img3.jpg";
import RecipeComments from "../../pages/comment";


export default function RecipeDetailsPage() {
  const { id } = useParams();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const location = useLocation();

  // Store recipe
  const [recipe, setRecipe] = useState(location.state?.recipe || null);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [message, setMessage] = useState("");
 
  // Fetch recipe if not passed from navigation
  useEffect(() => {
    if (!recipe) {
      fetch(`https://grupp1-mqzle.reky.se/recipes/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Recipe not found");
          return res.json();
        })
        .then((data) => setRecipe(data))
        .catch(() => setRecipe("notfound"));
    }
  }, [id, recipe]);

  if (!recipe) return <p className="loading">Laddar recept...</p>;
  if (recipe === "notfound") return <p className="loading">Recept hittades inte 😢</p>;

// Handle star click with confirmation
const handleStarClick = async (index) => {
  if (!isAuthenticated) {
    setMessage("Logga in för att ge betyg!");
    return;
  }

  const chosenRating = index + 1;

  // Bekräftelse-dialog
  const confirmMessage = `Vill du ge "${recipe.title}" betyget ${chosenRating}?`;
  const confirmed = window.confirm(confirmMessage);
  if (!confirmed) return; // Avbryt om användaren klickar "Avbryt"

  try {
    setUserRating(chosenRating);
    setMessage("Sparar betyg...");

    const token = await getAccessTokenSilently({ audience: "https://recipes-api" });
    await addRating(recipe._id, chosenRating, token);

    setMessage("Tack för ditt betyg!");
  } catch (err) {
    console.error(err);
    setMessage(err.message.includes("401") 
      ? "Du måste logga in för att ge betyg!" 
      : "Kunde inte spara ditt betyg!😢"
    );
  }
};


  return (
    <div className="recipe-details">
      <BackButton />
      <h1 className="recipe-details-title">{recipe.title}</h1>

      <div className="recipe-details-container">
        <div className="image-container">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="recipe-details-card-image"
          />

          <h2>Ge ditt betyg:</h2>
            <div className="recipe-card-rating">
            {[...Array(5)].map((_, index) => {
              const isFilled = hoverRating ? index < hoverRating : index < userRating;
              return (
                <img
                  key={index}
                  src={drinkImage}
                  className={isFilled ? "rating-img-filled" : "rating-img-empty"}
                  alt={`rating ${index + 1}`}
                  onClick={() => handleStarClick(index)}
                  onMouseEnter={() => setHoverRating(index + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleStarClick(index);
                    }
                  }}
                />
              );
            })}

            </div>
          <p>{message}</p>

        </div>

        <div className="recipe-details-info">
          <p>{recipe.description}</p>

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
          {recipe.difficulty && <p>Svårighetsgrad: {recipe.difficulty}</p>}
        </div>

        
      </div>
      <div className="comments-section">
         {/* Comments section (form + list) */}
      <RecipeComments recipeId={recipe._id} />
      </div>
    </div>
  );
}
