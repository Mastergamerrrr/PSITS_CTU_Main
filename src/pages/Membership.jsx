import { useRef, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import Button from '../components/ui/Button';
import PageHeader from '../components/layout/PageHeader';

const COURSES = [
  'BSIT - BS Information Technology',
  'BSCS - BS Computer Science',
  'BSIS - BS Information Systems',
  'BSEMC - BS Entertainment & Multimedia Computing',
  'ACT - Associate in Computer Technology',
];

const YEAR_LEVELS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

// Client-side validation rules
function validate(fields) {
  const errors = {};
  if (!fields.firstName.trim())  errors.firstName  = 'First name is required.';
  if (!fields.lastName.trim())   errors.lastName   = 'Last name is required.';
  if (!fields.studentId.trim())  errors.studentId  = 'Student ID is required.';
  else if (!/^\d{2}-\d{4}-\d{3,6}$/.test(fields.studentId.trim()))
    errors.studentId = 'Use format: 22-1234-12345';
  if (!fields.course)            errors.course     = 'Please select your course.';
  if (!fields.yearLevel)         errors.yearLevel  = 'Please select your year level.';
  if (!fields.email.trim())      errors.email      = 'Email address is required.';
  else if (!/^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i.test(fields.email.trim()))
    errors.email = 'Enter a valid email address.';
  if (fields.phone && !/^(09|\+639)\d{9}$/.test(fields.phone.replace(/\s/g, '')))
    errors.phone = 'Enter a valid PH number (e.g. 09171234567).';
  return errors;
}

export default function Membership() {
  const [fields, setFields] = useState({
    firstName: '', lastName: '', studentId: '',
    course: '', yearLevel: '', email: '', phone: '',
    agreeToTerms: false,
  });
  const [errors,     setErrors]     = useState({});
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const errorSummaryRef = useRef(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFields((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    // Clear individual error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate(fields);
    if (!fields.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }
    setSubmitting(true);
    // Simulated async submit. Replace with a Firestore write in Phase 2.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  }

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-bg-light px-4">
        <div className="w-full max-w-md rounded-[1.5rem] bg-white p-8 text-center sm:p-10">
          <CheckCircle size={60} className="text-primary mx-auto mb-5" />
          <h2 className="mb-3 text-3xl">Application submitted</h2>
          <p className="text-text-muted leading-relaxed">
            Thank you, <strong>{fields.firstName}</strong>. Your PSITS membership application
            has been received. An officer will review your submission and reach out to{' '}
            <strong>{fields.email}</strong> within 3-5 business days.
          </p>
          <div className="mt-6 rounded-xl bg-bg-light p-4 text-left text-sm text-text-muted">
            <p className="font-semibold text-text-primary mb-2">What's next?</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Watch for a confirmation email from PSITS officers.</li>
              <li>Attend the next general assembly for your orientation.</li>
              <li>Follow our Facebook page for updates.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="bg-bg-light">
      <PageHeader
        eyebrow="Membership"
        title={<>Make PSITS part of <span className="text-primary">your CTU story.</span></>}
        description="Submit your membership application to join workshops, competitions, leadership opportunities, and the wider CCICT community."
      />

      {/* Form card */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="rounded-[1.5rem] bg-white p-6 sm:p-9">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-3xl">
              Membership application
            </h2>
            <span className="hidden rounded-full border border-secondary px-3 py-1 text-xs font-semibold text-text-primary sm:inline-flex">S.Y. 2026–2027</span>
          </div>

          {Object.keys(errors).length > 0 && (
            <div ref={errorSummaryRef} tabIndex="-1" role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <p className="font-bold">Review {Object.keys(errors).length} field{Object.keys(errors).length === 1 ? '' : 's'} before submitting.</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field}><a href={`#${field}`} className="underline underline-offset-2">{message}</a></li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                id="firstName" name="firstName" label="First Name" required
                autoComplete="given-name"
                placeholder="e.g. Maria" value={fields.firstName}
                onChange={handleChange} error={errors.firstName}
              />
              <Input
                id="lastName" name="lastName" label="Last Name" required
                autoComplete="family-name"
                placeholder="e.g. Santos" value={fields.lastName}
                onChange={handleChange} error={errors.lastName}
              />
            </div>

            {/* Student ID */}
            <Input
              id="studentId" name="studentId" label="Student ID" required
              placeholder="e.g. 22-1234-12345" value={fields.studentId}
              onChange={handleChange} error={errors.studentId}
              hint="Format: YY-DDDD-DDDDD"
            />

            {/* Course */}
            <div className="flex flex-col gap-2">
              <label htmlFor="course" className="text-sm font-semibold text-text-primary">
                Course <span className="text-red-500" aria-hidden>*</span>
              </label>
              <select
                id="course" name="course" required
                value={fields.course} onChange={handleChange}
                aria-invalid={!!errors.course}
                aria-describedby={errors.course ? 'course-error' : undefined}
                className={[
                  'min-h-12 w-full rounded-xl border bg-white px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-1',
                  errors.course
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-primary-neutral focus:border-primary focus:ring-primary',
                ].join(' ')}
              >
                <option value="">Select your course</option>
                {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.course && (
                <p id="course-error" className="text-xs text-red-600" role="alert">{errors.course}</p>
              )}
            </div>

            {/* Year level */}
            <div className="flex flex-col gap-2">
              <label htmlFor="yearLevel" className="text-sm font-semibold text-text-primary">
                Year Level <span className="text-red-500" aria-hidden>*</span>
              </label>
              <select
                id="yearLevel" name="yearLevel" required
                value={fields.yearLevel} onChange={handleChange}
                aria-invalid={!!errors.yearLevel}
                aria-describedby={errors.yearLevel ? 'yearLevel-error' : undefined}
                className={[
                  'min-h-12 w-full rounded-xl border bg-white px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-1',
                  errors.yearLevel
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-primary-neutral focus:border-primary focus:ring-primary',
                ].join(' ')}
              >
                <option value="">Select your year level</option>
                {YEAR_LEVELS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              {errors.yearLevel && (
                <p id="yearLevel-error" className="text-xs text-red-600" role="alert">{errors.yearLevel}</p>
              )}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                id="email" name="email" type="email" label="Email Address" required
                autoComplete="email"
                placeholder="e.g. maria@ctu.edu.ph" value={fields.email}
                onChange={handleChange} error={errors.email}
              />
              <Input
                id="phone" name="phone" type="tel" label="Mobile Number"
                autoComplete="tel"
                placeholder="e.g. 09171234567" value={fields.phone}
                onChange={handleChange} error={errors.phone}
                hint="Optional, PH format"
              />
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  id="agreeToTerms" type="checkbox" name="agreeToTerms"
                  checked={fields.agreeToTerms} onChange={handleChange}
                  aria-invalid={!!errors.agreeToTerms}
                  aria-describedby={errors.agreeToTerms ? 'agreeToTerms-error' : undefined}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-primary-neutral text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-muted">
                  I confirm that the information I provided is accurate and I agree to abide by
                  the PSITS-CTU Main organization guidelines and code of conduct.
                </span>
              </label>
              {errors.agreeToTerms && (
                <p id="agreeToTerms-error" className="text-xs text-red-600 ml-7" role="alert">{errors.agreeToTerms}</p>
              )}
            </div>

            <Button
              type="submit" variant="primary" size="lg"
              disabled={submitting} className="w-full mt-2"
            >
              {submitting ? 'Submitting…' : 'Submit Application'}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
