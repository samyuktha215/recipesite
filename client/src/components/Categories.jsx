
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';
import BackButton from './BackButton';
import "../styles/global.css";

function Categories() {
  
    const [categories, setCategories] = useState([]);

    //fetch api and get all unique categories
useEffect(() => {
  fetch("https://grupp1-mqzle.reky.se/recipes")
        .then((res) => res.json())
        .then((data) => {
      
        const allCategories = data.flatMap((recipe) => recipe.categories);

        const uniqueCategories = [...new Set(allCategories)];

        setCategories(uniqueCategories);
        })
        .catch((err) => console.error("Error fetching recipes:", err));
    }, []);

    return (
        //render the unique categories as links to category page
        <div className="categories">
           <BackButton/>
            {categories.map((category, index) => (
                <Link key={index} to={`/category/${encodeURIComponent(category)}`} className="category-item"> 
                    <span className="bullet">•</span>
                    <h2 className="category-name">{category}</h2>
                </Link>
            ))}
        </div>
    );
}

    

export default Categories;