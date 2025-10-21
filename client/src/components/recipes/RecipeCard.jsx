// Imports React, hooks, routing, and styles
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

export function RecipeCard({ drink }) {


  // Räkna ingredienser
  const ingredientCount =  drink.ingredientCount ?? 0;


  // State för betyg och favorit
  const [isFavorite, setIsFavorite] = useState(drink.isFavorite || false);

  const rating = Math.floor(drink.rating); // avrunda nedåt
  const votes = drink.votes || 0; // antal som röstat

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

        {/* Show rating as stars + total votes */}
       <div className="recipe-card-rating">
        {[...Array(5)].map((_, index) => (
          <span key={index}>{index < rating ? "★" : "☆"}</span>
        ))}
        {votes > 0 && <span> ({votes})</span>}
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
