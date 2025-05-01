import { Link } from 'react-router-dom'

import Button from '../ui/Button'
import Rating from './Rating'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <Link to={`/products/${product.id}`} className="block">
        <div className="p-4">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-48 object-contain mb-4"
          />
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {product.title}
          </h3>
          <Rating rating={product.rating} />
        </div>
      </Link>
      <div className="px-4 pb-4 flex justify-between items-center">
        <span className="text-xl font-bold">${product.price}</span>
        <Button 
          onClick={() => addToCart(product)}
          className="btn-primary"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}