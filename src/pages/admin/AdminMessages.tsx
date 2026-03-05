import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Mail, Clock, Loader2, Phone, CheckCircle, Circle } from "lucide-react";
import { adminApi } from "@/lib/api";
import { toast } from "sonner";

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    adminApi.getMessages()
      .then((data) => { if (Array.isArray(data)) setMessages(data); else setMessages([]); })
      .catch(() => toast.error("Failed to fetch messages"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await adminApi.deleteMessage(id);
      toast.success("Message deleted");
      fetchMessages();
      if (selected?.id === id) setSelected(null);
    } catch { toast.error("Delete failed"); }
  };

  const handleToggleRead = async (msg: Message) => {
    try {
      await adminApi.markMessageRead(msg.id, !msg.is_read);
      toast.success(msg.is_read ? "Marked as unread" : "Marked as read");
      fetchMessages();
      if (selected?.id === msg.id) setSelected({ ...msg, is_read: !msg.is_read });
    } catch { toast.error("Failed to update"); }
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-display">Messages</h1>
        <p className="text-muted-foreground mt-1">
          Contact form submissions ({messages.length}) · {unreadCount} unread · auto-refreshes every 5s
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <motion.div key={msg.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} onClick={() => setSelected(msg)} className={`bg-card border rounded-2xl p-5 cursor-pointer transition-all ${selected?.id === msg.id ? "border-primary shadow-md" : "border-border hover:border-primary/30"} ${!msg.is_read ? "border-l-4 border-l-primary" : ""}`}>
              <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {!msg.is_read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                    <h3 className="font-semibold text-foreground truncate">{msg.name}</h3>
                  </div>
                  <p className="text-sm text-primary truncate">{msg.subject}</p>
                  {msg.phone && <p className="text-xs text-muted-foreground truncate">📞 {msg.phone}</p>}
                  <p className="text-xs text-muted-foreground mt-1 truncate">{msg.message}</p>
                </div>
                <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} />{new Date(msg.created_at).toLocaleDateString()}</span>
                  <button onClick={(e) => { e.stopPropagation(); handleToggleRead(msg); }} className="p-1.5 hover:bg-primary/10 text-primary rounded-lg" title={msg.is_read ? "Mark unread" : "Mark read"}>
                    {msg.is_read ? <CheckCircle size={14} /> : <Circle size={14} />}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }} className="p-1.5 hover:bg-destructive/10 text-destructive rounded-lg"><Trash2 size={14} /></button>
                </div>
              </div>
            </motion.div>
          ))}
          {messages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground"><Mail size={48} className="mx-auto mb-4 opacity-30" /><p>No messages yet</p></div>
          )}
        </div>

        <div>
          {selected ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"><span className="text-primary font-bold">{selected.name[0]}</span></div>
                <div>
                  <h3 className="font-semibold text-foreground">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">{selected.email}</a>
                  {selected.phone && <p className="text-sm text-muted-foreground flex items-center gap-1"><Phone size={12} /> {selected.phone}</p>}
                </div>
              </div>
              <div className="mb-4"><p className="text-xs text-muted-foreground mb-1">Subject</p><p className="font-medium text-foreground">{selected.subject}</p></div>
              <div className="mb-4"><p className="text-xs text-muted-foreground mb-1">Message</p><p className="text-foreground leading-relaxed">{selected.message}</p></div>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-xs text-muted-foreground">Received: {new Date(selected.created_at).toLocaleString()}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${selected.is_read ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                  {selected.is_read ? "Read" : "Unread"}
                </span>
              </div>
              <div className="mt-6 flex gap-3">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold text-center hover:bg-primary/90 transition-all">Reply</a>
                <button onClick={() => handleToggleRead(selected)} className="px-4 py-2.5 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-all">
                  {selected.is_read ? "Mark Unread" : "Mark Read"}
                </button>
                <button onClick={() => handleDelete(selected.id)} className="px-4 py-2.5 bg-destructive/10 text-destructive rounded-xl text-sm font-semibold hover:bg-destructive/20 transition-all">Delete</button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground sticky top-24"><Mail size={48} className="mx-auto mb-4 opacity-30" /><p>Select a message to view details</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
