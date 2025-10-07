import React, { useEffect, useState } from "react";
import "./home.css";
import { RecipeCard } from "./recipes/RecipeCard";
import Sidebar from "../pages/sidebar.jsx";
import bannerImage from "../assets/background.jpg";

const Home = () => {
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch recipes
  useEffect(() => {
    fetch("https://grupp1-mqzle.reky.se/recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log("API data:", data);
        setDrinks(data);
      })
      .catch((err) => console.error("Fel vid hämtning:", err));
  }, []);

  // Filter drinks based on search + selected category
   const filteredDrinks = drinks.filter((drink) => {
    const title = drink.title?.toLowerCase() || "";

    const matchesSearch = searchTerm
      ? title.includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory = selectedCategory
      ? drink.categories?.some(
          (cat) =>
            cat.toLowerCase() === selectedCategory.toLowerCase() ||
            cat.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home">
      {/* Banner */}
      <div className="top_banner">
        <div className="content">
          <h3>Fresh & Delicious</h3>
          <h2>Homemade Recipes</h2>
        </div>
        <div className="banner-image">
          <img src={bannerImage} alt="banner" />
        </div>
      </div>

      {/* Sidebar + Recipes */}
      <div className="main-layout">
        <Sidebar
          onSearch={setSearchTerm}
          onSelectCategory={setSelectedCategory}
        />

        <div className="grid-container">
          {filteredDrinks.length > 0 ? (
            filteredDrinks.map((recipe) => {
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
            })
          ) : (
            <p className="no-results">Inga recept hittades.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
