import { useState } from 'react';

export default function ProductAddForm ({onAddProduct}) {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: productName,
                    price: Number(productPrice), // Converts string input to a number
                    category: productCategory
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to add the product');
            }

            const newProduct = await response.json();

            onAddProduct(newProduct);

            // Clear form inputs on success
            setProductName('');
            setProductPrice('');
            setProductCategory('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h2>Add new product</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Product name:
                        <input name="product-name"
                               id="product-name"
                               placeholder="Enter product name"
                               required
                               type="text"
                               value={productName}
                               onChange={(e) => setProductName(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Product price:
                        <input name="product-price"
                               id="product-price"
                               placeholder="Enter product price"
                               required
                               type="number"
                               value={productPrice}
                               onChange={(e) => setProductPrice(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Product category:
                        <input name="product-category"
                               id="product-category"
                               placeholder="Enter product category"
                               required
                               type="text"
                               value={productCategory}
                               onChange={(e) => setProductCategory(e.target.value)} />
                    </label>
                </div>
                <button type="submit" disabled={loading}>Add product</button>
            </form>

            {error && <p>Error: {error}</p>}
        </>
    )
}