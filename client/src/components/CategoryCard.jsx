
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './home.css';
import { RecipeCard } from "./recipes/RecipeCard";
import BackButton from "./BackButton";

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
      <BackButton/>
      <h1 className="recipe-category-title">
        {categoryName}
      </h1>
      <div className="grid-container">
                  {recipes.map((recipe) => {
                    const adaptedDrink = {
                      image: recipe.imageUrl,
                      name: recipe.title,
                      rating: recipe.avgRating || 0,
                      category: recipe.categories?.[0] || "Okänd",
                      difficulty: recipe.difficulty || "Medel",
                      isFavorite: false,
                      commentsCount: 0,
                    };
      
                    return <RecipeCard key={recipe._id} drink={adaptedDrink} />;
                  })}
        </div>
    </div>
  );
}

export default CategoryCard;