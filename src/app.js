const express = require('express');
const redis = require('redis');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

// Create Redis client
const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

// Connect to Redis
client.connect().catch(console.error);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data and serve static HTML
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form on the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const { name, marks } = req.body;
  try {
    // Store user data in Redis
    await client.set(name, marks);
    res.send(`<h1>Data Saved!</h1><p>Name: ${name}</p><p>Marks: ${marks}</p>`);
  } catch (err) {
    res.status(500).send('Error storing data in Redis');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

