import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface NewsletterProps {
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  successTitle?: string;
  successDescription?: string;
  successAction?: string;
  loadingText?: string;
  errorText?: string;
}

export default function Newsletter({
  title = "Join the Frontier",
  description = "Get the latest updates on space-age engineering and interstellar design directly in your inbox.",
  buttonText = "Subscribe",
  placeholder = "enter your email...",
  successTitle = "Thank you",
  successDescription = "We will get back to you soon.",
  successAction = "Send another email",
  loadingText = "Sending...",
  errorText = "Something went wrong. Please try again."
}: NewsletterProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Spam protection

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    
    // If honeypot is filled, it's a bot
    if (honeypot) {
      console.log("Bot detected");
      return;
    }

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      if (email.includes("error")) {
        setStatus("error");
      } else {
        setStatus("success");
        setEmail("");
      }
    }, 1500);
  };

  return (
    <div className="relative group">
      {/* Background Glow */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-primary/50 to-blue-500/50 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-background border border-foreground/10 rounded-2xl p-8 md:p-12 overflow-hidden shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center space-y-4 py-4"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold">{successTitle}</h3>
              <p className="text-muted-foreground max-w-sm">
                {successDescription}
              </p>
              <button 
                onClick={() => setStatus("idle")}
                className="text-sm font-medium text-primary hover:underline"
              >
                {successAction}
              </button>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0, scale: 0.9 }}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 id="newsletter-island-title" className="text-3xl font-display font-bold mb-4">{title}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="relative">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot field (hidden from users) */}
                    <input
                      type="text"
                      name="b_name"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />
                    
                    <div className="relative">
                      <label htmlFor="newsletter-email-island" className="sr-only">
                        {placeholder}
                      </label>
                      <input
                        required
                        id="newsletter-email-island"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={placeholder}
                        aria-label={placeholder}
                        aria-labelledby="newsletter-island-title"
                        className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-foreground/30"
                      />
                      <Send className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20" />
                    </div>

                    <button
                      disabled={status === "loading"}
                      type="submit"
                      className="w-full group/btn relative overflow-hidden bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98] disabled:opacity-70"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        {status === "loading" ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>{loadingText}</span>
                          </>
                        ) : (
                          <>
                            <span>{buttonText}</span>
                            <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
                    </button>
                  </form>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-8 left-0 text-xs text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle size={12} />
                        {errorText}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
