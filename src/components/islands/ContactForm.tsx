import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2, Send } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

interface ServiceOption {
  id: string;
  label: string;
  messageIntro: string;
  messageRequest: string;
}

interface Errors {
  [key: string]: string | undefined;
}

interface ContactFormLabels {
  name: string;
  email: string;
  service: string;
  message: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  servicePlaceholder: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  successTitle: string;
  successDescription: string;
  successAction: string;
  errorSubmit: string;
  requiredName: string;
  requiredEmail: string;
  invalidEmail: string;
  requiredMessage: string;
}

interface ContactFormProps {
  labels?: Partial<ContactFormLabels>;
  serviceOptions?: ServiceOption[];
  formName?: string;
  endpoint?: string;
}

const defaultLabels: ContactFormLabels = {
  name: 'Name',
  email: 'Email',
  service: 'I am interested in',
  message: 'Message',
  namePlaceholder: 'John Doe',
  emailPlaceholder: 'john@example.com',
  servicePlaceholder: 'Choose a topic',
  messagePlaceholder: 'How can we help you?',
  submit: 'Send Message',
  sending: 'Sending...',
  successTitle: 'Message Sent!',
  successDescription: "We'll get back to you as soon as possible.",
  successAction: 'Send another message',
  errorSubmit: 'Something went wrong. Please try again.',
  requiredName: 'Name is required',
  requiredEmail: 'Email is required',
  invalidEmail: 'Please enter a valid email address',
  requiredMessage: 'Message is required',
};

const encodeFormData = (data: Record<string, string>) => new URLSearchParams(data).toString();

const buildServiceMessage = (option: ServiceOption) => `${option.messageIntro}\n\n\n${option.messageRequest}`;

export default function ContactForm({ labels: labelOverrides, serviceOptions = [], formName = 'contact', endpoint = '/' }: ContactFormProps) {
  const labels = { ...defaultLabels, ...labelOverrides };
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const lastAutoMessageRef = useRef('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const applyService = (serviceId: string, focusMessageGap = false) => {
    const selectedOption = serviceOptions.find((option) => option.id === serviceId);

    setFormData((prev) => {
      if (!selectedOption) {
        return { ...prev, service: serviceId };
      }

      const autoMessage = buildServiceMessage(selectedOption);
      const shouldReplaceMessage = !prev.message.trim() || prev.message === lastAutoMessageRef.current;
      lastAutoMessageRef.current = autoMessage;

      return {
        ...prev,
        service: serviceId,
        message: shouldReplaceMessage ? autoMessage : prev.message,
      };
    });

    if (selectedOption && focusMessageGap) {
      const cursorPosition = selectedOption.messageIntro.length + 2;
      window.setTimeout(() => {
        messageRef.current?.focus();
        messageRef.current?.setSelectionRange(cursorPosition, cursorPosition);
      }, 0);
    }
  };

  useEffect(() => {
    const selectedService = new URLSearchParams(window.location.search).get('service');
    if (selectedService) {
      applyService(selectedService, true);
    }
  }, []);

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) {
      newErrors.name = labels.requiredName;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = labels.requiredEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = labels.invalidEmail;
    }

    if (!formData.message.trim()) {
      newErrors.message = labels.requiredMessage;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setStatus('submitting');
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({
          'form-name': formName,
          'bot-field': '',
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setStatus('success');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    if (id === 'service') {
      applyService(value);
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
    if (status === 'error') {
      setStatus('idle');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{labels.successTitle}</h3>
            <p className="text-muted-foreground">{labels.successDescription}</p>
            <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm text-primary dark:text-white hover:underline"
            >
                {labels.successAction}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            name={formName}
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >
            <input type="hidden" name="form-name" value={formName} />
            <div className="hidden" aria-hidden="true">
              <label htmlFor="bot-field">Do not fill this out</label>
              <input id="bot-field" name="bot-field" tabIndex={-1} />
            </div>

            {status === 'error' && (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500" role="alert">
                {labels.errorSubmit}
              </p>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">
                {labels.name} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 border outline-none transition-all placeholder:text-muted-foreground dark:placeholder:text-white/20 text-foreground dark:text-white
                  ${errors.name 
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                    : 'border-black/10 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary'
                  }`}
                placeholder={labels.namePlaceholder}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  {errors.name}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">
                {labels.email} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border outline-none transition-all placeholder:text-muted-foreground dark:placeholder:text-white/20
                  ${errors.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                    : 'border-black/10 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary'
                  }`}
                placeholder={labels.emailPlaceholder}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
               {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  {errors.email}
                </p>
              )}
            </div>

            {serviceOptions.length > 0 && (
              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2 text-muted-foreground">
                  {labels.service}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 outline-none transition-all text-foreground dark:text-white focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="">{labels.servicePlaceholder}</option>
                  {serviceOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground">
                {labels.message} <span className="text-red-500">*</span>
              </label>
              <textarea
                ref={messageRef}
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 border outline-none transition-all placeholder:text-muted-foreground dark:placeholder:text-white/20 text-foreground dark:text-white resize-none
                  ${errors.message 
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                    : 'border-black/10 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary'
                  }`}
                placeholder={labels.messagePlaceholder}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                   {labels.sending}
                </>
              ) : (
                <>
                  {labels.submit}
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
