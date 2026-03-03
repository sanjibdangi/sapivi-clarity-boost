import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Server, Eye, EyeOff } from "lucide-react";
import { adminApi, setApiBaseUrl, getApiBaseUrl } from "@/lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiUrl, setApiUrl] = useState(getApiBaseUrl());
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      setApiBaseUrl(apiUrl);
      const res = await adminApi.login(email, password);
      localStorage.setItem("admin_token", res.token);
      localStorage.setItem("admin_user", JSON.stringify(res.user));
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Check your API URL and credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 flex items-center justify-center px-4">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="text-primary-foreground" size={28} />
            </div>
            <h1 className="text-3xl font-bold text-foreground font-display">Admin Console</h1>
            <p className="text-muted-foreground mt-2">Sign in to manage your website</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-xl text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@sapivi.com" className="w-full pl-12 pr-4 py-3 bg-muted border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full pl-12 pr-12 py-3 bg-muted border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* API Config Toggle */}
          <div className="mt-6 pt-6 border-t border-border">
            <button onClick={() => setShowApiConfig(!showApiConfig)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full">
              <Server size={16} />
              <span>Configure API Endpoint</span>
            </button>
            {showApiConfig && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3">
                <input type="url" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} placeholder="http://localhost:3001/api" className="w-full px-4 py-3 bg-muted border-2 border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                <p className="text-xs text-muted-foreground mt-2">Enter your MySQL REST API base URL</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
