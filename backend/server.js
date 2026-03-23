const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to products.json
const productsFilePath = path.join(__dirname, 'products.json');

// Helper function to read products
function readProducts() {
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data);
}

// Helper function to write products
function writeProducts(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

// GET /products
app.get('/products', (req, res) => {
    try {
        let products = readProducts();

        // Filter by category
        if (req.query.category) {
            products = products.filter(p => p.category.toLowerCase() === req.query.category.toLowerCase());
        }

        // Search by name
        if (req.query.search) {
            products = products.filter(p => p.name.toLowerCase().includes(req.query.search.toLowerCase()));
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /products/:id
app.get('/products/:id', (req, res) => {
    try {
        const products = readProducts();
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /products
app.post('/products', (req, res) => {
    try {
        const { name, category, price, image, stock } = req.body;

        // Validation
        if (!name || !category || !price || !image || stock === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (price <= 0) {
            return res.status(400).json({ error: 'Price must be greater than 0' });
        }
        if (stock < 0) {
            return res.status(400).json({ error: 'Stock must be greater than or equal to 0' });
        }

        const products = readProducts();
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { id: newId, name, category, price, image, stock };
        products.push(newProduct);
        writeProducts(products);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /products/:id
app.put('/products/:id', (req, res) => {
    try {
        const products = readProducts();
        const index = products.findIndex(p => p.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const { name, category, price, image, stock } = req.body;

        // Validation
        if (!name || !category || !price || !image || stock === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (price <= 0) {
            return res.status(400).json({ error: 'Price must be greater than 0' });
        }
        if (stock < 0) {
            return res.status(400).json({ error: 'Stock must be greater than or equal to 0' });
        }

        products[index] = { ...products[index], name, category, price, image, stock };
        writeProducts(products);
        res.json(products[index]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /products/:id
app.delete('/products/:id', (req, res) => {
    try {
        const products = readProducts();
        const index = products.findIndex(p => p.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const deletedProduct = products.splice(index, 1)[0];
        writeProducts(products);
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});