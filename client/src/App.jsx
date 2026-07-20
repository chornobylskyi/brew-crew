import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import ProductDetail from './ProductDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/products/:productId' element={<ProductDetail />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
