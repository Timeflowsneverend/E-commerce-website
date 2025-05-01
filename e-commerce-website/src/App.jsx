import { BrowserRouter as Router } from 'react-router-dom'

import Layout from './components/Layout'
import AppRoutes from './routes'
import { CartProvider } from './components/context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </CartProvider>
  )
}