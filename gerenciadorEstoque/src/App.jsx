import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CadastroUsuario from "./pages/CadastroUsuario"
import Login from "./pages/Login";
import Inventario from "./pages/Inventario";
import ProductRegister from "./pages/ProductRegister";
import ProductEdit from "./pages/ProductEdit";
import { ProductProvider } from "./contexts/ProductContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Componente para proteger rotas que requerem autenticação
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/usuario/cadastro" element={<CadastroUsuario />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Navigate to="/inventario" replace />
            </ProtectedRoute>
          } />
          
          <Route path="/inventario" element={
            <ProtectedRoute>
              <Inventario />
            </ProtectedRoute>
          } />
          
          <Route path="/produto/cadastro" element={
            <ProtectedRoute>
              <ProductRegister />
            </ProtectedRoute>
          } />

          <Route path="/produto/editar/:id" element={
            <ProtectedRoute>
              <ProductEdit />
            </ProtectedRoute>
          } />
        </Routes>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
