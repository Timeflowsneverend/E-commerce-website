const API_URL = 'https://fakestoreapi.com'

export async function getProducts(limit = 10) {
  const response = await fetch(`${API_URL}/products?limit=${limit}`)
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
}

export async function getProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`)
  if (!response.ok) throw new Error('Failed to fetch product')
  return response.json()
}

export async function getCategories() {
  const response = await fetch(`${API_URL}/products/categories`)
  if (!response.ok) throw new Error('Failed to fetch categories')
  return response.json()
}