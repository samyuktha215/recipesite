import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../pages/sidebar";
 
export default function RecipeDetailsPage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
 
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
        setRecipe(match);
      })
      .catch((err) => console.error("Fel vid hämtning:", err));
  }, [slug]);
 
  if (!recipe) return <p className="loading">Laddar recept...</p>;
 
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
        {recipe.ingredients.map((ing, index) => (
          <li key={index}>
            {ing.amount} {ing.unit} {ing.name}
          </li>
        ))}
      </ul>
 
      <h2>Instruktioner:</h2>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
 
      <p>Tid: {recipe.timeInMins} min</p>
      <p>Svårighetsgrad: {recipe.difficulty}</p>
    </div>
  </div>
</div>
 
  );
}