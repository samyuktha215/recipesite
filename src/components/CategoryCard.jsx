import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CategoryCard() {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://grupp1-mqzle.reky.se/recipes")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((recipe) =>
          recipe.categories.includes(categoryName)
        );
        setRecipes(filtered);
      });
  }, [categoryName]);

  return (
    <div className="recipe-category-container">
      <h1 className="recipe-category-title">
        Recipes in "{categoryName}"
      </h1>
      <div className="recipe-card">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe">
            <h2 className="recipe-title">{recipe.title}</h2>
            <p className="recipe-description">{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryCard;