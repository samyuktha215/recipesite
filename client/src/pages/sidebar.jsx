import React, { useState } from "react";
import PropTypes from "prop-types";

const Sidebar = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "Klassiska Drinkar",
    "Varma Drinkar",
    "Alkoholfria Drinkar",
    "Veganska Drinkar",
    "All"
  ];

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    onSelectCategory(cat === "All" ? "" : cat);
  };

  return (
    <aside>
      <h3>Kategorier</h3>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => handleCategoryClick(category)}
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
