import { Outlet } from 'react-router-dom'
import Navbar from './ui/Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet/>
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 E-Commerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}