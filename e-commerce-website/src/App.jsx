import { BrowserRouter as Router } from 'react-router-dom'

import { CartProvider } from './components/context/CartContext'
import AppRoutes from './routes'

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppRoutes/>
      </Router>
    </CartProvider>
  )
}