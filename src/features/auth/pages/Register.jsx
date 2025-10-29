import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    paternal_lastname: '',
    maternal_lastname: '',
    email: '',
    user_name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword: _confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Card Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Crear Cuenta</h1>
            <p className="text-white/70">Únete a nuestra comunidad</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Nombre(s) *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="user_name" className="block text-sm font-medium text-white/80 mb-2">
                  Nombre de Usuario *
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="tu_usuario"
                  value={formData.user_name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Last Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="paternal_lastname" className="block text-sm font-medium text-white/80 mb-2">
                  Apellido Paterno *
                </label>
                <input
                  id="paternal_lastname"
                  name="paternal_lastname"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Apellido paterno"
                  value={formData.paternal_lastname}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="maternal_lastname" className="block text-sm font-medium text-white/80 mb-2">
                  Apellido Materno
                </label>
                <input
                  id="maternal_lastname"
                  name="maternal_lastname"
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Apellido materno"
                  value={formData.maternal_lastname}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Correo Electrónico *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="tu@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                  Teléfono
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="+52 55 1234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                  Contraseña *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
                  Confirmar Contraseña *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Repite tu contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creando cuenta...
                </div>
              ) : (
                'Crear Cuenta'
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-white/70 text-sm">
                ¿Ya tienes cuenta?{' '}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-medium transition duration-200"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;