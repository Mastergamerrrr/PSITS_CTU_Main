import { useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Facebook,
  Github,
  Info,
  Mail,
  MapPin,
  MessageSquare,
  Send,
} from 'lucide-react';
import { Input, Textarea } from '../components/ui/Input';
import Button from '../components/ui/Button';
import ContentHero from '../components/content/ContentHero';
import ScrollReveal from '../components/ui/ScrollReveal';

const INQUIRIES = [
  { value: 'general', label: 'General question', subject: 'General inquiry' },
  { value: 'membership', label: 'Membership', subject: 'Membership inquiry' },
  { value: 'event', label: 'Event concern', subject: 'Event inquiry' },
  { value: 'partnership', label: 'Partnership', subject: 'Partnership inquiry' },
  { value: 'resource', label: 'Resource request', subject: 'Resource request' },
];

const FAQS = [
  {
    question: 'Who can join PSITS-CTU Main?',
    answer: 'Membership is intended for students under CCICT at Cebu Technological University Main Campus. Visit the Membership page for the current registration details.',
  },
  {
    question: 'Where can I register for an event?',
    answer: 'Open the Events page, choose an upcoming activity, and follow the registration instructions shown on its detail page.',
  },
  {
    question: 'Can an organization propose a partnership?',
    answer: 'Yes. Select Partnership in the inquiry form and include your organization, proposed activity, and preferred contact details.',
  },
  {
    question: 'How do I request workshop materials?',
    answer: 'Check the Resources page first. If a file is not yet available, select Resource request and tell us which workshop you attended.',
  },
];

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Name is required.';
  if (!fields.email.trim()) errors.email = 'Email is required.';
  else if (!/^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i.test(fields.email.trim())) errors.email = 'Enter a valid email address.';
  if (!fields.message.trim()) errors.message = 'Message cannot be empty.';
  else if (fields.message.trim().length < 20) errors.message = 'Message must be at least 20 characters.';
  return errors;
}

