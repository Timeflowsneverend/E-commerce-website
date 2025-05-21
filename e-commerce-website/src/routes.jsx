import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/cart'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}