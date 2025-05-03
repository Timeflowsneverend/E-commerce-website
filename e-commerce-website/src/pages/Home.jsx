import { useProducts } from '../hooks/useProducts'
import ProductGrid from '../components/product/ProductGrid'
import Loading from '../components/ui/Loading'

export default function Home() {
  const { products, loading } = useProducts(4) // Show only 4 featured products

  return (
    <div className="space-y-12">
      <section className="bg-primary-500 text-indigo-5000 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to ShopVite</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        {loading ? (
          <Loading />
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </div>
  )
}