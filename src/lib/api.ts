import axios from "axios";

// Production API URL
const BASE_URL = "https://api.sapivi.foxnutfusion.com/api";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response error handler
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "API request failed";


    return Promise.reject(new Error(message));


  }
);

export const adminApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }).then((r) => r.data),

  register: (name: string, email: string, password: string) =>
    api.post("/auth/register", { name, email, password }).then((r) => r.data),

  getHero: () => api.get("/content/hero").then((r) => r.data),
  updateHero: (data: any) => api.put("/content/hero", data).then((r) => r.data),

  getAbout: () => api.get("/content/about").then((r) => r.data),
  updateAbout: (data: any) => api.put("/content/about", data).then((r) => r.data),

  getServices: () => api.get("/content/services").then((r) => r.data),
  createService: (data: any) => api.post("/content/services", data).then((r) => r.data),
  updateService: (id: string, data: any) =>
    api.put(`/content/services/${id}`, data).then((r) => r.data),
  deleteService: (id: string) =>
    api.delete(`/content/services/${id}`).then((r) => r.data),

  getPortfolio: () => api.get("/content/portfolio").then((r) => r.data),
  createPortfolio: (data: any) =>
    api.post("/content/portfolio", data).then((r) => r.data),
  updatePortfolio: (id: string, data: any) =>
    api.put(`/content/portfolio/${id}`, data).then((r) => r.data),
  deletePortfolio: (id: string) =>
    api.delete(`/content/portfolio/${id}`).then((r) => r.data),

  getContactInfo: () => api.get("/content/contact").then((r) => r.data),
  updateContactInfo: (data: any) =>
    api.put("/content/contact", data).then((r) => r.data),

  getMessages: () => api.get("/messages").then((r) => r.data),
  submitMessage: (data: any) => api.post("/contact", data).then((r) => r.data),
  deleteMessage: (id: string) =>
    api.delete(`/messages/${id}`).then((r) => r.data),

  getClients: () => api.get("/content/clients").then((r) => r.data),
  createClient: (data: any) =>
    api.post("/content/clients", data).then((r) => r.data),
  updateClient: (id: string, data: any) =>
    api.put(`/content/clients/${id}`, data).then((r) => r.data),
  deleteClient: (id: string) =>
    api.delete(`/content/clients/${id}`).then((r) => r.data),
};

export default api;
