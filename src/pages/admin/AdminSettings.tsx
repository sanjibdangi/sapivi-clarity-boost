import { motion } from "framer-motion";
import { Database, Shield, Server } from "lucide-react";

export default function AdminSettings() {

  return (<div>

    ```
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-foreground font-display">
        Settings
      </h1>
      <p className="text-muted-foreground mt-1">
        Admin console configuration
      </p>
    </div>

    {/* API Status */}
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Server className="text-primary" size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground font-display">
            API Connection
          </h2>
          <p className="text-sm text-muted-foreground">
            Your admin panel is connected to the production API
          </p>
        </div>
      </div>

      <div className="bg-muted rounded-xl p-4 font-mono text-sm">
        https://api.sapivi.foxnutfusion.com/api
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        This endpoint is configured directly in the application for production.
      </p>
    </div>

    {/* Backend Guide */}
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
          <Database className="text-emerald-500" size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground font-display">
            Backend API Guide
          </h2>
          <p className="text-sm text-muted-foreground">
            Required endpoints for the SAPIVI admin panel
          </p>
        </div>
      </div>

      <div className="space-y-6 text-sm text-muted-foreground">

        <div>
          <h3 className="font-semibold text-foreground mb-2">
            Required API Endpoints
          </h3>

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
          <h3 className="font-semibold text-foreground mb-2">
            Enable CORS
          </h3>

          <p>
            Your backend must allow requests from:
          </p>

          <div className="bg-muted rounded-xl p-3 font-mono text-xs mt-2">
            https://sapivi.foxnutfusion.com
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">
            Authentication
          </h3>

          <div className="flex items-start gap-2">
            <Shield className="text-primary flex-shrink-0 mt-0.5" size={16} />

            <p>
              The login endpoint must return a JWT token.
              All other endpoints must validate:
              <code className="bg-muted px-2 py-0.5 rounded ml-1">
                Authorization: Bearer &lt;token&gt;
              </code>
            </p>
          </div>
        </div>

      </div>
    </div>

  </div>


  );
}
