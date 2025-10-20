import express from "express";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const isPreview = process.env.NODE_ENV !== 'production';

const checkJwt = isPreview ? (req,res,next) => next() : jwt({
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

app.get("/protected", checkJwt, (req, res) => {
  res.json({
    message: "Access granted to protected route!",
    user: isPreview ? { name: "Preview User", email: "preview@example.com" } : req.auth,
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to RecipeHub API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
