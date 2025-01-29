import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

// Initialize EmailJS with the public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    project: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Log environment variables in development
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('EmailJS Config:', {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      });
    }
  }, []);

  const handleClose = () => {
    window.location.hash = '';
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format the number as (XXX) XXX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    if (id === 'phone') {
      // Only update if we haven't reached max length (10 digits)
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 10) {
        setFormData(prev => ({
          ...prev,
          [id]: formatPhoneNumber(value)
        }));
      }
    } else if (id === 'name') {
      // Only allow letters and spaces
      const validName = value.replace(/[^A-Za-z\s]/g, '');
      setFormData(prev => ({
        ...prev,
        [id]: validName
      }));
    } else if (id === 'project') {
      // Allow letters, numbers, spaces, periods, and common punctuation
      const validText = value.replace(/[^A-Za-z0-9\s.,!?()-]/g, '');
      setFormData(prev => ({
        ...prev,
        [id]: validText
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate name (at least 2 characters, only letters and spaces)
    if (!formData.name.trim() || formData.name.length < 2 || !/^[A-Za-z\s]+$/.test(formData.name)) {
      setSubmitStatus('error');
      return;
    }
    
    // Validate phone number
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      setSubmitStatus('error');
      return;
    }
    
    // Validate project details (at least 10 characters)
    if (!formData.project.trim() || formData.project.length < 10) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!serviceId || !templateId) {
        throw new Error('EmailJS configuration is missing');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          customer_name: formData.name,
          customer_phone: formData.phone,
          project_details: formData.project,
        }
      );

      setSubmitStatus('success');
      setFormData({ name: '', phone: '', project: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900/70 backdrop-blur-sm rounded-lg border border-white/10 shadow-xl p-4 sm:p-8">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 sm:right-4 sm:top-4 text-white hover:bg-white/10"
        onClick={handleClose}
      >
        <X className="h-5 w-5" />
      </Button>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-['Barlow_Semi_Condensed']">
            Request a Free Quote
          </h1>
          <p className="text-white/80 text-sm">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              id="name"
              placeholder="John Smith"
              required
              pattern="^[A-Za-z\s]+$"
              title="Please enter a valid name (letters only)"
              minLength={2}
              maxLength={50}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              value={formData.name}
              onChange={handleChange}
            />
            <p className="text-white/60 text-xs">Letters only, 2-50 characters</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">Phone</Label>
            <Input
              id="phone"
              placeholder="(806) 555-0123"
              required
              type="tel"
              pattern="^\(\d{3}\) \d{3}-\d{4}$"
              title="Please enter a valid phone number in the format: (XXX) XXX-XXXX"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              value={formData.phone}
              onChange={handleChange}
            />
            <p className="text-white/60 text-xs">Format: (XXX) XXX-XXXX</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="project" className="text-white">Project Details</Label>
            <Textarea
              id="project"
              placeholder="Tell us about your fencing project..."
              required
              minLength={10}
              maxLength={800}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
              value={formData.project}
              onChange={handleChange}
            />
            <p className="text-white/60 text-xs">
              Letters, numbers, and basic punctuation only. 10-800 characters (about 4 paragraphs).
            </p>
          </div>
          {submitStatus === 'success' && (
            <p className="text-green-400 text-sm text-center">
              Quote request sent successfully! We'll be in touch soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-400 text-sm text-center">
              Failed to send quote request. Please ensure all fields are filled out correctly.
            </p>
          )}
          <Button 
            type="submit" 
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-['Barlow_Semi_Condensed'] font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit Quote Request'}
          </Button>
        </div>
      </form>
    </div>
  );
} 