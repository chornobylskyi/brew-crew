const express = require('express');
const app = express();
const products = require('./routes/products');
const cors = require('cors');

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

// IMPORTANT: Middleware to parse JSON payloads in request bodies
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: Number(process.uptime().toFixed(2)),
        timestamp: new Date().toISOString()
    });
});

app.use('/api/products', products);

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

module.exports = app;