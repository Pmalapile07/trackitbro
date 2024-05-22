const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());

// CORS configuration
app.use(cors({ origin: '*' })); // Allows all origins

// Serve static files
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Mock database
const orders = {
  '12345': { status: 'Shipped', estimatedDelivery: '2024-05-20' },
  '67890': { status: 'Processing', estimatedDelivery: '2024-05-25' },
};

// Endpoint to get order status
app.get('/api/order/:id', (req, res) => {
  try {
    const orderId = req.params.id;
    const order = orders[orderId];

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

