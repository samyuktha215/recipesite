import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeCard } from "./recipes/RecipeCard";
import bannerImage from "../assets/Background.png";
import Sidebar from "../pages/sidebar.jsx";
import "./home.css";
import "../styles/global.css";

const Home = () => {
  const [drinks, setDrinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      fetch("https://grupp1-mqzle.reky.se/recipes")
        .then(res => {
          if (!res.ok) throw new Error("Nätverksfel vid hämtning av recept");
          return res.json();
        })
        .then(data => {
          setDrinks(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching drinks:", err);
          setError("Kunde inte hämta recept. Kontrollera din internetanslutning.");
          setLoading(false);
        });
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

      const cleanQuery = searchQuery
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .slice(0, 50) // max 50 tecken
        .trim();

      if (!cleanQuery) {
        alert("Skriv något att söka efter.");
        return;
      }

      const match = drinks.find((d) =>
        d.title.toLowerCase().includes(cleanQuery.toLowerCase())
      );

      if (match) {
        navigate(`/recipes/${match._id}`, { state: { recipe: match } });
      } else {
        alert("Inget recept hittades med det namnet.");
      }
    };


  return (
    <div className="home">
      {/* Banner */}
      <div className="top_banner">
        <div className="content">
          <h3>Drink IT</h3>
          <h2>Uppfriskande Recept och Inspiration</h2>
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
              placeholder="Sök efter ett recept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              maxLength={50}
            />
            <button type="submit">🔍</button>
          </form>

          <Sidebar onSelectCategory={setSelectedCategory} />
        </div>

        {/* Grid Container */}

        <div className="grid-container">
          {loading && <p>Laddar recept...</p>}
          {error && <p className="error">{error}</p>}
          
          {!loading && !error && filteredDrinks.length > 0 ? (
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
          ) : null}

          {!loading && !error && filteredDrinks.length === 0 && (
            <p className="no-results">Inga recept hittades.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;
