import React from 'react';  
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';
import Sidebar from '../pages/sidebar.jsx';
function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

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
           
          <Sidebar
        onSearch={(value) => setSearchTerm(value)}
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <div>
        <p>Search Term: {searchTerm}</p>
        <p>Selected Category: {selectedCategory}</p>
      </div>
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