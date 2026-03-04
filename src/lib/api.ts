// API service layer for external MySQL backend
// Configure the BASE_URL to point to your external REST API

import axios from "axios";

const getBaseUrl = () =>
  localStorage.getItem("admin_api_url") || "http://localhost:3001/api";

export function setApiBaseUrl(url: string) {
  localStorage.setItem("admin_api_url", url);
}

export function getApiBaseUrl() {
  return getBaseUrl();
}

// Create axios instance
const api = axios.create({
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to attach token & base URL dynamically
api.interceptors.request.use((config) => {
  config.baseURL = getBaseUrl();
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "API request failed";
    return Promise.reject(new Error(message));
  }
);

// Auth & Content APIs
export const adminApi = {
  // Auth
  login: (email: string, password: string) =>
    api
      .post<{ token: string; user: { id: string; email: string; name: string } }>(
        "/auth/login",
        { email, password }
      )
      .then((r) => r.data),

  register: (name: string, email: string, password: string) =>
    api
      .post<{ token: string; user: { id: string; email: string; name: string } }>(
        "/auth/register",
        { name, email, password }
      )
      .then((r) => r.data),

  // Hero Section
  getHero: () => api.get("/content/hero").then((r) => r.data),
  updateHero: (data: any) => api.put("/content/hero", data).then((r) => r.data),

  // About Section
  getAbout: () => api.get("/content/about").then((r) => r.data),
  updateAbout: (data: any) => api.put("/content/about", data).then((r) => r.data),

  // Services
  getServices: () => api.get<any[]>("/content/services").then((r) => r.data),
  createService: (data: any) => api.post("/content/services", data).then((r) => r.data),
  updateService: (id: string, data: any) =>
    api.put(`/content/services/${id}`, data).then((r) => r.data),
  deleteService: (id: string) =>
    api.delete(`/content/services/${id}`).then((r) => r.data),

  // Portfolio
  getPortfolio: () => api.get<any[]>("/content/portfolio").then((r) => r.data),
  createPortfolio: (data: any) =>
    api.post("/content/portfolio", data).then((r) => r.data),
  updatePortfolio: (id: string, data: any) =>
    api.put(`/content/portfolio/${id}`, data).then((r) => r.data),
  deletePortfolio: (id: string) =>
    api.delete(`/content/portfolio/${id}`).then((r) => r.data),

  // Contact Info
  getContactInfo: () => api.get("/content/contact").then((r) => r.data),
  updateContactInfo: (data: any) =>
    api.put("/content/contact", data).then((r) => r.data),

  // Contact Messages
  getMessages: () => api.get<any[]>("/messages").then((r) => r.data),
  submitMessage: (data: any) => api.post("/contact", data).then((r) => r.data),
  deleteMessage: (id: string) =>
    api.delete(`/messages/${id}`).then((r) => r.data),

  // Clients
  getClients: () => api.get<any[]>("/content/clients").then((r) => r.data),
  createClient: (data: any) =>
    api.post("/content/clients", data).then((r) => r.data),
  updateClient: (id: string, data: any) =>
    api.put(`/content/clients/${id}`, data).then((r) => r.data),
  deleteClient: (id: string) =>
    api.delete(`/content/clients/${id}`).then((r) => r.data),
};

export default api;
