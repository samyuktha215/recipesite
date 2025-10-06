import React from "react";
import "./RecipeCard.css";

/* Detta är vad som ska stå på en recipeCard */
export function RecipeCard( { drink }) {
    return (
        <div className="recipe-card">
            <div className="recipe-card-body">
                <div className="recipe-card-header">
                    <img src={drink.image} alt={drink.name} className="recipe-card-image"/>
                    <h1 className="recipe-card-title">{drink.name}</h1>
                </div>
                <div className="recipe-card-rating">
                    {"★".repeat(drink.rating)}{"☆".repeat(5 - drink.rating)}
                </div>
                <p className="recipe-card-category">Kategori: {drink.category}</p>
                <p className="recipe-card-difficulty">Svårighetsgrad: {drink.difficulty}</p>
                <button className="recipe-card-favorite">
                    <span className="heart">{drink.isFavorite ? "❤️" : "🤍"}</span>
                    <span className="label">Favorit</span>
                </button>
                <p className="recipe-card-comments">Läs kommentarer ({drink.commentsCount})</p>
                </div>
        </div>
    );
}