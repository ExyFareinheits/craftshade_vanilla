import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import HelpPage from './pages/HelpPage/HelpPage';
import UpdatesPage from './pages/UpdatesPage/UpdatesPage';
import ShopPage from './pages/ShopPage/ShopPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import StaffPage from './pages/StaffPage/StaffPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CallbackPage from './pages/CallbackPage/CallbackPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="updates" element={<UpdatesPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="auth/callback" element={<CallbackPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

