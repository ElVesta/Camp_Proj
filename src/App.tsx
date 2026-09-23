import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/cartcontext';
import { FavoritesProvider } from './contexts/favcontext';
import { ProductsProvider } from './contexts/ProductsContext';
import { AuthProvider } from './contexts/AuthContext';
import { Home } from './pages/home/home';
import { CatalogPage } from './pages/catalog/catalog';
import { FavoritesPage } from './pages/favorite/favorite';
import { CartPage } from './pages/basket/basket';
import { AuthPage } from './pages/auth/auth';
import { ProfilePage } from './pages/profile/profile';
import { ContactsPage } from './pages/contacts/ContactsPage';
import { ProductPage } from './pages/product/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <FavoritesProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/favorite" element={<FavoritesPage />} />
                  <Route path="/basket" element={<CartPage />} />
                  <Route path="/login" element={<AuthPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/contacts" element={<ContactsPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                </Routes>
              </FavoritesProvider>
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;