// backend/routes/comments.js
import express from "express";
import axios from "axios";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

const router = express.Router();
const MAX_COMMENT_LENGTH = 500;

// JWT-verifiering (för produktion)
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-7whr3yiydc13aogp.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://recipes-api",
  issuer: "https://dev-7whr3yiydc13aogp.eu.auth0.com/",
  algorithms: ["RS256"],
});

// Kontrollera om vi kör i utveckling
const isDev = process.env.NODE_ENV !== "production";

// --- Hämta kommentarer ---
router.get("/:id/comments", isDev ? async (req, res, next) => next() : checkJwt, async (req, res) => {
  try {
    const response = await axios.get(
      `https://grupp1-mqzle.reky.se/recipes/${req.params.id}/comments`
    );
    res.json(response.data);
  } catch (err) {
    console.error("Fel vid hämtning av kommentarer:", err);
    res.status(500).json({ message: "Kunde inte hämta kommentarer" });
  }
});

// --- Skicka kommentar ---
router.post("/:id/comments", isDev ? async (req, res, next) => next() : checkJwt, async (req, res) => {
  try {
    const { name, comment } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ message: "Namn och kommentar krävs." });
    }

    if (comment.length > MAX_COMMENT_LENGTH) {
      return res.status(400).json({ message: `Kommentaren får max vara ${MAX_COMMENT_LENGTH} tecken.` });
    }

    // Sanera input – tar bort script/HTML men behåller text
    const safeComment = comment
  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "[skyddad text]")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

    // Skicka vidare till Reky API
    const response = await axios.post(
      `https://grupp1-mqzle.reky.se/recipes/${req.params.id}/comments`,
      { name, comment: safeComment }
    );

    res.status(201).json(response.data);
  } catch (err) {
    console.error("Fel vid sparande av kommentar:", err);
    res.status(500).json({ message: "Kunde inte spara kommentaren" });
  }
});

export default router;
