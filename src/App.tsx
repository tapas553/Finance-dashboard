import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <AuthProvider>
      <FinanceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FinanceProvider>
    </AuthProvider>
  );
}

export default App;
