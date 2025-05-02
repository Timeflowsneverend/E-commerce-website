// src/services/fakeStore.js
export async function getRelatedProducts(category, excludeId, limit = 4) {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch related products');
    const products = await response.json();
    return products
      .filter(product => product.id !== excludeId)
      .slice(0, limit);
  }