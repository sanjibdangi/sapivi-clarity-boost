// API service layer for external MySQL backend
// Configure the BASE_URL to point to your external REST API

const BASE_URL = localStorage.getItem("admin_api_url") || "http://localhost:3001/api";

export function setApiBaseUrl(url: string) {
  localStorage.setItem("admin_api_url", url);
}

export function getApiBaseUrl() {
  return localStorage.getItem("admin_api_url") || "http://localhost:3001/api";
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${getApiBaseUrl()}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "API request failed");
  }

  return res.json();
}

// Auth
export const adminApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: { id: string; email: string; name: string } }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // Hero Section
  getHero: () => request<any>("/content/hero"),
  updateHero: (data: any) =>
    request("/content/hero", { method: "PUT", body: JSON.stringify(data) }),

  // About Section
  getAbout: () => request<any>("/content/about"),
  updateAbout: (data: any) =>
    request("/content/about", { method: "PUT", body: JSON.stringify(data) }),

  // Services
  getServices: () => request<any[]>("/content/services"),
  updateService: (id: string, data: any) =>
    request(`/content/services/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  createService: (data: any) =>
    request("/content/services", { method: "POST", body: JSON.stringify(data) }),
  deleteService: (id: string) =>
    request(`/content/services/${id}`, { method: "DELETE" }),

  // Portfolio
  getPortfolio: () => request<any[]>("/content/portfolio"),
  updatePortfolio: (id: string, data: any) =>
    request(`/content/portfolio/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  createPortfolio: (data: any) =>
    request("/content/portfolio", { method: "POST", body: JSON.stringify(data) }),
  deletePortfolio: (id: string) =>
    request(`/content/portfolio/${id}`, { method: "DELETE" }),

  // Contact Info
  getContactInfo: () => request<any>("/content/contact"),
  updateContactInfo: (data: any) =>
    request("/content/contact", { method: "PUT", body: JSON.stringify(data) }),

  // Contact Messages
  getMessages: () => request<any[]>("/messages"),
  deleteMessage: (id: string) =>
    request(`/messages/${id}`, { method: "DELETE" }),

  // Clients
  getClients: () => request<any[]>("/content/clients"),
  updateClient: (id: string, data: any) =>
    request(`/content/clients/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  createClient: (data: any) =>
    request("/content/clients", { method: "POST", body: JSON.stringify(data) }),
  deleteClient: (id: string) =>
    request(`/content/clients/${id}`, { method: "DELETE" }),
};
