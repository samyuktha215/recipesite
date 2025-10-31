import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

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

  const API_URL = import.meta.env.VITE_API_URL;
  const isDev = import.meta.env.MODE === "development";

  // --- Hämta kommentarer ---
  const fetchComments = async () => {
    if (!recipeId) return;
    setLoadingComments(true);
    setError(null);

    try {
      let headers = {};
      let url = "";

      if (isDev) {
        url = `https://grupp1-mqzle.reky.se/recipes/${recipeId}/comments`;
      } else {
        url = `${API_URL}/recipes/${recipeId}/comments`;
        if (!isAuthenticated) {
          setError("Du måste vara inloggad för att se kommentarer.");
          setLoadingComments(false);
          return;
        }
        const token = await getAccessTokenSilently();
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.get(url, { headers });

      const validComments = response.data
        .filter((c) => c.comment && c.name)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setComments(validComments);
    } catch (err) {
      console.error("❌ Fel vid hämtning av kommentarer:", err);
      setError("Kunde inte hämta kommentarer.");
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [recipeId, isAuthenticated]);

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
      let headers = { "Content-Type": "application/json" };
      let url = "";

      if (isDev) {
        url = `https://grupp1-mqzle.reky.se/recipes/${recipeId}/comments`;
      } else {
        url = `${API_URL}/recipes/${recipeId}/comments`;
        const token = await getAccessTokenSilently();
        headers.Authorization = `Bearer ${token}`;
      }

      const safeComment = comment
  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "[skyddad text]")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");


      await axios.post(url, { name, comment: safeComment }, { headers });

      setSuccess(true);
      setName("");
      setComment("");
      fetchComments();
    } catch (err) {
      console.error("❌ Fel vid skickning av kommentar:", err);
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

  const formatDate = (isoString) =>
    isoString
      ? new Date(isoString).toLocaleString("sv-SE", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "";

  if (!isDev && !isAuthenticated) {
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
        {comments.map((c) => (
          <li key={c._id}>
            <p className="comment-author">{c.name} skrev:</p>
            {/* Renderar text säkert, script blockeras */}
            <p>{c.comment}</p>
            {c.createdAt && (
              <p className="comment-date">
                <em>{formatDate(c.createdAt)}</em>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeComments;
