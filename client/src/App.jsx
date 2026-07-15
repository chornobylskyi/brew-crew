import { useState, useEffect } from 'react';
import './App.css'
import ProductList from './ProductList'

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController cancels the fetch if the component unmounts
    const controller = new AbortController();
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products', {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

    // Cleanup function
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  return <ProductList products={products} />;
}

export default App
