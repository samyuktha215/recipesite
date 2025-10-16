import React from "react";
import PropTypes from "prop-types";


const Sidebar = ({ onSelectCategory }) => {
  const categories = [
    "Klassiska Drinkar",
    "Varma Drinkar",
    "Alkoholfria Drinkar",
    "Veganska Drinkar",
    "All"
  ];
   const handleCategoryClick = (cat) => {
    if (cat === "All") {
      onSelectCategory(""); // clear selection to show all
    } else {
      onSelectCategory(cat);
    }
  };

  return (
    <aside>
      <h3>Categories</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat} onClick={() => handleCategoryClick(cat)}>
            {cat}
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
