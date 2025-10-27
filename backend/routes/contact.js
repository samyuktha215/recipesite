// backend/routes/contact.js
import express from "express";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

const router = express.Router();

// JWT-verifiering med Auth0
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

// POST meddelande (kräver token)
router.post("/", checkJwt, async (req, res) => {
  try {
    const { Name, email, Subject, Message } = req.body;

    if (!Name || !email || !Subject || !Message) {
      return res.status(400).json({ message: "Alla fält måste fyllas i." });
    }

    // Sanera input
    const safeMessage = {
      Name: Name.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
      email: email.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
      Subject: Subject.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
      Message: Message.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    };

    // Skicka till Firebase
    const response = await fetch(
      "https://recipesite-ab146-default-rtdb.firebaseio.com/Message.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(safeMessage),
      }
    );

    const data = await response.json();
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kunde inte skicka meddelandet" });
  }
});

export default router;
