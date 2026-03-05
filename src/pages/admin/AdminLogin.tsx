import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { adminApi } from "@/lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);


    try {
      const res = await adminApi.login(email, password);

      localStorage.setItem("admin_token", res.token);
      localStorage.setItem("admin_user", JSON.stringify(res.user));

      navigate("/admin/dashboard");

    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }

  };

  return (<div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 flex items-center justify-center px-4"> <div className="absolute inset-0 mesh-gradient opacity-30" />


    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-md"
    >
      <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-10">

        {/* LOGO */}
        <div className="text-center mb-6">
          <motion.img
            src="/logo.png"
            alt="SAPIVI Logo"
            className="h-20 mx-auto mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          <h1 className="text-3xl font-bold text-foreground font-display">
            Admin Console
          </h1>

          <p className="text-muted-foreground mt-2">
            Sign in to manage your website
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Email
            </label>

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@sapivi.com"
                className="w-full pl-12 pr-4 py-3 bg-muted border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-muted border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

      </div>
    </motion.div>
  </div>


  );
}