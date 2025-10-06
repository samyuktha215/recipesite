import React from 'react'
import './home.css'
import Categories from './Categories.jsx'
import {Link} from 'react-router-dom'

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
    </div>
            

  );
}

export default Home
