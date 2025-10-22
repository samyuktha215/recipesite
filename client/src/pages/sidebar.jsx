import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = ({ onSelectCategory }) => {

  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const location = useLocation();

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
    "Alla"
  ];

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);

    onSelectCategory(cat === "Alla" ? "" : cat);
  }


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
