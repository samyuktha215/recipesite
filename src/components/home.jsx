import React from 'react';
import './home.css';
import { drinks } from "../assets/drinks/drinks";
import { RecipeCard } from './recipes/RecipeCard';
import {Link} from 'react-router-dom';



const Home = () => {
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
              {drinks.map((drink) => (
                <RecipeCard key={drink.id} drink={drink}/>
              ))}
            </div>
            </div>

  )
}

export default Home
