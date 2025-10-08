import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./RecipeCard.css";

export function RecipeCard({ drink }) {
  const slug = drink.name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o");

  // State för betyg och favorit
  const [rating, setRating] = useState(drink.rating || 0);
  const [isFavorite, setIsFavorite] = useState(drink.isFavorite || false);

  // Spara favorit i localStorage
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || {};
    if (isFavorite) {
      favs[slug] = true;
    } else {
      delete favs[slug];
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
  }, [isFavorite, slug]);

  // Klickbar stjärna
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="recipe-card">
      <div className="recipe-card-body">
        <div className="recipe-card-header">
          <img src={drink.image} alt={drink.name} className="recipe-card-image" />
          <h1 className="recipe-card-title">
            <Link to={`/recipes/${slug}`} className="recipe-link">{drink.name}</Link>
          </h1>
        </div>

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

        <p className="recipe-card-category">Kategori: {drink.category}</p>
        <p className="recipe-card-difficulty">Svårighetsgrad: {drink.difficulty}</p>
        <p className="recipe-card-time">Tid: {drink.timeInMins} min</p>

        <button
          className="recipe-card-favorite"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <span className="heart">{isFavorite ? "❤️" : "🤍"}</span>
          <span className="label">Favorit</span>
        </button>

        <p className="recipe-card-comments">Läs kommentarer ({drink.commentsCount})</p>
      </div>
    </div>
  );
}
