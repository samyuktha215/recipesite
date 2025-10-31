import express from "express";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import commentsRouter from "./routes/comments.js";
import contactRouter from "./routes/contact.js";
 
 
const app = express();
const allowedOrigins = [
  "http://localhost:8888", 
  "https://recipesite.netlify.app", 
  "https://recipesite--feature-rob.netlify.app", 
  "https://grupp1-mqzle.reky.se"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

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


app.use("/recipes", commentsRouter);
app.use("/contact", contactRouter);
 
app.listen(3000, () => console.log("✅ Backend running at http://localhost:3000"));
 