import React, { useMemo, useState } from 'react';
import { Copy, Link as LinkIcon, MessageCircle, CheckCircle } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { WEDDING } from './config';
import { PREFIXES, Prefix, buildDisplayName, buildInviteLink } from './guest';

function buildMessage(displayName: string, link: string) {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${WEDDING.groomName} & ${WEDDING.brideName}`;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for non-secure contexts / older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

export function AdminPage() {
  const [prefix, setPrefix] = useState<Prefix>('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generated, setGenerated] = useState<{ displayName: string; link: string } | null>(null);
  const [copied, setCopied] = useState<'link' | 'message' | null>(null);

  const livePreviewName = buildDisplayName(prefix, guestName);
  const message = useMemo(
    () => (generated ? buildMessage(generated.displayName, generated.link) : ''),
    [generated],
  );

  const handleGenerate = (e?: React.FormEvent) => {
    e?.preventDefault();
    const displayName = buildDisplayName(prefix, guestName);
    if (!displayName) return;
    setGenerated({ displayName, link: buildInviteLink(window.location.origin, displayName) });
    setCopied(null);
  };

  const handleCopy = async (kind: 'link' | 'message') => {
    if (!generated) return;
    await copyText(kind === 'link' ? generated.link : message);
    setCopied(kind);
    toast.success(kind === 'link' ? 'Link copied!' : 'Message copied!');
    setTimeout(() => setCopied(null), 2000);
  };

  const inputCls =
    'w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-brand-beige-deep/40 focus:border-brand-beige-deep outline-none transition-all bg-white font-sans text-stone-800';
  const copyBtnCls =
    'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-brand-beige-deep text-brand-beige-deep font-sans text-xs tracking-[0.15em] uppercase hover:bg-brand-beige-deep hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-brand-beige-deep';

  return (
    <div className="min-h-screen bg-brand-ivory py-12 px-4 font-sans text-stone-800 flex justify-center">
      <Toaster position="top-center" richColors />
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-display text-stone-800 mb-2">
            {WEDDING.groomName} &amp; {WEDDING.brideName}
          </h1>
          <p className="text-stone-500 text-xs uppercase tracking-[0.25em]">Invitation Link Generator</p>
        </div>

        <form
          onSubmit={handleGenerate}
          className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-stone-100 p-6 sm:p-8 space-y-5"
        >
          <div>
            <label htmlFor="prefix" className="block text-sm font-medium text-stone-700 mb-1">
              Select Prefix
            </label>
            <select
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value as Prefix)}
              className={inputCls}
            >
              {PREFIXES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="guestName" className="block text-sm font-medium text-stone-700 mb-1">
              Guest Name
            </label>
            <input
              id="guestName"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Sanjaya"
              autoComplete="off"
              className={inputCls}
            />
            {livePreviewName && (
              <p className="mt-2 text-sm text-stone-500">
                Greeting: <span className="font-semibold text-stone-800">Dear {livePreviewName} ❤️</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!guestName.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-beige-deep text-white text-sm tracking-[0.2em] uppercase shadow-md hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LinkIcon className="w-4 h-4" />
            Generate Link
          </button>

          <div className="flex gap-3">
            <button type="button" disabled={!generated} onClick={() => handleCopy('link')} className={copyBtnCls}>
              {copied === 'link' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              Copy Link Only
            </button>
            <button type="button" disabled={!generated} onClick={() => handleCopy('message')} className={copyBtnCls}>
              {copied === 'message' ? <CheckCircle className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
              Copy Full Message
            </button>
          </div>
        </form>

        {generated && (
          <div className="mt-6 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-stone-100 p-6 sm:p-8 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">Generated Link</p>
              <a
                href={generated.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block break-all px-3 py-2 rounded-md bg-brand-ivory border border-stone-200 text-sm text-brand-beige-deep hover:underline"
              >
                {generated.link}
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">On the invitation</p>
              <p className="font-serif italic text-lg text-stone-700">
                We cordially invite <span className="not-italic font-semibold text-brand-beige-deep">{generated.displayName}</span> to
                celebrate our special day with us.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">Message Preview</p>
              <pre className="whitespace-pre-wrap font-sans text-sm text-stone-700 bg-brand-ivory border border-stone-200 rounded-lg p-4 leading-relaxed">
                {message}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
