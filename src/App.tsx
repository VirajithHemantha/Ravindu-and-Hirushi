import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Music, VolumeX, Heart } from 'lucide-react';
import { Toaster } from 'sonner';

import { EnvelopeOpening } from './components/EnvelopeOpening';
import { Hero } from './components/Hero';
import { CoupleDetails } from './components/CoupleDetails';
import { CeremonyDetails } from './components/CeremonyDetails';
import { Location } from './components/Location';
import { Countdown } from './components/Countdown';
import { RSVPForm } from './components/RSVPForm';
import { WEDDING } from './config';

const weddingDate = new Date(WEDDING.dateISO);
const FADE_MS = 700;

type Stage = 'envelope' | 'fading' | 'done';

export default function App() {
  // The invitation is rendered from the start (hidden under the envelope) so its
  // images decode and layout is ready before the reveal — no jank when it appears.
  const [stage, setStage] = useState<Stage>('envelope');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/paulyudin-wedding-485932.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    // Not preloaded: it streams once the guest opens the envelope, so it never competes with images.
    audio.preload = 'none';
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Lock page scroll only while the closed envelope is showing; unlocking at the start of the
  // fade (not the end) keeps that layout change out of the final frame of the transition.
  useEffect(() => {
    document.documentElement.style.overflow = stage === 'envelope' ? 'hidden' : '';
  }, [stage]);

  const handleMusicStart = useCallback(() => {
    setIsMusicPlaying(true);
    audioRef.current?.play().catch(() => setIsMusicPlaying(false));
  }, []);

  const handleEnvelopeComplete = useCallback(() => {
    setStage('fading');
    window.setTimeout(() => setStage('done'), FADE_MS);
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMusicPlaying) {
      audio.pause();
      setIsMusicPlaying(false);
    } else {
      audio.play().then(() => setIsMusicPlaying(true)).catch(console.error);
    }
  };

  const revealed = stage !== 'envelope';

  return (
    <>
      {/* Envelope is hidden (not unmounted) after the fade: unmounting removed its <style> block,
          forcing a full-page style recalculation that showed up as a ~0.5s freeze. */}
      <div
        className="fixed inset-0 z-[100] overflow-hidden"
        style={{
          opacity: revealed ? 0 : 1,
          transition: `opacity ${FADE_MS}ms ease`,
          pointerEvents: revealed ? 'none' : 'auto',
          visibility: stage === 'done' ? 'hidden' : 'visible',
          willChange: stage === 'done' ? 'auto' : 'opacity',
        }}
        aria-hidden={revealed}
      >
        <EnvelopeOpening onComplete={handleEnvelopeComplete} onMusicStart={handleMusicStart} />
      </div>

      <div
        className="font-sans text-stone-800 bg-brand-ivory overflow-hidden selection:bg-brand-beige-deep/20"
        aria-hidden={!revealed}
      >
        <Toaster position="top-center" />

        {revealed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onClick={toggleMusic}
            aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
            className="fixed top-6 right-6 z-50 w-12 sm:w-14 h-12 sm:h-14 bg-white/90 rounded-full shadow-[0_8px_30px_rgba(176,137,104,0.15)] flex items-center justify-center border border-brand-beige/50 text-brand-beige-deep hover:scale-105 transition-transform duration-300"
          >
            {isMusicPlaying ? <Music className="w-5 h-5 sm:w-6 sm:h-6" /> : <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />}
          </motion.button>
        )}

        <Hero revealed={revealed} />

        <section className="py-24 sm:py-32 bg-gradient-to-b from-brand-ivory via-white to-brand-ivory relative">
          <CoupleDetails />
        </section>

        <section className="py-24 sm:py-32 bg-white relative">
          <CeremonyDetails />
        </section>

        <section className="py-24 sm:py-32 bg-gradient-to-b from-white via-brand-champagne/30 to-brand-ivory relative">
          <Location />
        </section>

        <section className="py-24 sm:py-32 bg-gradient-to-b from-brand-ivory to-white relative">
          <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
            <span className="text-brand-beige-deep uppercase tracking-[0.4em] text-[10px] sm:text-[11px] font-bold">
              The Wait Is Almost Over
            </span>
          </div>
          <Countdown targetDate={weddingDate} />
        </section>

        <section className="py-24 sm:py-32 bg-brand-ivory relative">
          <RSVPForm />
        </section>

        <footer className="py-12 bg-white border-t border-brand-beige/20 text-center relative overflow-hidden">
          <Heart className="w-6 h-6 mx-auto mb-6 text-brand-beige-deep fill-brand-beige/20" />
          <p className="font-display text-4xl sm:text-5xl text-stone-800 mb-2">
            {WEDDING.groomName} &amp;&nbsp;{WEDDING.brideName}
          </p>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-sans text-stone-400 font-semibold block mb-8">
            {WEDDING.dateLong}
          </span>
        </footer>
      </div>
    </>
  );
}
