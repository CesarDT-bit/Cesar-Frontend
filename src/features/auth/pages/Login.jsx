import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.registeredEmail) {
      setCredentials((prev) => ({
        ...prev,
        email: location.state.registeredEmail,
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      alert("Por favor, complete todos los campos");
      return;
    }

    try {
      await login(credentials);
      navigate("/profile");
    } catch (error) {
      console.error("Error en login:", error);
      alert(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 px-4 py-10">
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-2xl w-full max-w-md p-10 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Bienvenido de nuevo
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Inicia sesión con tus credenciales corporativas
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="usuario@empresa.com"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-slate-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 text-white font-medium rounded-lg bg-gray-800 hover:bg-gray-700 focus:ring-2 focus:ring-slate-400 transition disabled:opacity-60"
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="text-gray-900 font-medium hover:text-gray-700 transition"
            >
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
