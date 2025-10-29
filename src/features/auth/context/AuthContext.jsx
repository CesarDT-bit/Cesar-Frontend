import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        user: action.payload.user,
        error: null 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: false, 
        error: action.payload 
      };
    case 'REGISTER_START':
      return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        user: action.payload.user,
        error: null 
      };
    case 'REGISTER_FAILURE':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: false, 
        error: action.payload 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null,
        error: null,
        loading: false
      };
    case 'SET_USER':
      return { 
        ...state, 
        isAuthenticated: true, 
        user: action.payload 
      };
    case 'CLEAR_AUTH_STATE':
      return { 
        ...state, 
        loading: false, 
        error: null 
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('🔍 Verificando autenticación...');
      
      // Verificar si hay token en cookies
      const token = document.cookie.includes('token');
      if (!token) {
        console.log('❌ No hay token en cookies');
        return;
      }

      // Obtener perfil del usuario
      const userProfile = await authService.getProfile();
      console.log('✅ Usuario autenticado:', userProfile);
      
      dispatch({ type: 'SET_USER', payload: userProfile });
    } catch (error) {
      console.log('❌ No hay usuario autenticado:', error.message);
      // No hacer nada, simplemente el usuario no está autenticado
    }
  };

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      console.log('🔐 Iniciando sesión...', credentials);
      
      const response = await authService.login(credentials);
      console.log('✅ Login exitoso:', response);
      
      // Obtener el perfil del usuario después del login
      const userProfile = await authService.getProfile();
      console.log('👤 Perfil obtenido:', userProfile);
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { user: userProfile, token: response.token }
      });
      
      return response;
    } catch (error) {
      console.error('❌ Error en login:', error);
      
      let errorMessage = 'Error al iniciar sesión';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        // Si hay errores de validación, mostrar el primero
        const firstError = Object.values(error.response.data.errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'REGISTER_START' });
    try {
      console.log('📝 Registrando usuario...', userData);
      
      const response = await authService.register(userData);
      console.log('✅ Registro exitoso:', response);
      
      // Después del registro, hacer login automáticamente
      if (response.token) {
        const userProfile = await authService.getProfile();
        
        dispatch({ 
          type: 'REGISTER_SUCCESS', 
          payload: { user: userProfile, token: response.token }
        });
      } else {
        // Si el registro no incluye login automático, solo mostrar éxito
        dispatch({ type: 'CLEAR_AUTH_STATE' });
      }
      
      return response;
    } catch (error) {
      console.error('❌ Error en registro:', error);
      
      let errorMessage = 'Error al registrar usuario';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        // Si hay errores de validación, mostrar el primero
        const firstError = Object.values(error.response.data.errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      dispatch({ type: 'REGISTER_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Cerrando sesión...');
      await authService.logout();
    } catch (error) {
      console.error('❌ Error en logout:', error);
      // Aún así continuar con el logout local
    } finally {
      dispatch({ type: 'LOGOUT' });
    }
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const clearAuthState = () => {
    dispatch({ type: 'CLEAR_AUTH_STATE' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    checkAuth,
    clearAuthState,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};