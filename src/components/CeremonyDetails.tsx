import React from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, MapPin } from 'lucide-react';
import { WEDDING } from '../config';

export const CeremonyDetails: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">

      <div className="flex justify-center">
        {/* Ceremony details */}
        <div className="relative z-10 w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="text-brand-beige-deep uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[10px] sm:text-[11px] font-bold drop-shadow-sm">
                The Sacred Union
              </span>
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-brand-beige-deep/60 to-transparent" />
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display text-stone-800 mb-8 leading-[1.1] drop-shadow-sm">
              A Celebration of <br />
              <span className="italic font-light text-brand-beige-deep">Tradition & Love</span>
            </h2>

            <p className="text-stone-500/90 font-serif text-lg sm:text-xl leading-relaxed mb-16 max-w-lg">
              We are honored to invite you to witness our union as we exchange vows at {WEDDING.venueName}, surrounded by the warmth of our loved ones.
            </p>

            {/* Premium Timeline */}
            <div className="relative space-y-12 ml-10 sm:ml-12 border-l-[1.5px] border-brand-beige/30 pl-10 sm:pl-12 py-4">

              {/* Calendar */}
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-white rounded-full border border-brand-beige/40 shadow-lg flex items-center justify-center group-hover:border-brand-beige-deep group-hover:shadow-[0_4px_15px_rgba(176,137,104,0.3)] transition-all duration-500">
                  <Calendar className="w-5 h-5 text-brand-beige-deep group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-stone-800 mb-2 group-hover:text-brand-beige-deep transition-colors duration-500">{WEDDING.dateHeading}</h4>
                  <p className="text-stone-500/80 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold">{WEDDING.yearInWords}</p>
                </div>
              </div>

              {/* Clock */}
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-white rounded-full border border-brand-beige/40 shadow-lg flex items-center justify-center group-hover:border-brand-beige-deep group-hover:shadow-[0_4px_15px_rgba(176,137,104,0.3)] transition-all duration-500">
                  <Clock className="w-5 h-5 text-brand-beige-deep group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-stone-800 mb-2 group-hover:text-brand-beige-deep transition-colors duration-500">{WEDDING.startTime}</h4>
                  <p className="text-stone-500/80 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold">Poruwa Ceremony — {WEDDING.venueHall}</p>
                </div>
              </div>

              {/* Location */}
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-white rounded-full border border-brand-beige/40 shadow-lg flex items-center justify-center group-hover:border-brand-beige-deep group-hover:shadow-[0_4px_15px_rgba(176,137,104,0.3)] transition-all duration-500">
                  <MapPin className="w-5 h-5 text-brand-beige-deep group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-stone-800 mb-2 group-hover:text-brand-beige-deep transition-colors duration-500">{WEDDING.venueName}</h4>
                  <p className="text-stone-500/80 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold">{WEDDING.venueHall}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
