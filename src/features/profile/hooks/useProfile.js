import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { profileService } from '../services/profileService';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, updateUser } = useAuth(); // 🔥 Obtenemos updateUser

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 🔥 PRIORIDAD: Usar los datos del AuthContext (del registro/login)
      if (user) {
        setProfile(user);
        return;
      }

      // Si no hay usuario en el contexto, intentar obtener del servicio
      const userProfile = await profileService.getProfile();
      setProfile(userProfile);
      
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('No se pudo cargar la información del perfil.');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const updatedProfile = await profileService.updateProfile(profileData);
      
      // 🔥 ACTUALIZAR TANTO EL ESTADO LOCAL COMO EL CONTEXTO
      setProfile(updatedProfile);
      updateUser(updatedProfile); // 🔥 Actualizar en AuthContext también
      
      return updatedProfile;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al actualizar perfil';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]); // 🔥 Se ejecuta cuando el usuario en el contexto cambia

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile,
    clearError
  };
};