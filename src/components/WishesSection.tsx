import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2, Sparkles, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { submitToSheet } from '../config';
import { getGuestNameFromUrl } from '../guest';

// Wishes are sent privately to the couple's Google Sheet — they are NOT displayed on the invitation.
export const WishesSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;
    setIsSubmitting(true);

    try {
      await submitToSheet('Wishes', {
        name: formData.name.trim(),
        message: formData.message.trim(),
        invitedAs: getGuestNameFromUrl() ?? '',
      });
      setFormData({ name: '', message: '' });
      setSent(true);
    } catch (error) {
      console.error('Error submitting wish: ', error);
      toast.error('Sorry, we could not send your wish. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 relative py-12">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-3/4 h-3/4 bg-brand-beige/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="text-center mb-16 relative">
        <Sparkles className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-8 text-brand-beige/40 animate-pulse" />
        <span className="text-brand-beige-deep uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block drop-shadow-sm">
          Guestbook
        </span>
        <h2 className="text-5xl sm:text-7xl font-display text-stone-800 tracking-tight drop-shadow-sm">
          Blessings & <span className="italic font-light text-brand-beige-deep">Wishes</span>
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-brand-beige/60 to-transparent mx-auto mt-8" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="w-full glass p-8 sm:p-14 rounded-[3rem] border border-white/60 shadow-[0_30px_60px_rgba(176,137,104,0.1)] relative overflow-hidden bg-white/70 backdrop-blur-3xl"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-beige to-transparent opacity-50" />

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-10"
            >
              <Heart className="w-14 h-14 mx-auto mb-6 text-brand-beige-deep fill-brand-beige/20" />
              <h3 className="text-4xl font-display text-stone-800 mb-4">Thank You</h3>
              <p className="text-stone-500/90 font-serif italic text-lg leading-relaxed max-w-md mx-auto mb-8">
                Your heartfelt wish has been sent to us. We will treasure it forever.
              </p>
              <button
                onClick={() => setSent(false)}
                className="px-6 py-2 rounded-full border border-brand-beige/30 text-brand-beige-deep font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-brand-beige/10 transition-all duration-300 shadow-sm"
              >
                Send Another Wish
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="text-center mb-10">
                <p className="text-stone-500 font-serif italic text-lg leading-relaxed max-w-lg mx-auto">
                  Leave a little note or a piece of advice for our journey ahead.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-3 ml-2 text-left">Your Name</label>
                  <input
                    required
                    type="text"
                    placeholder="E.g., Uncle John"
                    className="w-full bg-white/80 px-6 py-4 rounded-full border border-stone-200/60 focus:ring-2 focus:ring-brand-beige/30 focus:border-brand-beige-deep/40 outline-none transition-all duration-300 font-serif italic text-lg shadow-inner placeholder:text-stone-300 text-stone-700"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-3 ml-2 text-left">Your Message</label>
                  <textarea
                    required
                    placeholder="Wishing you a lifetime of happiness..."
                    className="w-full bg-white/80 px-6 py-5 rounded-[2rem] border border-stone-200/60 focus:ring-2 focus:ring-brand-beige/30 focus:border-brand-beige-deep/40 outline-none transition-all duration-300 h-36 resize-none font-serif italic text-lg shadow-inner placeholder:text-stone-300 text-stone-700"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4 max-w-sm mx-auto">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-stone-800 text-brand-champagne py-5 rounded-full font-sans tracking-[0.3em] font-bold text-[11px] uppercase hover:bg-stone-900 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-brand-gold" />
                      Share Blessing
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
