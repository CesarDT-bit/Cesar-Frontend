import React from "react";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { profile, loading, error } = useProfile();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleBackToBlog = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="text-white text-lg">Cargando perfil...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-red-200 px-6 py-4 rounded-2xl max-w-md text-center">
          <p className="font-semibold">Error al cargar el perfil</p>
          <p className="text-sm mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm transition duration-200"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const getInitials = (name = "", paternal = "") => {
    return `${name.charAt(0) || ""}${paternal.charAt(0) || ""}`.toUpperCase();
  };

  const currentUser = profile || user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleBackToBlog}
            className="flex items-center text-white/70 hover:text-white transition duration-200 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Blog
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition duration-200 transform hover:scale-105 shadow-lg"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
          {currentUser && (
            <>
              {/* Profile Header */}
              <div className="flex flex-col items-center text-center mb-10">
                <div className="relative mb-6">
                  {currentUser.image_url ? (
                    <img
                      src={currentUser.image_url}
                      alt="Foto de perfil"
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-white/20 shadow-2xl">
                      {getInitials(currentUser.name, currentUser.paternal_lastname)}
                    </div>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {currentUser.name} {currentUser.paternal_lastname} {currentUser.maternal_lastname}
                </h1>
                <p className="text-white/70 text-lg">{currentUser.role?.name || "Usuario registrado"}</p>
                <p className="text-white/50 text-sm mt-2">ID: {currentUser.id}</p>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    Información Personal
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white/70 block mb-1">Email</label>
                      <p className="text-white font-medium">{currentUser.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/70 block mb-1">Nombre de usuario</label>
                      <p className="text-white font-medium">{currentUser.user_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/70 block mb-1">Teléfono</label>
                      <p className="text-white font-medium">{currentUser.phone || "No especificado"}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    Información Adicional
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white/70 block mb-1">País</label>
                      <p className="text-white font-medium">{currentUser.country?.name || "No especificado"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/70 block mb-1">Tipo de usuario</label>
                      <p className="text-white font-medium">{currentUser.role?.name || "Usuario estándar"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/70 block mb-1">Estado</label>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-300 border border-green-500/50">
                        Activo
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Information */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  Información del Sistema
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="text-2xl font-bold text-white mb-2">2024</div>
                    <div className="text-white/70 text-sm">Miembro desde</div>
                  </div>
                  <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="text-2xl font-bold text-white mb-2">Hoy</div>
                    <div className="text-white/70 text-sm">Último acceso</div>
                  </div>
                  <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="text-2xl font-bold text-green-400 mb-2">Verificada</div>
                    <div className="text-white/70 text-sm">Estado de cuenta</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;