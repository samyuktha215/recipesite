 

import React, { useEffect, useState } from 'react';
import './home.css';
import { RecipeCard } from './recipes/RecipeCard';
import bannerImage from '../assets/background.jpg';

const Home = () => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetch("https://grupp1-mqzle.reky.se/recipes")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setDrinks(data);
    })
    .catch((err) => console.error("Fel vid hämtning:", err));
  }, []);

  return (
    <div className='home'>
            <div className="top_banner">
    <div className="content">
      <h3>Fresh & Delicious</h3>
      <h2>Homemade Recipes</h2>
      <p>
        Explore a variety of dishes made with love. Your kitchen adventure starts here!
      </p>
      <a href="/recipes" className="link">Explore Now</a>
    </div>

    <div className="banner-image">
  <img src={bannerImage} alt="banner" />
</div>

  </div>
          <div className="grid-container">
            {drinks.map((recipe) => {
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

export default Home
