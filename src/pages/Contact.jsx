import { useRef, useState } from 'react';
import { Mail, Facebook, Github, MapPin, CheckCircle, MessageSquare } from 'lucide-react';
import { Input, Textarea } from '../components/ui/Input';
import Button from '../components/ui/Button';
import PageHeader from '../components/layout/PageHeader';

function validate(fields) {
  const errors = {};
  if (!fields.name.trim())    errors.name    = 'Name is required.';
  if (!fields.email.trim())   errors.email   = 'Email is required.';
  else if (!/^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i.test(fields.email.trim()))
    errors.email = 'Enter a valid email address.';
  if (!fields.message.trim()) errors.message = 'Message cannot be empty.';
  else if (fields.message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters.';
  return errors;
}

export default function Contact() {
  const [fields, setFields] = useState({
    name: '', email: '', subject: '', message: '',
  });
  const [errors,     setErrors]     = useState({});
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const errorSummaryRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate(fields);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }
    setSubmitting(true);
    // Simulated send. Replace with EmailJS or a form backend in Phase 2.
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1000);
  }

  function resetForm() {
    setSubmitted(false);
    setFields({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  }

  return (
    <div className="bg-bg-light">

      <PageHeader
        eyebrow="Contact"
        title={<>Let’s start a <span className="text-primary">conversation.</span></>}
        description="Ask about membership, upcoming events, partnerships, or organization activities. Our student officers will point you in the right direction."
      />

      {/* Content */}
      <section className="content-shell py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.72fr_1.28fr]">

          {/* Contact info sidebar */}
          <div className="flex flex-col gap-6">
            <div className="rounded-[1.5rem] bg-white p-6 sm:p-7">
              <h2 className="mb-6 text-2xl">Contact info</h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Email</p>
                    <a
                      href="mailto:psits.ctu.main@gmail.com"
                      className="text-sm text-text-primary hover:text-primary transition-colors"
                    >
                      psits.ctu.main@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Location</p>
                    <p className="text-sm text-text-primary">
                      CCICT Building, CTU Main Campus, Cebu City
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-white p-6 sm:p-7">
              <h2 className="mb-6 text-2xl">Follow us</h2>
              <div className="flex flex-col gap-3">
                <a
                  href="https://facebook.com/psitsctu"
                  target="_blank" rel="noopener noreferrer"
                  className="group flex min-h-12 items-center gap-3 rounded-xl bg-bg-light p-3 hover:text-primary"
                >
                  <Facebook size={18} className="text-blue-600" />
                  <span className="text-sm text-text-primary group-hover:text-blue-600 transition-colors">
                    PSITS CTU Main
                  </span>
                </a>
                <a
                  href="https://github.com/psits-ctu-main"
                  target="_blank" rel="noopener noreferrer"
                  className="group flex min-h-12 items-center gap-3 rounded-xl bg-bg-light p-3 hover:text-primary"
                >
                  <Github size={18} className="text-text-primary" />
                  <span className="text-sm text-text-primary">psits-ctu-main</span>
                </a>
              </div>
            </div>
          </div>

          {/* Message form */}
          <div>
            <div className="rounded-[1.5rem] bg-white p-7 sm:p-9">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <CheckCircle size={52} className="text-primary" />
                  <h2 className="text-3xl">Message sent</h2>
                  <p className="text-text-muted max-w-sm">
                    Thanks for reaching out, <strong>{fields.name}</strong>. An officer will
                    reply to <strong>{fields.email}</strong> within 1-3 business days.
                  </p>
                  <button
                    onClick={resetForm}
                    className="text-sm text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <MessageSquare size={20} className="text-primary" />
                    <h2 className="text-3xl">Send a message</h2>
                  </div>
                  {Object.keys(errors).length > 0 && (
                    <div ref={errorSummaryRef} tabIndex="-1" role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                      <p className="font-bold">Review {Object.keys(errors).length} field{Object.keys(errors).length === 1 ? '' : 's'} before sending.</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {Object.entries(errors).map(([field, message]) => (
                          <li key={field}><a href={`#${field}`} className="underline underline-offset-2">{message}</a></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        id="name" name="name" label="Your Name" required
                        autoComplete="name"
                        placeholder="e.g. Juan dela Cruz" value={fields.name}
                        onChange={handleChange} error={errors.name}
                      />
                      <Input
                        id="email" name="email" type="email" label="Email Address" required
                        autoComplete="email"
                        placeholder="e.g. juan@ctu.edu.ph" value={fields.email}
                        onChange={handleChange} error={errors.email}
                      />
                    </div>
                    <Input
                      id="subject" name="subject" label="Subject"
                      placeholder="e.g. Event inquiry" value={fields.subject}
                      onChange={handleChange}
                    />
                    <Textarea
                      id="message" name="message" label="Message" required
                      placeholder="Write your message here…" rows={5}
                      value={fields.message} onChange={handleChange}
                      error={errors.message}
                    />
                    <Button
                      type="submit" variant="primary" size="lg"
                      disabled={submitting} className="w-full"
                    >
                      {submitting ? 'Sending…' : 'Send Message'}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
