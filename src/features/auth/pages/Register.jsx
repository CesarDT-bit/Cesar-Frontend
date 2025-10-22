import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    document_number: "",
    name: "",
    paternal_lastname: "",
    maternal_lastname: "",
    email: "",
    phone: "",
    user_name: "",
    password: "",
    last_session: new Date().toISOString().split("T")[0],
    account_statement: true,
    document_type_id: 1,
    country_id: 179,
  });

  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(userData);
      alert("✅ Usuario registrado exitosamente!");
      navigate("/login", {
        replace: true,
        state: { registeredEmail: userData.email },
      });
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        alert(`❌ Errores:\n\n${errorMessages.join("\n")}`);
      } else {
        alert(
          `❌ Error: ${
            error.response?.data?.message || "Error al registrar usuario"
          }`
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 px-4 py-12">
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-10 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Crear Cuenta
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Complete la información para registrarse
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre y apellidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={userData.name}
                onChange={handleChange}
                placeholder="Ej: Juan"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-slate-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="paternal_lastname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Apellido Paterno *
              </label>
              <input
                id="paternal_lastname"
                name="paternal_lastname"
                type="text"
                required
                value={userData.paternal_lastname}
                onChange={handleChange}
                placeholder="Ej: Pérez"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Apellido Materno y Documento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="maternal_lastname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Apellido Materno *
              </label>
              <input
                id="maternal_lastname"
                name="maternal_lastname"
                type="text"
                required
                value={userData.maternal_lastname}
                onChange={handleChange}
                placeholder="Ej: García"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-slate-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="document_number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Documento *
              </label>
              <input
                id="document_number"
                name="document_number"
                type="text"
                required
                value={userData.document_number}
                onChange={handleChange}
                placeholder="Ej: 87654321"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo Electrónico *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={userData.email}
              onChange={handleChange}
              placeholder="usuario@empresa.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-slate-500 focus:outline-none"
            />
          </div>

          {/* Nombre de usuario */}
          <div>
            <label
              htmlFor="user_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Usuario *
            </label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              required
              value={userData.user_name}
              onChange={handleChange}
              placeholder="Ej: jperez"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-slate-500 focus:outline-none"
            />
          </div>

          {/* Teléfono y contraseña */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Teléfono *
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                required
                value={userData.phone}
                onChange={handleChange}
                placeholder="Ej: 987654321"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-slate-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={userData.password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 text-white font-medium rounded-lg bg-gray-800 hover:bg-gray-700 focus:ring-2 focus:ring-slate-400 transition disabled:opacity-60"
          >
            {loading ? "Registrando..." : "Crear Cuenta"}
          </button>

          {/* Enlace a Login */}
          <p className="text-center text-sm text-gray-500 mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="text-gray-100 font-medium hover:text-white transition"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
