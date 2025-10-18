// Imports React, hooks, routing, and styles
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

export function RecipeCard({ drink }) {


  // Räkna ingredienser
  const ingredientCount = Array.isArray(drink.ingredients) ? drink.ingredients.length : 0;


  // State för betyg och favorit
  const [rating, setRating] = useState(drink.rating || 0);
  const [isFavorite, setIsFavorite] = useState(drink.isFavorite || false);

  // Updates the rating when a star is clicked
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    // Card container
    <div className="recipe-card">
      <div className="recipe-card-body">
        
        
        {/* Header with image and title link */}
        <div className="recipe-card-header">
          <img
            src={drink.image}
            alt={drink.name}
            className="recipe-card-image"
          />
          <h1 className="recipe-card-title">
        <Link to={`/recipes/${drink._id}`} className="recipe-link">
          {drink.name}
        </Link>

          </h1>
        </div>
        

        {/* Interactive star rating */}
        <div className="recipe-card-rating">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => handleStarClick(index)}
            >
              {index < rating ? "★" : "☆"}
            </span>
          ))}
        </div>

        {/* Drink meta info */}
        <p className="recipe-card-category">Kategori: {drink.category}</p>
        <p className="recipe-card-difficulty">Svårighetsgrad: {drink.difficulty}</p>
        <p className="recipe-card-time">Tid: {drink.timeInMins} min</p>
        <p className="recipe-card-ingredients">Antal ingredienser: {ingredientCount}</p>

        {/* Favorite toggle button */}
        <button
          className="recipe-card-favorite"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <span className="heart">{isFavorite ? "❤️" : "🤍"}</span>
          <span className="label">Favorit</span>
        </button>

        {/* Comments link/info */}
        <p className="recipe-card-comments">
          Läs kommentarer ({drink.commentsCount})
        </p>
      </div>
    </div>
  );
}
