import React, { useState } from "react";
import PropTypes from "prop-types";
const Sidebar = ({ onSearch, onSelectCategory }) => {
  const [search, setSearch] = useState("");
  const categories = ["Klassika", "Fruktiga", "Mousserande", "Alkoholfri", "Söta"];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <aside>
      <div>
        <h3>Sökfält</h3>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Sök drink..."
        />
      </div>

      <div>
        <h3>Kategorier</h3>
        <ul>
          {categories.map((cat) => (
            <li key={cat} onClick={() => onSelectCategory && onSelectCategory(cat)}>
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
Sidebar.propTypes = {
  onSearch: PropTypes.func,
  onSelectCategory: PropTypes.func,
};
export default Sidebar;
