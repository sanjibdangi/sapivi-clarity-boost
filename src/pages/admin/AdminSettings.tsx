import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Server, Database, Shield } from "lucide-react";
import { getApiBaseUrl, setApiBaseUrl } from "@/lib/api";

export default function AdminSettings() {
  const [apiUrl, setApiUrlState] = useState(getApiBaseUrl());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setApiBaseUrl(apiUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-display">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your admin console</p>
      </div>

      {/* API Configuration */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Server className="text-primary" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground font-display">API Configuration</h2>
            <p className="text-sm text-muted-foreground">Connect to your MySQL REST API</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">API Base URL</label>
            <input type="url" value={apiUrl} onChange={(e) => setApiUrlState(e.target.value)} placeholder="http://localhost:3001/api" className="w-full px-4 py-3 bg-muted border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
            <p className="text-xs text-muted-foreground mt-2">The base URL of your Node.js/Express MySQL REST API</p>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
            <Save size={18} />
            {saved ? "Saved ✓" : "Save Configuration"}
          </motion.button>
        </div>
      </div>

      {/* MySQL Setup Guide */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <Database className="text-emerald-500" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground font-display">MySQL Backend Setup Guide</h2>
            <p className="text-sm text-muted-foreground">How to set up your external API</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-muted-foreground">
          <div>
            <h3 className="font-semibold text-foreground mb-2">1. Create a Node.js REST API</h3>
            <p>Set up a Node.js/Express server with MySQL (e.g., using <code className="bg-muted px-2 py-0.5 rounded">mysql2</code> or <code className="bg-muted px-2 py-0.5 rounded">sequelize</code>).</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">2. Required Endpoints</h3>
            <div className="bg-muted rounded-xl p-4 font-mono text-xs space-y-1">
              <p>POST /api/auth/login</p>
              <p>GET  /api/content/hero</p>
              <p>PUT  /api/content/hero</p>
              <p>GET  /api/content/about</p>
              <p>PUT  /api/content/about</p>
              <p>GET  /api/content/services</p>
              <p>POST /api/content/services</p>
              <p>PUT  /api/content/services/:id</p>
              <p>DELETE /api/content/services/:id</p>
              <p>GET  /api/content/portfolio</p>
              <p>POST /api/content/portfolio</p>
              <p>PUT  /api/content/portfolio/:id</p>
              <p>DELETE /api/content/portfolio/:id</p>
              <p>GET  /api/content/clients</p>
              <p>GET  /api/content/contact</p>
              <p>PUT  /api/content/contact</p>
              <p>GET  /api/messages</p>
              <p>DELETE /api/messages/:id</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">3. Enable CORS</h3>
            <p>Add CORS headers to allow requests from this admin console.</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">4. Authentication</h3>
            <div className="flex items-start gap-2">
              <Shield className="text-primary flex-shrink-0 mt-0.5" size={16} />
              <p>The login endpoint should return a JWT token. All other endpoints should validate the <code className="bg-muted px-2 py-0.5 rounded">Authorization: Bearer &lt;token&gt;</code> header.</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">5. Hosting Options</h3>
            <p>Deploy your API on <strong>Railway</strong>, <strong>Render</strong>, <strong>DigitalOcean</strong>, <strong>AWS</strong>, or any server that supports Node.js + MySQL.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
