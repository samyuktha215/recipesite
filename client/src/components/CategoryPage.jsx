import React, { useEffect, useState } from "react";
import bannerImage from "../assets/Background.png";
import { RecipeCard } from "./recipes/RecipeCard.jsx";

import "../components/CategoryPage.css";
import { useNavigate, useParams } from "react-router-dom";

// Category buttons with label
const categories = [
  { key: "Alla", label: "ALLA" }, // Virtual category for all recipes
  { key: "Varma Drinkar", label: "VARMA" },
  { key: "Alkoholfria Drinkar", label: "ALKOHOLFRIA" },
  { key: "Veganska Drinkar", label: "VEGANSKA" },
  { key: "Klassiska Drinkar", label: "KLASSISKA" },
];

function CategoryPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [activeCategory, setActiveCategory] = useState(""); // "" = Alla
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch drinks once
  useEffect(() => {
    fetchDrinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchDrinks() {
    setLoading(true);
    try {
      const response = await fetch("https://grupp1-mqzle.reky.se/recipes");
      const data = await response.json();
      setDrinks(data);
    } catch (error) {
      console.error("Error fetching drinks:", error);
      setDrinks([]);
    } finally {
      setLoading(false);
    }
  }

  // Update activeCategory based on URL param
    useEffect(() => {
      const urlCat = params.categoryName ? decodeURIComponent(params.categoryName) : "Alla";
      setActiveCategory(urlCat); // Alla = default
    }, [params.categoryName]);



    // Filter drinks by category
    const filteredDrinks = drinks.filter((recipe) => {
      if (activeCategory === "Alla") return true; // Alla = show all
      return recipe.categories?.some(
        (cat) => cat.toLowerCase() === activeCategory.toLowerCase()
      );
    });


  // Handle category button click
    const selectCategory = (categoryKey) => {
      setActiveCategory(categoryKey);
      navigate(`/category/${encodeURIComponent(categoryKey)}`);
    };


  return (
    <>
      {/* Banner */}
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
            onClick={() => selectCategory(category.key)}
            className={`category-button ${activeCategory === category.key ? "active" : ""}`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Recipes grid */}
      <div className="drinks_list">
        {loading ? (
          <p className="no_results">Laddar recept...</p>
        ) : (
          <div className="grid-container">
            {filteredDrinks.length > 0 ? (
              filteredDrinks.map((recipe) => {
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
                  ingredientCount: recipe.ingredients ? recipe.ingredients.length : 0,
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