import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // AbortController cancels the fetch if the component unmounts
        const controller = new AbortController();
        const fetchItems = async () => {
            try {
                const response = await fetch(`/api/products/${productId}`, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error(response.status === 404 ? 'Product not found' : 'Network error');
                }

                setProduct(await response.json());
                setLoading(false);
            } catch (err) {
                if (err.name === 'AbortError') return;

                setError(err.message);
                setLoading(false);
            }
        };

        fetchItems();

        // Cleanup function
        return () => controller.abort();
    }, [productId]);

    if (loading) return <p>Loading…</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Product not found. <Link to='/'>Back to list</Link></p>;

    return (
        <>
            <Link to='/'>Home</Link>
            <h1>{product.name}</h1>
        </>
    )
}