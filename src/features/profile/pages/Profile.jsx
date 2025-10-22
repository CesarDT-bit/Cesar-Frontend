import React from "react";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { profile, loading, error } = useProfile();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700">
        <div className="text-lg text-white">Cargando perfil...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  const getInitials = (name = "", paternal = "") => {
    return `${name.charAt(0) || ""}${paternal.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl w-full max-w-4xl p-10">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Perfil de Usuario</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Cerrar Sesión
          </button>
        </div>

        {profile && (
          <>
            {/* Encabezado con avatar */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="relative">
                {profile.image_url ? (
                  <img
                    src={profile.image_url}
                    alt="Foto de perfil"
                    className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gray-800 flex items-center justify-center text-white text-2xl font-bold border-4 border-gray-300 shadow-md">
                    {getInitials(profile.name, profile.paternal_lastname)}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mt-4">
                {profile.name} {profile.paternal_lastname} {profile.maternal_lastname}
              </h2>
              <p className="text-sm text-gray-500">{profile.role?.name}</p>
            </div>

            {/* Información */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Información Personal */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-gray-800 rounded-full mr-2"></span>
                  Información Personal
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900">{profile.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Nombre de usuario</dt>
                    <dd className="text-sm text-gray-900">{profile.user_name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
                    <dd className="text-sm text-gray-900">{profile.phone}</dd>
                  </div>
                </dl>
              </div>

              {/* Información Adicional */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-gray-800 rounded-full mr-2"></span>
                  Información Adicional
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">País</dt>
                    <dd className="text-sm text-gray-900">{profile.country?.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">ID de usuario</dt>
                    <dd className="text-sm text-gray-900">{profile.id}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
