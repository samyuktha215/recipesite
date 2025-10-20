import express from "express";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";


const app = express();
app.use(cors());
app.use(express.json());

// ✅ Auth0 token verification middleware
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-7whr3yiydc13aogp.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://recipes-api", //  Same as in frontend
  issuer: "https://dev-7whr3yiydc13aogp.eu.auth0.com/",
  algorithms: ["RS256"],
});

// ✅ Protected route
app.get("/protected", checkJwt, (req, res) => {
  res.json({
    message: "Access granted to protected route!",
    user: req.auth,
  });
});

// Optional: Public route
app.get("/", (req, res) => {
  res.send("Welcome to RecipeHub API");
});

app.listen(3000, () => console.log("✅ Backend running at http://localhost:3000"));