import express from "express";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OAuth2Client("dgzwTiXahFJjvtapPW9ASvSymz8qdMIT"); // same as frontend!

async function verifyOAuthToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      console.log(" No token header received");
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log(" Token received:", token.substring(0, 20) + "...");

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "dgzwTiXahFJjvtapPW9ASvSymz8qdMI", // must match your frontend client ID
    });

    const payload = ticket.getPayload();
    req.user = payload;
    next();
  } catch (err) {
    console.error(" Token verification failed:", err.message);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

app.get("/protected", verifyOAuthToken, (req, res) => {
  res.json({
    message: "Protected route accessed!",
    user: req.user,
  });
});

app.listen(3001, () => console.log(" Server running on http://localhost:3001"));
