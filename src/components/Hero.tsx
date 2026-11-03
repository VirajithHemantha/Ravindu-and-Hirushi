import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { FloatingPetals } from './FloatingPetals';
import { WEDDING } from '../config';
import { getGuestNameFromUrl } from '../guest';

export const Hero: React.FC<{ revealed?: boolean }> = ({ revealed = true }) => {
  const guestName = getGuestNameFromUrl();

  return (
    <div className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-brand-ivory/50">

      {/* Static background image (no scroll-linked parallax/zoom — those repaint every frame and caused lag) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/y.jpeg"
          alt={`${WEDDING.groomName} and ${WEDDING.brideName}`}
          className="w-full h-full object-cover opacity-85"
          style={{ objectPosition: 'center 40%' }}
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ivory via-brand-ivory/50 to-brand-ivory/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-beige-deep/15 via-transparent to-brand-beige/10" />
      </div>

      {/* Persistent subtle falling petals in background */}
      {revealed && <FloatingPetals />}

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-6xl mt-10 sm:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="flex flex-col items-center"
        >
          {/* Subtle top decoration */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-brand-beige-deep/60 to-transparent" />
            <Heart className="w-5 h-5 text-brand-beige-deep/70 fill-brand-beige/20" />
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-brand-beige-deep/60 to-transparent" />
          </div>

          <span className="text-brand-beige-deep uppercase tracking-[0.4em] sm:tracking-[0.6em] text-xs sm:text-sm font-medium mb-6 sm:mb-10 block drop-shadow-sm font-sans">
            The Celebration of Love
          </span>

          <div className="relative mb-8 sm:mb-12 w-full flex justify-center">
            {/* Soft glow behind text for contrast and magical feel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[140%] pointer-events-none" style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.55), transparent)' }} />

            <h1 className="relative text-6xl sm:text-[7rem] lg:text-[9.5rem] font-display text-stone-800 leading-[1.1] sm:leading-[0.9] drop-shadow-sm">
              {WEDDING.groomName} <br className="sm:hidden" />
              <span className="text-brand-beige-deep italic font-light mx-2 sm:mx-6 text-5xl sm:text-[6rem] lg:text-[8rem] inline-block -translate-y-2 sm:-translate-y-6">&</span>
              <br className="sm:hidden" />
              &nbsp;{WEDDING.brideName}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
            <div className="hidden sm:block h-[1px] w-20 bg-gradient-to-r from-transparent to-brand-beige-deep/40" />
            <p className="text-[1.1rem] sm:text-2xl font-serif italic text-stone-700 tracking-wide px-4 text-center max-w-xl leading-relaxed drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]">
              {guestName ? (
                <>We cordially invite <span className="font-bold not-italic text-brand-beige-deep whitespace-nowrap">{guestName}</span> to celebrate our special day with us</>
              ) : (
                "Together with our families, we joyfully invite you to join us"
              )}
            </p>
            <div className="hidden sm:block h-[1px] w-20 bg-gradient-to-l from-transparent to-brand-beige-deep/40" />
          </div>

          {/* Enhanced Date pill with premium glass effect */}
          <div className="inline-block relative group mt-4 sm:mt-8 w-full sm:w-auto px-4 sm:px-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-beige-deep/30 via-brand-gold/30 to-brand-beige-deep/30 rounded-full opacity-70" />
            <div className="relative px-4 sm:px-12 py-3 sm:py-5 bg-white/85 border border-brand-beige/50 rounded-full shadow-[0_8px_30px_rgba(176,137,104,0.15)] overflow-hidden whitespace-nowrap flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
              <span className="relative text-[16px] sm:text-3xl font-serif text-brand-beige-deep tracking-[0.2em] sm:tracking-[0.4em] font-medium drop-shadow-sm flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-brand-gold flex-shrink-0" />
                {WEDDING.dateShort}
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-brand-gold flex-shrink-0" />
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Premium Side Decorative Text */}
      <div className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 opacity-70">
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-brand-beige-deep/50" />
        <p className="writing-mode-vertical text-[11px] uppercase tracking-[0.6em] text-brand-beige-deep font-semibold font-sans">
          Avinka Grand • Main Ballroom
        </p>
        <div className="w-[1px] h-24 bg-gradient-to-t from-transparent to-brand-beige-deep/50" />
      </div>

      <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 opacity-70">
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-brand-beige-deep/50" />
        <p className="writing-mode-vertical text-[11px] uppercase tracking-[0.6em] text-brand-beige-deep font-semibold font-sans rotate-180">
          Save the Date • {WEDDING.monthYear}
        </p>
        <div className="w-[1px] h-24 bg-gradient-to-t from-transparent to-brand-beige-deep/50" />
      </div>

      {/* Refined Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.4em] text-stone-500 font-semibold drop-shadow-md">Discover</span>
        <div className="w-[1px] h-12 sm:h-20 bg-gradient-to-b from-brand-beige-deep/60 to-transparent animate-bounce" />
      </motion.div>
    </div>
  );
};
