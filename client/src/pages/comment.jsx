import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./recipecomment.css";

const RecipeComments = ({ recipeId }) => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  // State
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // Fetch comments
  const fetchComments = async () => {
    if (!recipeId) return;
    setLoadingComments(true);
    setError(null);
    try {
      if (!isAuthenticated) {
        setError("Du måste vara inloggad för att se kommentarer.");
        setLoadingComments(false);
        return;
      }
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        `https://grupp1-mqzle.reky.se/recipes/${recipeId}/comments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Filter valid comments and sort newest first
      const validComments = response.data
        .filter(c => c.comment && c.name)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setComments(validComments);
    } catch (err) {
      console.error("Fel vid hämtning av kommentarer:", err);
      setError("Kunde inte hämta kommentarer.");
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [recipeId, isAuthenticated, getAccessTokenSilently]);

  // Submit new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setError("Fyll i både namn och kommentar.");
      return;
    }
    setLoadingSubmit(true);
    setError(null);
    try {
      const token = await getAccessTokenSilently();
      await axios.post(
        `https://grupp1-mqzle.reky.se/recipes/${recipeId}/comments`,
        { name, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(true);
      setName("");
      setComment("");
      fetchComments(); // refresh comment list

    } catch (err) {
      console.error("Fel vid skickning av kommentar:", err);
      setError("Kunde inte skicka kommentaren.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleString("sv-SE", { dateStyle: "medium", timeStyle: "short" });
  };

  // --- Rendering ---
  if (!isAuthenticated) {
    return (
      <div className="recipe-comments">
        <h3>Logga in för att se och skriva kommentarer</h3>
        <button onClick={() => loginWithRedirect()}>Logga in</button>
      </div>
    );
  }

  return (
    <div className="recipe-comments">
      {/* Comment Form */}
      <h2>Lämna en kommentar</h2>
      {success && <p className="comment-success">Tack för din kommentar!</p>}
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Ditt namn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loadingSubmit}
        />
        <textarea
          placeholder="Skriv din kommentar"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loadingSubmit}
        />
        {error && <p className="comment-error">{error}</p>}
        <button type="submit" disabled={loadingSubmit}>
          {loadingSubmit ? "Skickar..." : "Skicka kommentar"}
        </button>
      </form>

      {/* Comments List */}
      <h2>Kommentarer</h2>
      {loadingComments && <p>Laddar kommentarer...</p>}
      {!loadingComments && comments.length === 0 && <p>Inga kommentarer ännu.</p>}
      <ul className="comments-list">
        {comments.map(c => (
          <li key={c._id}>
            <p className="comment-author">{c.name} skrev:</p>
            <p>{c.comment}</p>
            {c.createdAt && <p className="comment-date"><em>{formatDate(c.createdAt)}</em></p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeComments;
