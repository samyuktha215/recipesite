function RatingPopup ( { recipeTitle, rating, onConfirm, onCancel }) {
    return (
        <div className="popup-overlay">
            <div className="popup-content" role="dialog" aria-modal="true">
                <p>Vill du ge "{recipeTitle}" betyget {rating}?</p>
                <div className="popup-buttons">
                    <button
                    onClick={onConfirm}
                    autoFocus>
                        Ja
                    </button>
                    <button onClick={onCancel}>Nej</button>
                </div>
            </div>
        </div>
    );
}