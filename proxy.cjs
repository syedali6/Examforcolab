const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, 4646f2ef-9ef5-45a3-8ce6-8357840b8559');
  next();
});

app.post('/', (req, res) => {
  // Handle the POST request
  res.json({ message: 'Webhook received successfully' });
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
