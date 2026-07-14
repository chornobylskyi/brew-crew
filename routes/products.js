const express = require('express');
const router = express.Router();
const products = [
    { id: 1, name: 'Ethiopia Yirgacheffe', price: 18.5, category: 'beans' },
    { id: 2, name: 'French Press', price: 16.99, category: 'equipment' },
    { id: 3, name: 'Kenya AA', price: 19.75, category: 'beans' }
];

router.get('/', (req, res) => {
    res.status(200).json(products);
});

router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            error: 'Product not found'
        });
    }

    res.status(200).json(product);
});

router.post('/', (req, res) => {
    const { name, price, category } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).json({ message: 'Name field is required' });
    }

    if (!category || category.trim() === '') {
        return res.status(400).json({ message: 'Category field is required' });
    }

    if (price === undefined || price === null) {
        return res.status(400).json({ message: 'Price field is required' });
    }
    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
        return res.status(400).json({ message: 'Price must be a valid positive number' });
    }

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
        id: newId,
        name: name.trim(),
        price: price,
        category: category.trim()
    };

    res.status(201).json(newProduct);
});

module.exports = router;