import React, { useEffect, useState } from "react";
import bannerImage from "../assets/Background.png";
import "./CategoryPage.css";
import { RecipeCard } from "./recipes/RecipeCard.jsx";
import "../styles/global.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const categories = [
  { key: "", label: "ALLA" }, // show all when key is empty
  { key: "Varma Drinkar", label: "VARMA" },
  { key: "Alkoholfria Drinkar", label: "ALKOHOLFRIA" },
  { key: "Veganska Drinkar", label: "VEGANSKA" },
  { key: "Klassiska Drinkar", label: "KLASSISKA" },
];

function CategoryPage() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState(""); // empty = Alla
  const [drinks, setDrinks] = useState([]); // Holds all drinks fetched from the API
  const [loading, setLoading] = useState(false); // Loading state while fetching data

  // Normalize helper: lowercase, remove diacritics and non-alphanumerics
  const normalize = (str) =>
    String(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]/g, "");

  // Read category from URL param on mount / when URL changes
  useEffect(() => {
    const urlCat = params.category ? decodeURIComponent(params.category) : "";
    if (!urlCat) {
      setActiveCategory("");
      return;
    }
    const matched = categories.find((c) => c.key && normalize(c.key) === normalize(urlCat));
    setActiveCategory(matched ? matched.key : decodeURIComponent(urlCat));
  }, [params.category, location.pathname]);

  // fetch drinks once
  useEffect(() => {
    fetchDrinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setDrinks([]);
    } finally {
      setLoading(false);
    }
  }

  // Filter drinks by category (empty activeCategory => show all)
  const filteredDrinks = drinks.filter((recipe) => {
    if (!activeCategory) return true; // Alla
    return recipe.categories?.some((cat) => normalize(cat) === normalize(activeCategory));
  });

  // Navigate and update URL when selecting a category
  const selectCategory = (categoryKey) => {
    setActiveCategory(categoryKey);
    if (!categoryKey) {
      // ALLA -> go to the base /categories route (no param)
      navigate("/categories", { replace: false });
      return;
    }
    const encoded = encodeURIComponent(categoryKey);
    navigate(`/categories/${encoded}`, { replace: false });
  };

  return (
    <>
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

      <div className="category-page">
        {categories.map((category) => (
          <button
            key={category.key || "alla"}
            onClick={() => selectCategory(category.key)}
            className={`category-button ${ (activeCategory || "") === (category.key || "") ? "active" : "" }`}
          >
            {category.label}
          </button>
        ))}
      </div>

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