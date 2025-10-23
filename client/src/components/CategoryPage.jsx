import React, { useEffect, useState } from "react";
import nav from "./nav.jsx";
import bannerImage from "../assets/Background.png";
import "./CategoryPage.css";
import { RecipeCard } from "./recipes/RecipeCard.jsx";
import "../styles/global.css";

// Define all category options that users can click
const categories = [
  { key: "Varma Drinkar", label: "VARMA" },
  { key: "Alkoholfria Drinkar", label: "ALKOHOLFRIA" },
  { key: "Veganska Drinkar", label: "VEGANSKA" },
  { key: "Klassiska Drinkar", label: "KLASSISKA" },
];

function CategoryPage() {
  const [activeCategory, setActiveCategory] = useState("Klassiska Drinkar");    // State variable for the currently selected category (default = "Klassiska Drinkar")
  const [drinks, setDrinks] = useState([]); // Holds all drinks fetched from the API
  const [loading, setLoading] = useState(false); // Loading state while fetching data

  // useEffect runs once when the component mounts
  // It fetches all drinks from the API
  useEffect(() => {
    fetchDrinks();
  }, []);

    // Function to fetch drinks from the API
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

  // Filter drinks by category
  const filteredDrinks = drinks.filter((recipe) => {
    if (!activeCategory) return true;
    // normalize category text for comparison
    return recipe.categories?.some(
      (cat) => cat.toLowerCase() === activeCategory.toLowerCase()
    );
  });

  return (
    <>
      <div className="home">
        {/* Header and banner */}
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

      <div className="category-page">
        {/* Category buttons */}
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)} 
            className={`category-button ${
              activeCategory === category.key ? "active" : ""
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="drinks_list">
        {/* Drinks Results */}
        {loading ? (
          <p className="no_results">Laddar recept...</p>
        ) : (
          <div className="grid-container">
            {filteredDrinks.length > 0 ? (
              filteredDrinks.map((recipe) => {
                const adaptedDrink = {
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
              <p className="no-results">Inga recept hittades.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CategoryPage;
