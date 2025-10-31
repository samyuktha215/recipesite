// File: RatingPopup.jsx
import React, { useEffect, useRef } from "react";
import "./RatingPopup.css"; // vi gör lite grundläggande styling här

export default function RatingPopup({ recipeTitle, rating, onConfirm, onCancel }) {
  const confirmBtnRef = useRef(null);

  // När popupen öppnas, fokusera på confirm-knappen
  useEffect(() => {
    confirmBtnRef.current?.focus();
  }, []);

  // Hantera Escape för att stänga popup
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div 
      className="popup-overlay" 
      onKeyDown={handleKeyDown}
      tabIndex={-1} // gör div tabbbar
    >
      <div className="popup-content" role="dialog" aria-modal="true" aria-labelledby="popup-title">
        <h2 id="popup-title">Bekräfta betyg</h2>
        <p>Vill du ge <strong>{recipeTitle}</strong> betyget <strong>{rating}</strong>?</p>
        <div className="popup-buttons">
          <button ref={confirmBtnRef} onClick={onConfirm}>Ja</button>
          <button onClick={onCancel}>Avbryt</button>
        </div>
      </div>
    </div>
  );
}
