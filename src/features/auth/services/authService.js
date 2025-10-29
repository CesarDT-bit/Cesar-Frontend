import axios from 'axios';

// 🔥 USAR PROXY EN DESARROLLO
const BASE_URL = import.meta.env.DEV 
  ? '/api'  // Usar proxy en desarrollo
  : 'https://reflexoperu-v3.marketingmedico.vip/backend/public/api'; // URL directa en producción

const api = axios.create({
  baseURL: BASE_URL,
});

// ... el resto de tu código se mantiene igual
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

api.interceptors.request.use((config) => {
  const token = getCookie('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (userData) => {
    try {
      console.log('📤 Enviando datos al backend:', JSON.stringify(userData, null, 2));
      
      const response = await api.post('/register', userData);
      
      console.log('✅ Registro exitoso:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error COMPLETO del backend:');
      console.error('📝 Mensaje:', error.response?.data?.message);
      console.error('🔍 Errores específicos:', error.response?.data?.errors);
      console.error('📊 Status:', error.response?.status);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      
      if (response.data.token) {
        setCookie('token', response.data.token, 7);
        console.log('🍪 Token guardado en cookies:', response.data.token);
      } else {
        console.warn('⚠️ El backend no devolvió token');
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Error en login:', error.response?.data);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await api.delete('/logout');
      deleteCookie('token');
      console.log('🔓 Sesión cerrada, cookies eliminadas');
      return response.data;
    } catch (error) {
      deleteCookie('token');
      console.error('❌ Error en logout, pero cookies eliminadas:', error.response?.data);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      console.error('❌ Error al obtener perfil:', error.response?.data);
      throw error;
    }
  },

  checkCookies: () => {
    console.log('🔍 Revisando cookies:', document.cookie);
    console.log('🍪 Token en cookies:', getCookie('token'));
  }
};

export default api;