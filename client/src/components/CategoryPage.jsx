import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import bannerImage from "../assets/Background.png";
import { RecipeCard } from "./recipes/RecipeCard.jsx";
import "../styles/global.css";
import "./CategoryPage.css";

// Fixed category buttons with labels
const categories = [
  { key: "Varma Drinkar", label: "VARMA" },
  { key: "Alkoholfria Drinkar", label: "ALKOHOLFRIA" },
  { key: "Veganska Drinkar", label: "VEGANSKA" },
  { key: "Klassiska Drinkar", label: "KLASSISKA" },
];

function CategoryPage() {
  const location = useLocation(); // Get state passed via navigation (from sidebar)
  const params = useParams();     // Get category from URL if visiting /category/:categoryName
  const categoryFromSidebar = location.state?.selectedCategory;
  const categoryFromURL = params.categoryName
    ? decodeURIComponent(params.categoryName)
    : null;

  // Set active category: priority -> sidebar state, then URL, then default
  const [activeCategory, setActiveCategory] = useState(
    categoryFromSidebar || categoryFromURL || "Klassiska Drinkar"
  );

  const [drinks, setDrinks] = useState([]); // Stores all fetched recipes
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch all drinks on mount
  useEffect(() => {
    fetchDrinks();
  }, []);

  // Update activeCategory if sidebar selection or URL param changes
  useEffect(() => {
    setActiveCategory(categoryFromSidebar || categoryFromURL || "Klassiska Drinkar");
  }, [categoryFromSidebar, categoryFromURL]);

  // Fetch recipes from API
  async function fetchDrinks() {
    setLoading(true);
    try {
      const response = await fetch("https://grupp1-mqzle.reky.se/recipes");
      const data = await response.json();
      setDrinks(data);
    } catch (error) {
      console.error("Error fetching drinks:", error);
    } finally {
      setLoading(false);
    }
  }

  // Filter recipes based on selected category
  const filteredDrinks = drinks.filter((recipe) => {
    if (!activeCategory || activeCategory === "Alla") return true;
    return recipe.categories?.some(
      (cat) => cat.toLowerCase() === activeCategory.toLowerCase()
    );
  });

  return (
    <>
      {/* Banner section */}
      <div className="home">
        <div className="top_banner">
          <div className="content">
            <h3>Drink IT</h3>
            <h2>Uppfriskande Recept och Inspiration</h2>
          </div>
          <div className="banner-image">
            <img src={bannerImage} alt="banner" />
          </div>
        </div>
      </div>

      {/* Category buttons */}
      <div className="category-page">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)} // Update active category when clicked
            className={`category-button ${
              activeCategory === category.key ? "active" : ""
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Recipes grid */}
      <div className="drinks_list">
        {loading ? (
          <p className="no_results">Laddar recept...</p> // Loading text
        ) : (
          <div className="grid-container">
            {filteredDrinks.length > 0 ? (
              filteredDrinks.map((recipe) => {
                // Adapt API data to RecipeCard props
                const adaptedDrink = {
                  _id: recipe._id,
                  image: recipe.imageUrl,
                  name: recipe.title,
                  rating: recipe.avgRating || 0,
                  category: recipe.categories?.[0] || "Okänd",
                  difficulty: recipe.difficulty || "Medel",
                  timeInMins: recipe.timeInMins || 0,
                  isFavorite: false,
                  commentsCount: 0,
                  ingredientCount: recipe.ingredients
                    ? recipe.ingredients.length
                    : 0,
                };
                return <RecipeCard key={recipe._id} drink={adaptedDrink} />;
              })
            ) : (
              <p className="no-results">Inga recept hittades.</p> // No results text
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CategoryPage;
