import React from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';

const BlogPersonalPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { posts, loading } = useBlog();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Función para obtener fecha formateada
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Función para obtener color basado en categoría
  const getCategoryColor = (category) => {
    const colors = {
      'React': 'bg-blue-100 text-blue-800',
      'JavaScript': 'bg-yellow-100 text-yellow-800',
      'TypeScript': 'bg-blue-100 text-blue-800',
      'Vue': 'bg-green-100 text-green-800',
      'Node.js': 'bg-green-100 text-green-800',
      'CSS': 'bg-pink-100 text-pink-800',
      'Backend': 'bg-gray-100 text-gray-800',
      'API': 'bg-purple-100 text-purple-800',
      'Base de Datos': 'bg-orange-100 text-orange-800',
      'Testing': 'bg-red-100 text-red-800',
      'DevOps': 'bg-indigo-100 text-indigo-800',
      'Herramientas': 'bg-gray-100 text-gray-800',
      'Performance': 'bg-teal-100 text-teal-800',
      'Buenas Prácticas': 'bg-emerald-100 text-emerald-800',
      'WebSockets': 'bg-cyan-100 text-cyan-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">DevBlog</h1>
              <p className="text-gray-600 text-sm">Blog personal de {user?.name || 'Usuario'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/blog')}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Blog Público
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Mi Blog de Desarrollo
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Compartiendo conocimientos, experiencias y reflexiones sobre el mundo del desarrollo web y la programación.
        </p>
      </section>

      {/* Blog Posts Grid */}
      <main className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid gap-8">
          {posts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="p-8">
                {/* Header con categoría y fecha */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(post.date)}
                  </span>
                </div>

                {/* Título */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h3>

                {/* Contenido */}
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {post.body.substring(0, 150)}...
                </p>

                {/* Footer con stats y tags */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readTime}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {Math.floor(Math.random() * 100) + 20} vistas
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {Math.floor(Math.random() * 15) + 3} likes
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex space-x-2">
                    {post.tags?.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Línea divisora estética */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </article>
          ))}
        </div>

        {/* Estadísticas del blog */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Estadísticas del Blog</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
              <div className="text-sm text-gray-600">Artículos publicados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {posts.reduce((acc, post) => acc + parseInt(post.readTime), 0)} min
              </div>
              <div className="text-sm text-gray-600">Tiempo total de lectura</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {new Set(posts.map(post => post.category)).size}
              </div>
              <div className="text-sm text-gray-600">Categorías</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">2024</div>
              <div className="text-sm text-gray-600">Año de inicio</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            © 2024 DevBlog - Blog personal de {user?.name || 'Usuario'}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Desarrollado con React, Tailwind CSS y mucho ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPersonalPage;