import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

// Sidebar component to display categories
// categoryCounts is an optional prop to show the number of recipes per category
const Sidebar = ({ onSelectCategory, categoryCounts = {} }) => {
  const [selectedCategory, setSelectedCategory] = useState("Alla"); // State for currently selected category
  const location = useLocation(); // Current URL path
  const navigate = useNavigate(); // Hook to navigate programmatically



  // Fixed list of categories
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

  const urlParam = cat === "Alla" ? "Alla" : encodeURIComponent(cat);
  navigate(`/category/${urlParam}`);
};



  return (
    <aside>
      <h3>Kategorier</h3>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            tabIndex="0" // Make li focusable
            className={selectedCategory === category ? "active" : ""}
            onClick={() => handleCategoryClick(category)}
            onKeyDown={(e) => {
              // Support keyboard: Enter or Space triggers click
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCategoryClick(category);
              }
            }}
          >
            {category}{" "}
            {category !== "Alla" && categoryCounts[category]
              ? `(${categoryCounts[category]})` // Show count if available
              : ""}
          </li>
        ))}
      </ul>
    </aside>
  );
};

// Prop validation
Sidebar.propTypes = {
  onSelectCategory: PropTypes.func, // Callback when category changes
  categoryCounts: PropTypes.object, // Optional object for recipe counts per category
};

export default Sidebar;
