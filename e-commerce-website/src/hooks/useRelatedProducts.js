// src/hooks/useRelatedProducts.js
import { useEffect, useState } from 'react';
import { getRelatedProducts } from '../services/fakeStore';

export function useRelatedProducts(category, excludeId) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        const data = await getRelatedProducts(category, excludeId);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch related products');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, excludeId]);

  return { products, loading, error };
}