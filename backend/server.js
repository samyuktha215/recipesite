import express from "express";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Allow CORS for local + Netlify main + preview deploys
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://recipeproject216.netlify.app",
      /\.netlify\.app$/, // wildcard for all Netlify preview URLs
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

// ✅ Auth0 JWT verification
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

// ✅ Public route
app.get("/", (req, res) => {
  res.send("✅ RecipeHub API is live!");
});

// ✅ Protected route (requires Auth0 token)
app.get("/protected", checkJwt, (req, res) => {
  res.json({
    message: "Access granted to protected route 🎉",
    user: req.auth,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
