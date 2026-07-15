import './App.css'
import ProductList from './ProductList'
const products = [
  { id: 1, name: 'Ethiopia Yirgacheffe', price: 18.5, category: 'beans' },
  { id: 2, name: 'French Press', price: 16.99, category: 'equipment' },
  { id: 3, name: 'Kenya AA', price: 19.75, category: 'beans' }
];

function App() {
  return (
      <ProductList products={products}/>
  )
}

export default App
