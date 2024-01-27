// server.js
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { resolve } = require('path');
const { readFileSync } = require('fs');

const app = express();
const server = createServer(app);

// Enable CORS for all routes
app.use(cors());

// Serve Vite app on the root path
app.use(express.static(resolve(__dirname, 'dist')));

// Use this route for your API proxy
app.post('/4646f2ef-9ef5-45a3-8ce6-8357840b8559', (req, res) => {
  const segmentData = req.body; // You may need to install body-parser middleware for this

  // Forward the request to the external server
  fetch('https://webhook.site/4646f2ef-9ef5-45a3-8ce6-8357840b8559', {
    method: 'POST',
    headers: {
      'Api-Key': '4646f2ef-9ef5-45a3-8ce6-8357840b8559',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(segmentData),
  })
    .then((response) => response.json())
    .then((responseData) => {
      res.json(responseData);
    })
    .catch((error) => {
      console.error('Error forwarding request:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Start the server
const PORT = process.env.PORT || 5173;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
