import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeCard } from "./recipes/RecipeCard";
import bannerImage from "../assets/background.png";
import Sidebar from "../pages/sidebar.jsx";
import "./home.css";

const Home = () => {
  const [drinks, setDrinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://grupp1-mqzle.reky.se/recipes")
      .then((res) => res.json())
      .then((data) => setDrinks(data))
      .catch((err) => console.error("Error fetching drinks:", err));
  }, []);

  // Filter drinks based on selected category
  const filteredDrinks = selectedCategory
    ? drinks.filter((drink) =>
        drink.categories?.some(
          (cat) =>
            cat.toLowerCase() === selectedCategory.toLowerCase() ||
            cat.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      )
    : drinks;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const match = drinks.find((d) =>
      d.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    if (match) {
      navigate(`/recipes/${match._id}`, { state: { recipe: match } });
    } 
    else {
      alert("No recipe found with that name.");
    }
  };

  return (
    <div className="home">
      {/* Banner */}
      <div className="top_banner">
        <div className="content">
          <h3>Drink IT</h3>
          <h2>Uppfriskande Recept and Inspiretion</h2>
        </div>


        <div className="banner-image">
          <img src={bannerImage} alt="banner" />
        </div>
      </div>

      {/* Main Layout: Grid + Sidebar */}
      <div className="main-layout">
          {/* Sidebar Section with Search on Top */}
        <div className="sidebar-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Search for a recipe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>

          <Sidebar onSelectCategory={setSelectedCategory} />
        </div>

        {/* Grid Container */}

        <div className="grid-container">
          {filteredDrinks.length > 0 ? (
            filteredDrinks.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                drink={{
                  image: recipe.imageUrl,
                  name: recipe.title,
                  rating: recipe.avgRating || 0,
                  category: recipe.categories?.[0] || "Okänd",
                  difficulty: recipe.difficulty || "Medel",
                  timeInMins: recipe.timeInMins || 0,
                  isFavorite: false,
                  commentsCount: 0,
                  _id: recipe._id,
                }}
              />
            ))
          ) : (
            <p className="no-results">Inga recept hittades.</p>
          )}
        </div>

     
      </div>
    </div>
  );
};

export default Home;
