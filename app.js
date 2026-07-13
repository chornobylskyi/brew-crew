const express = require('express');
const app = express();

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: Number(process.uptime().toFixed(2)),
        timestamp: new Date().toISOString()
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Not found'
    });
});

module.exports = app;