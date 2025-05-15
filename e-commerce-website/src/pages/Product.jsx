import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Search } from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products
        const productsResponse = await fetch('https://fakestoreapi.com/products');
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Fetch categories
        const categoriesResponse = await fetch('https://fakestoreapi.com/products/categories');
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }
  const handleAddToCart = (product) => {
console.log('Product added to cart:', product);
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Product Count */}
        <p className="text-gray-600 mb-4">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link to={`/products/${product.id}`} className="block">
                <div className="h-48 p-4 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/products/${product.id}`} className="block">
                    <h2 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600">
                      {product.title}
                    </h2>
                  </Link>
                  <button className="p-1 text-gray-400 hover:text-red-500">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${i < Math.round(product.rating.rate) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        fill={i < Math.round(product.rating.rate) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 ml-1">
                    ({product.rating.count})
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  
                  <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm" onClick={() => handleAddToCart()}>
                    <ShoppingCart className="h-4 w-4 mr-1"   />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;