import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const Sidebar = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const location = useLocation();

  // Återställ kategori till "Alla" när man går till startsidan
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedCategory("Alla");
      onSelectCategory("");
    }
  }, [location, onSelectCategory]);

  const categories = [
    "Klassiska Drinkar",
    "Varma Drinkar",
    "Alkoholfria Drinkar",
    "Veganska Drinkar",
    "Alla",
  ];

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    onSelectCategory(cat === "Alla" ? "" : cat);
  };

  return (
    <aside>
      <h3>Kategorier</h3>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            tabIndex="0" // 🔹 Gör tabb-bar
            className={selectedCategory === category ? "active" : ""}
            onClick={() => handleCategoryClick(category)}
            onKeyDown={(e) => {
              // 🔹 Tangentbordsstöd: Enter & Mellanslag
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCategoryClick(category);
              }
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

Sidebar.propTypes = {
  onSelectCategory: PropTypes.func,
};

export default Sidebar;
