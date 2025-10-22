import React, { useState } from "react";
import PropTypes from "prop-types";

const Sidebar = ({ onSelectCategory }) => {
<<<<<<< HEAD

  const [selectedCategory, setSelectedCategory] = useState("Alla");
=======
  const [selectedCategory, setSelectedCategory] = useState("All");
>>>>>>> b96d4c2 (fixed chenges before merge)


  const categories = [
    "Klassiska Drinkar",
    "Varma Drinkar",
    "Alkoholfria Drinkar",
    "Veganska Drinkar",
    "Alla"
  ];

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
<<<<<<< HEAD

    onSelectCategory(cat === "Alla" ? "" : cat);
  }
=======
    onSelectCategory(cat === "All" ? "" : cat);
  };
>>>>>>> b96d4c2 (fixed chenges before merge)


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
