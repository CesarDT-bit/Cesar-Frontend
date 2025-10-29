import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';

const BlogPersonalPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { posts, loading } = useBlog();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsMenuOpen(false);
  };

  // Función para obtener iniciales del usuario
  const getUserInitials = () => {
    if (user?.name && user?.paternal_lastname) {
      return `${user.name.charAt(0)}${user.paternal_lastname.charAt(0)}`.toUpperCase();
    }
    return user?.name?.charAt(0)?.toUpperCase() || 'U';
  };

  // Función para obtener fecha formateada en español
  const formatDate = (dateString) => {
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      timeZone: 'UTC'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Función para obtener color basado en categoría - MEJORADA
  const getCategoryColor = (category) => {
    const colors = {
      'React': 'bg-blue-100 text-blue-800 border-blue-200',
      'JavaScript': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'TypeScript': 'bg-blue-50 text-blue-700 border-blue-100',
      'Vue': 'bg-green-100 text-green-800 border-green-200',
      'Node.js': 'bg-green-50 text-green-700 border-green-100',
      'CSS': 'bg-pink-100 text-pink-800 border-pink-200',
      'Backend': 'bg-gray-100 text-gray-800 border-gray-200',
      'API': 'bg-purple-100 text-purple-800 border-purple-200',
      'Base de Datos': 'bg-orange-100 text-orange-800 border-orange-200',
      'Testing': 'bg-red-100 text-red-800 border-red-200',
      'DevOps': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Herramientas': 'bg-gray-50 text-gray-700 border-gray-100',
      'Performance': 'bg-teal-100 text-teal-800 border-teal-200',
      'Buenas Prácticas': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'WebSockets': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Lenguajes': 'bg-purple-50 text-purple-700 border-purple-100',
      'Reflexiones': 'bg-indigo-50 text-indigo-700 border-indigo-100'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Función para calcular tiempo de lectura real basado en contenido
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tu blog personal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Mejorado */}
      <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200/80 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  DevBlog
                </h1>
                <p className="text-gray-600 text-sm">Blog personal de {user?.name || 'Usuario'}</p>
              </div>
            </div>
            
            {/* Menú de Navegación Mejorado */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/blog')}
                className="hidden sm:flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium transition-all duration-200 px-4 py-2 rounded-lg hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12" />
                </svg>
                Explorar Blog Público
              </button>

              {/* Menú de Usuario Mejorado */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-3 bg-white hover:bg-gray-50 rounded-xl px-4 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-200 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      {getUserInitials()}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-semibold text-gray-900">{user?.name || 'Usuario'}</p>
                      <p className="text-xs text-gray-500">Desarrollador</p>
                    </div>
                  </div>
                  <svg 
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Menú Desplegable Mejorado */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200/80 py-2 z-50 backdrop-blur-lg">
                    {/* Header del Menú */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'Usuario'}</p>
                      <p className="text-sm text-gray-500 truncate">{user?.email || 'usuario@ejemplo.com'}</p>
                    </div>

                    {/* Opciones del Menú */}
                    <div className="py-2">
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-150 group"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Mi Perfil Personal
                      </button>

                      <button
                        onClick={() => navigate('/blog')}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-150 group"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12" />
                        </svg>
                        Explorar Blog Público
                      </button>
                    </div>

                    {/* Footer del Menú */}
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-150 group"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Mejorada */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Mi Journey en Desarrollo
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Documentando mi aprendizaje, compartiendo experiencias y reflexionando sobre el mundo del desarrollo web moderno.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              🚀 Aprendizaje Continuo
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              💡 Mejores Prácticas
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              🔥 Tecnologías Modernas
            </span>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid Mejorado */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {/* Header de Publicaciones */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Mis Publicaciones</h2>
            <p className="text-gray-600 mt-2">Artículos basados en mi experiencia personal</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
            <div className="text-sm text-gray-500">Artículos publicados</div>
          </div>
        </div>

        {/* Grid de Posts Mejorado */}
        <div className="grid gap-8 lg:grid-cols-2">
          {posts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-200/80 hover:border-blue-200/50"
            >
              <div className="p-8">
                {/* Header con categoría y fecha */}
                <div className="flex justify-between items-start mb-6">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                    {formatDate(post.date)}
                  </span>
                </div>

                {/* Título Mejorado */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt/Descripción */}
                <p className="text-gray-700 leading-relaxed mb-6 text-lg line-clamp-3">
                  {post.excerpt || post.body.substring(0, 180)}...
                </p>

                {/* Tags Mejorados */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags?.slice(0, 4).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer con Stats Mejorado */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readTime || calculateReadTime(post.body)}
                    </span>
                    <span className="flex items-center bg-green-50 text-green-700 px-3 py-1.5 rounded-lg">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {Math.floor(Math.random() * 150) + 50} vistas
                    </span>
                  </div>

                  <button 
                    onClick={() => navigate(`/blog/posts/${post.id}`)}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group/btn transition-all duration-200"
                  >
                    Leer artículo
                    <svg className="w-4 h-4 ml-1.5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Efecto de gradiente en hover */}
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </article>
          ))}
        </div>

        {/* Estadísticas del Blog Mejoradas */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-8 text-center">Estadísticas de Mi Blog</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-blue-400">{posts.length}</div>
              <div className="text-sm text-gray-300 mt-2">Artículos Publicados</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-green-400">
                {posts.reduce((acc, post) => {
                  const time = parseInt(post.readTime) || calculateReadTime(post.body).split(' ')[0];
                  return acc + parseInt(time);
                }, 0)} min
              </div>
              <div className="text-sm text-gray-300 mt-2">Tiempo Total de Lectura</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-purple-400">
                {new Set(posts.map(post => post.category)).size}
              </div>
              <div className="text-sm text-gray-300 mt-2">Categorías Únicas</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-orange-400">2024</div>
              <div className="text-sm text-gray-300 mt-2">Año de Inicio</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Mejorado */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-gray-900">DevBlog</span>
          </div>
          <p className="text-gray-600 mb-2">
            © 2024 DevBlog - Blog personal de {user?.name || 'Usuario'}
          </p>
          <p className="text-gray-500 text-sm">
            Compartiendo conocimiento y experiencias en el mundo del desarrollo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPersonalPage;