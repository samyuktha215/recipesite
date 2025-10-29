import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import DOMPurify from "dompurify";
import "./recipecomment.css";

const MAX_COMMENT_LENGTH = 500;

const RecipeComments = ({ recipeId }) => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // --- Hämta kommentarer ---
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
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await axios.get(
        `${API_URL}/recipes/${recipeId}/comments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );


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

  // --- Skicka kommentar ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      setError("Fyll i både namn och kommentar.");
      return;
    }
    if (comment.length > MAX_COMMENT_LENGTH) {
      setError(`Kommentaren är för lång (max ${MAX_COMMENT_LENGTH} tecken).`);
      return;
    }

    setLoadingSubmit(true);
    setError(null);

    try {
      const token = await getAccessTokenSilently();
      const safeComment = DOMPurify.sanitize(comment);

       const API_URL = import.meta.env.VITE_API_URL;

      await axios.post(
        `${API_URL}/recipes/${recipeId}/comments`,
        { name, comment: safeComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );


      setSuccess(true);
      setName("");
      setComment("");
      fetchComments();
    } catch (err) {
      console.error("Fel vid skickning av kommentar:", err);
      setError("Kunde inte skicka kommentaren.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // --- Auto-hide success message ---
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
