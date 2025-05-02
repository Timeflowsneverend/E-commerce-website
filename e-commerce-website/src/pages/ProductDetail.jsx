import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";

import { useCart } from "../components/context/CartContext";
import Rating from "../components/product/Rating";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingSpinner from "../components/ui/Loading";
import RelatedProducts from "../components/ui/RelatedProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-50">
            <img
              src={product.image}
              alt={product.title}
              className="h-96 object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center">
              <Rating rating={product.rating} />
              <span className="ml-2 text-gray-600">
                {product.rating.count} reviews
              </span>
            </div>

            <p className="mt-6 text-gray-700 text-lg">{product.description}</p>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">
                  In stock (Ready to ship)
                </span>
              </div>

              <div className="mt-8 flex space-x-4">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-md font-medium transition-colors"
                >
                  Add to Cart
                </button>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-8 rounded-md font-medium transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Details</h3>
              <div className="mt-4 space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Product ID:</span> {product.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProducts
        currentProductId={product.id}
        category={product.category}
      />
    </div>
  );
}
