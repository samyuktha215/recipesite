require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// JWT middleware to protect routes
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});
app.use(cors({ origin: 'https://your-frontend.vercel.app', credentials: true }));


// Public route
app.get('/', (req, res) => res.send('Server is running!'));

// Protected route
app.get('/api/recipes', checkJwt, (req, res) => {
  res.json({ message: 'Secure recipes data from backend' });
});

// Error handler for JWT
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({ message: 'Invalid token' });
  }
  next(err);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