function ContactPromise() {
  return (
    <div className="rounded-[1.5rem] bg-bg-dark p-7 text-white sm:p-8">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
        <MessageSquare size={22} aria-hidden="true" />
      </span>
      <h2 className="mt-8 max-w-md text-3xl text-white">Start with the right channel</h2>
      <p className="mt-3 max-w-lg leading-7 text-blue-100">
        Choose your inquiry type and give the officers the context they need to help.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/10 p-4">
          <Mail size={18} className="text-blue-100" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-white">Official email</p>
          <p className="mt-1 break-all text-xs leading-5 text-blue-100">psits.ctu.main@gmail.com</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <MapPin size={18} className="text-blue-100" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-white">Main Campus</p>
          <p className="mt-1 text-xs leading-5 text-blue-100">CCICT Building, Cebu City</p>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const [inquiry, setInquiry] = useState('general');
  const [fields, setFields] = useState({
    name: '',
    email: '',
    subject: INQUIRIES[0].subject,
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const errorSummaryRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFields((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: undefined }));
  }

  function handleInquiryChange(event) {
    const nextValue = event.target.value;
    const previousDefault = INQUIRIES.find((item) => item.value === inquiry)?.subject;
    const nextDefault = INQUIRIES.find((item) => item.value === nextValue)?.subject || '';
    setInquiry(nextValue);
    setFields((previous) => ({
      ...previous,
      subject: !previous.subject || previous.subject === previousDefault ? nextDefault : previous.subject,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = validate(fields);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  }

  function resetForm() {
    setInquiry('general');
    setSubmitted(false);
    setFields({ name: '', email: '', subject: INQUIRIES[0].subject, message: '' });
    setErrors({});
  }

  return (
    <div className="bg-bg-light">
      <ContentHero
        eyebrow="Contact PSITS"
        title={<>Let us point you <span className="text-primary">forward.</span></>}
        description="Ask about membership, events, resources, partnerships, or organization activities through the right channel."
        actions={(
          <>
            <a href="#contact-form" className="interactive-lift inline-flex min-h-11 items-center rounded-[1.5rem] bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover">
              Send an inquiry
            </a>
            <a href="mailto:psits.ctu.main@gmail.com" className="inline-flex min-h-11 items-center gap-2 rounded-[1.5rem] border border-primary-neutral bg-white px-5 text-sm font-semibold text-text-primary hover:border-primary hover:text-primary">
              <Mail size={17} aria-hidden="true" /> Email directly
            </a>
          </>
        )}
        visual={<ContactPromise />}
      />

      <section className="content-shell py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
          <ScrollReveal className="space-y-5">
            <section className="rounded-[1.5rem] bg-white p-6 sm:p-7" aria-labelledby="contact-details-title">
              <h2 id="contact-details-title" className="text-2xl">Official channels</h2>
              <div className="mt-6 grid gap-5">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-bg-light text-primary"><Mail size={18} /></span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Email</p>
                    <a href="mailto:psits.ctu.main@gmail.com" className="mt-1 block break-all text-sm text-text-muted hover:text-primary">psits.ctu.main@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-bg-light text-primary"><MapPin size={18} /></span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Location</p>
                    <p className="mt-1 text-sm leading-6 text-text-muted">CCICT Building, CTU Main Campus, Cebu City</p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Cebu+Technological+University+Main+Campus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
                    >
                      Open campus map <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[1.5rem] bg-white p-6 sm:p-7" aria-labelledby="social-title">
              <h2 id="social-title" className="text-2xl">Follow official updates</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <a href="https://facebook.com/psitsctu" target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center gap-3 rounded-2xl bg-bg-light px-4 font-semibold text-text-primary hover:text-primary">
                  <Facebook size={19} aria-hidden="true" /> Facebook <ArrowRight size={15} className="ml-auto" />
                </a>
                <a href="https://github.com/psits-ctu-main" target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center gap-3 rounded-2xl bg-bg-light px-4 font-semibold text-text-primary hover:text-primary">
                  <Github size={19} aria-hidden="true" /> GitHub <ArrowRight size={15} className="ml-auto" />
                </a>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <section id="contact-form" className="scroll-mt-28 rounded-[1.5rem] bg-white p-6 sm:p-8 lg:p-9" aria-labelledby="message-title">
              {submitted ? (
                <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-blue-50 text-primary"><CheckCircle2 size={32} /></span>
                  <h2 className="mt-6 text-3xl">Form preview complete</h2>
                  <p className="mt-3 max-w-md leading-7 text-text-body">
                    Your form passed validation, but no message was sent because the contact backend is not connected yet.
                  </p>
                  <a href={`mailto:psits.ctu.main@gmail.com?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(fields.message)}`} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-[1.5rem] bg-primary px-5 font-semibold text-white hover:bg-primary-hover">
                    Continue in email <Mail size={16} />
                  </a>
                  <button type="button" onClick={resetForm} className="mt-3 min-h-11 text-sm font-semibold text-primary hover:text-primary-hover">
                    Start another inquiry
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-bg-light text-primary"><Send size={18} /></span>
                    <div>
                      <h2 id="message-title" className="text-3xl">Send an inquiry</h2>
                      <p className="mt-2 text-sm leading-6 text-text-muted">Required fields are marked with an asterisk.</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary-neutral bg-bg-light p-4 text-sm leading-6 text-text-body">
                    <Info size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                    <p>This is currently an interface prototype. Use the direct email option for messages that must reach an officer.</p>
                  </div>

                  {Object.keys(errors).length > 0 && (
                    <div ref={errorSummaryRef} tabIndex="-1" role="alert" className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                      <p className="font-bold">Review {Object.keys(errors).length} field{Object.keys(errors).length === 1 ? '' : 's'} before continuing.</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {Object.entries(errors).map(([field, message]) => (
                          <li key={field}><a href={`#${field}`} className="underline underline-offset-2">{message}</a></li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="mt-7 grid gap-5">
                    <div className="grid gap-2">
                      <label htmlFor="inquiry-type" className="text-sm font-semibold text-text-primary">What can we help with?</label>
                      <div className="relative">
                        <select
                          id="inquiry-type"
                          value={inquiry}
                          onChange={handleInquiryChange}
                          className="min-h-12 w-full appearance-none rounded-xl border border-primary-neutral bg-white px-4 py-3 pr-10 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                          {INQUIRIES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </select>
                        <ChevronDown size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input id="name" name="name" label="Your name" required autoComplete="name" placeholder="e.g. Juan dela Cruz" value={fields.name} onChange={handleChange} error={errors.name} />
                      <Input id="email" name="email" type="email" label="Email address" required autoComplete="email" placeholder="e.g. juan@ctu.edu.ph" value={fields.email} onChange={handleChange} error={errors.email} />
                    </div>
                    <Input id="subject" name="subject" label="Subject" value={fields.subject} onChange={handleChange} />
                    <Textarea id="message" name="message" label="Message" required placeholder="Include the details an officer will need to help." rows={6} value={fields.message} onChange={handleChange} error={errors.message} hint="Please include the event or resource name when relevant." />
                    <Button type="submit" variant="primary" size="lg" disabled={submitting} className="w-full sm:w-fit sm:min-w-48">
                      {submitting ? 'Checking form...' : 'Review inquiry'}
                    </Button>
                  </form>
                </>
              )}
            </section>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="content-shell grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14">
          <div>
            <h2 className="text-3xl sm:text-4xl">Quick answers</h2>
            <p className="mt-3 leading-7 text-text-body">Check these common questions before sending an inquiry.</p>
          </div>
          <div className="divide-y divide-primary-neutral/70 border-y border-primary-neutral/70">
            {FAQS.map((item) => (
              <details key={item.question} className="group py-1">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-3 font-semibold text-text-primary">
                  {item.question}
                  <ChevronDown size={18} className="shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="max-w-2xl pb-5 pr-10 text-sm leading-7 text-text-body">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
