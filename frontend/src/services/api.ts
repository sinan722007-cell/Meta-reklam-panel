import axios, { AxiosError } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  register: (email: string, username: string, password: string) =>
    apiClient.post('/auth/register', { email, username, password }),

  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),

  getMe: () =>
    apiClient.get('/auth/me'),

  connectMeta: (accessToken: string, businessAccountId: string) =>
    apiClient.post('/auth/meta-connect', { accessToken, businessAccountId }),

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },
};

// Campaign Services
export const campaignService = {
  list: (page = 1, limit = 10, status?: string) =>
    apiClient.get('/campaigns', { params: { page, limit, status } }),

  get: (id: string) =>
    apiClient.get(`/campaigns/${id}`),

  create: (data: any) =>
    apiClient.post('/campaigns', data),

  update: (id: string, data: any) =>
    apiClient.put(`/campaigns/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/campaigns/${id}`),
};

// Analytics Services
export const analyticsService = {
  get: (campaignId: string, startDate?: string, endDate?: string) =>
    apiClient.get('/analytics', { 
      params: { 
        campaign_id: campaignId,
        start_date: startDate,
        end_date: endDate,
      } 
    }),
};

export default apiClient;
