
import { useRelatedProducts } from '../../hooks/useRelatedProducts';
import ProductGrid from '../product/ProductGrid';

function RelatedProducts({ currentProductId, category }) {
  const { products, loading, error } = useRelatedProducts(category, currentProductId);
  
  if (loading) return <div className="text-center py-4">Loading related products...</div>;
  if (error) return <div className="text-red-500 py-4">Error loading related products</div>;
  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">You may also like</h2>
      <ProductGrid products={products} />
    </div>
  );
}

export default RelatedProducts;