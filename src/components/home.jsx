 

import React, { useEffect, useState } from 'react';
import './home.css';
import { RecipeCard } from './recipes/RecipeCard';
import {Link} from 'react-router-dom';




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
            <div className='top_banner'>
                <div className='contant'>
                    <h3>Delicious Recipes</h3>
                    <h2>Order and Enjoy</h2>
                    <p>Explore new flavours every day</p>
                    <Link to="/recipes" className='link'>See more recipes</Link>
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
