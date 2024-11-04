import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { LoginForm } from './components/Auth/LoginForm';
import { SignUpForm } from './components/Auth/SignUpForm';
import { CurrencySelector } from './components/CurrencySelector';
import { SearchBar } from './components/SearchBar';
import { ProductEditor } from './components/Admin/ProductEditor';
import { LanguageSelector } from './components/LanguageSelector';
import { useAuthStore } from './store/authStore';

const products = [
  {
    id: '1',
    name: 'Brake Pads',
    description: 'High-performance ceramic brake pads',
    price: 89.99,
    image: 'https://example.com/brake-pads.jpg',
    category: 'Brakes',
    stock: 50
  },
  {
    id: '2',
    name: 'Oil Filter',
    description: 'Premium quality oil filter',
    price: 12.99,
    image: 'https://example.com/oil-filter.jpg',
    category: 'Filters',
    stock: 100
  }
];

function App() {
  const { t } = useTranslation();
  const { user, signOut } = useAuthStore();
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (query: string) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const isAdmin = user?.email === 'zhetai@518004.com';

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-xl font-bold text-gray-800">
                  {t('nav.home')}
                </Link>
                <SearchBar onSearch={handleSearch} />
                <CurrencySelector />
                <LanguageSelector />
              </div>
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <span>{t('nav.welcome')}, {user.name || user.email}</span>
                    {isAdmin && (
                      <Link
                        to="/admin/products"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {t('nav.manageProducts')}
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {t('nav.signOut')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {t('nav.signIn')}
                    </Link>
                    <Link
                      to="/signup"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {t('nav.signUp')}
                    </Link>
                  </>
                )}
                <Link
                  to="/cart"
                  className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900"
                >
                  {t('nav.cart')}
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            {isAdmin && (
              <Route path="/admin/products" element={<ProductEditor />} />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;