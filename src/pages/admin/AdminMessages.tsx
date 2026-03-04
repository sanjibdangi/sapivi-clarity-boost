import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Mail, Clock } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  // FETCH MESSAGES FROM BACKEND
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3001/api/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  // AUTO LOAD
  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 5000); // refresh every 5 sec

    return () => clearInterval(interval);
  }, []);

  // DELETE MESSAGE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:3001/api/messages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMessages();
      setSelected(null);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-display">Messages</h1>
        <p className="text-muted-foreground mt-1">
          Contact form submissions ({messages.length})
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* MESSAGE LIST */}
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelected(msg)}
              className={`bg-card border rounded-2xl p-5 cursor-pointer transition-all ${selected?.id === msg.id
                  ? "border-primary shadow-md"
                  : "border-border hover:border-primary/30"
                }`}
            >
              <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground truncate">
                    {msg.name}
                  </h3>

                  <p className="text-sm text-primary truncate">
                    {msg.subject}
                  </p>

                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {msg.message}
                  </p>
                </div>

                <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(msg.id);
                    }}
                    className="p-1.5 hover:bg-destructive/10 text-destructive rounded-lg"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {messages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Mail size={48} className="mx-auto mb-4 opacity-30" />
              <p>No messages yet</p>
            </div>
          )}
        </div>

        {/* MESSAGE DETAIL */}
        <div>
          {selected ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card border border-border rounded-2xl p-6 sticky top-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">
                    {selected.name[0]}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    {selected.name}
                  </h3>

                  <a
                    href={`mailto:${selected.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {selected.email}
                  </a>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-1">Subject</p>
                <p className="font-medium text-foreground">
                  {selected.subject}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-1">Message</p>
                <p className="text-foreground leading-relaxed">
                  {selected.message}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Received: {new Date(selected.created_at).toLocaleString()}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold text-center hover:bg-primary/90 transition-all"
                >
                  Reply
                </a>

                <button
                  onClick={() => handleDelete(selected.id)}
                  className="px-4 py-2.5 bg-destructive/10 text-destructive rounded-xl text-sm font-semibold hover:bg-destructive/20 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground sticky top-24">
              <Mail size={48} className="mx-auto mb-4 opacity-30" />
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}