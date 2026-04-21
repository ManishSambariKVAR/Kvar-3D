import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
        if (!form.message.trim()) errs.message = 'Message is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setForm({ name: '', email: '', phone: '', message: '' });
        }, 4000);
    };

    const inputClass = (field: string) =>
        `w-full px-5 py-4 bg-surface-2 border rounded-2xl text-heading placeholder:text-muted/60
     text-sm transition-all duration-300 outline-none shadow-sm shadow-black/5
     ${errors[field]
            ? 'border-warning focus:border-warning'
            : 'border-border focus:border-accent focus:ring-1 focus:ring-accent'
        }`;

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={56} className="text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-heading mb-2">Message Sent!</h3>
                <p className="text-sm text-muted">We'll get back to you within 24 hours.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass('name')}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <input
                        type="email"
                        placeholder="Email Address *"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass('email')}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                </div>
                <div>
                    <input
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass('phone')}
                    />
                </div>
            </div>

            <div>
                <textarea
                    rows={4}
                    placeholder="Your Message *"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass('message')} resize-none`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1 ml-1">{errors.message}</p>}
            </div>

            <button
                type="submit"
                className="w-full btn-primary !rounded-2xl !py-4"
            >
                <Send size={18} />
                Send Message
            </button>
        </form>
    );
}
