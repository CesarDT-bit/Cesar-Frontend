import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import BlogPersonalPage from './features/blog/pages/BlogPersonalPage';
import BlogPage from './features/blog/pages/BlogPage';
import PostDetailPage from './features/blog/pages/PostDetailPage';
import Profile from './features/profile/pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/posts/:id" element={<PostDetailPage />} />
          
          {/* Ruta protegida PRINCIPAL - Blog Personal */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <BlogPersonalPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Ruta protegida del Perfil */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;