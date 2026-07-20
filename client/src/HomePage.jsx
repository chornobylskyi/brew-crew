import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import ProductAddForm from './ProductAddForm';

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleAddProduct = (newProduct) => setProducts(prev => [...prev, newProduct]);

    useEffect(() => {
        // AbortController cancels the fetch if the component unmounts
        const controller = new AbortController();
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/products', { signal: controller.signal });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                setProducts(await response.json());
            } catch (err) {
                if (err.name === 'AbortError') return;

                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();

        // Cleanup function
        return () => controller.abort();
    }, []);

    return (
        <>
            <h2>Products</h2>
            {loading ? (<p>Loading…</p>) : error ? (<p>Error: {error}</p>) : (<ProductList products={products} />)}
            <ProductAddForm onAddProduct={handleAddProduct} />
        </>
    );
}