import { useState } from 'react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';
type FormSubmitEvent = { preventDefault: () => void; currentTarget: HTMLFormElement };

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');

  function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get('email') || '');
    const message = String(data.get('message') || '');

    if (!email.includes('@') || message.trim().length < 10) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    window.setTimeout(() => {
      setStatus('success');
      form.reset();
    }, 650);
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em]">
          Name
          <input
            className="border-b border-[var(--line-strong)] bg-transparent px-0 py-3 text-base font-normal tracking-normal outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent-deep)]"
            type="text"
            name="name"
            placeholder="Your name"
            required
          />
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em]">
          Email
          <input
            className="border-b border-[var(--line-strong)] bg-transparent px-0 py-3 text-base font-normal tracking-normal outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent-deep)]"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />
        </label>
      </div>
      <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em]">
        What are we making?
        <textarea
          className="min-h-36 resize-y border-b border-[var(--line-strong)] bg-transparent px-0 py-3 text-base font-normal tracking-normal outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent-deep)]"
          name="message"
          placeholder="A little about the project, timeline, and what you need."
          required
        />
      </label>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button className="button-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          <span className="arrow-icon" aria-hidden="true">
            ↗
          </span>
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-[var(--muted)]" aria-live="polite">
          {status === 'success' && 'Thanks — your note is ready for a reply. I’ll be in touch soon.'}
          {status === 'error' && 'Please add a valid email and a little more detail so I can reply properly.'}
          {status === 'idle' && 'No newsletter, no sales funnel. Just a direct line to me.'}
          {status === 'sending' && 'Preparing your message…'}
        </p>
      </div>
    </form>
  );
}
