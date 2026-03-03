import { useState } from "react";
import { Save } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminContact() {
  const [data, setData] = useState({
    email: "contact@sapivi.com",
    phone: "+91 80 1234 5678",
    address: "No:58, 5th Main Krishna Niwas, Halasahalli, Bangalore, Karnataka, India 560087",
    cin: "U72900KA2021PTC155725",
    businessHours: "Mon-Fri: 9AM - 6PM IST",
  });

  const handleSave = () => {
    alert("Contact info saved! (Connect your MySQL API to persist)");
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Contact Info</h1>
          <p className="text-muted-foreground mt-1">Edit contact details shown on the website</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90">
          <Save size={18} /> Save Changes
        </motion.button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
            <input type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Address</label>
          <textarea value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} rows={3} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">CIN</label>
            <input type="text" value={data.cin} onChange={(e) => setData({ ...data, cin: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Business Hours</label>
            <input type="text" value={data.businessHours} onChange={(e) => setData({ ...data, businessHours: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
