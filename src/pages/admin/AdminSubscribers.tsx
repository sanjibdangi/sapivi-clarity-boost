import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Mail, Clock, Loader2, Users } from "lucide-react";
import { adminApi } from "@/lib/api";
import { toast } from "sonner";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = () => {
    adminApi.getSubscribers()
      .then((data) => { if (Array.isArray(data)) setSubscribers(data); else setSubscribers([]); })
      .catch(() => toast.error("Failed to fetch subscribers"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this subscriber?")) return;
    try {
      await adminApi.deleteSubscriber(id);
      toast.success("Subscriber removed");
      fetchSubscribers();
    } catch { toast.error("Delete failed"); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-display">Subscribers</h1>
        <p className="text-muted-foreground mt-1">Newsletter subscribers ({subscribers.length})</p>
      </div>

      {subscribers.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-2xl">
          <Users size={48} className="mx-auto mb-4 opacity-30" />
          <p>No subscribers yet</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-3 bg-muted text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
            <span>Email</span>
            <span>Subscribed</span>
            <span>Action</span>
          </div>
          {subscribers.map((sub, index) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="grid grid-cols-[1fr_auto_auto] gap-4 items-center px-6 py-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-primary" />
                </div>
                <span className="text-foreground font-medium truncate">{sub.email}</span>
              </div>
              <span className="text-sm text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                <Clock size={12} />
                {new Date(sub.created_at).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleDelete(sub.id)}
                className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
