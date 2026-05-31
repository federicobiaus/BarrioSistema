import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// 1. Instancia para personas, accesos, reclamos, etc. (Incluye /api automáticamente)
export const api = axios.create({
  baseURL: `${baseURL}/api`,
});

// 2. Instancia exclusiva para el Login / Autenticación (Sin /api)
export const authApi = axios.create({
  baseURL: baseURL, 
});

// INTERCEPTOR DE PETICIÓN (REQUEST)
// Agrega el token de autorización si el usuario está en el navegador
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// INTERCEPTOR DE RESPUESTA (RESPONSE)
// Si el servidor devuelve 401 (No autorizado), limpia la sesión y redirige al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

// Exportamos 'api' por defecto para mantener compatibilidad con tus archivos actuales
export default api;