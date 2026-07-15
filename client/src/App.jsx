import { useState, useEffect } from 'react';
import './App.css'
import ProductList from './ProductList'
import ProductAddForm from './ProductAddForm';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleAddProduct = (newProduct) => setProducts(prev => [...prev, newProduct]);

  useEffect(() => {
    // AbortController cancels the fetch if the component unmounts
    const controller = new AbortController();
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/products', {
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

  return (
      <>
        <h2>Products</h2>
        {loading ? (<p>Loading…</p>) : error ? (<p>Error: {error}</p>) : (<ProductList products={products} />)}
        <ProductAddForm onAddProduct={handleAddProduct} />
      </>
  )
}

export default App
