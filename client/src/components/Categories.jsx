import React from 'react';  
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';
import BackButton from './BackButton';

function Categories() {
  
    const [categories, setCategories] = useState([]);

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