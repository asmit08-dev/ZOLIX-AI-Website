"use client";

import { memo, type ReactEventHandler } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { FaAws } from 'react-icons/fa6';
import { TbBrandAzure, TbBrandOpenai } from 'react-icons/tb';
import { SiGooglecloud, SiAnthropic, SiMeta } from 'react-icons/si';
import { GrOracle } from 'react-icons/gr';
import { RiGrokAiFill } from 'react-icons/ri';
import GlobeBackground from './GlobeBackground';
import LaurelWreathHalf from './LaurelWreathHalf';

// Hoisted to module scope so these aren't reallocated every render — Hero
// takes no props, so a parent re-render would otherwise redo this for nothing.
const PROVIDERS = [
  { name: "AWS", icon: FaAws },
  { name: "Azure", icon: TbBrandAzure },
  { name: "GCP", icon: SiGooglecloud },
  { name: "OCI", icon: GrOracle },
  { name: "OpenAI", icon: TbBrandOpenai },
  { name: "Anthropic", icon: SiAnthropic },
  { name: "Meta", icon: SiMeta },
  { name: "xAI", icon: RiGrokAiFill }
] as const;

const STARS = [0, 1, 2, 3, 4] as const;

const NVIDIA_LINK = "https://www.linkedin.com/posts/nvidiainception-nvidiainception-nvidia-share-7476253289840300033-oIdK/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAASxijABW_7AUlIHWla-7bLDy1ile3fe1tU";
const NVIDIA_BADGE_PATH = "/assets/nvidia-inception.webp";

const handleNvidiaImgError: ReactEventHandler<HTMLImageElement> = (e) => {
  e.currentTarget.src = 'https://placehold.co/120x40?text=NVIDIA+MEMBER';
};

const Hero = () => {
  return (
    <section
      data-nav-theme="beige"
      className="pt-56 md:pt-64 pb-32 px-6 bg-zolix-beige overflow-hidden relative min-h-screen flex flex-col items-center text-center"
    >
      {/* Background Polish */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 hero-dots opacity-[0.04]" />
        <GlobeBackground />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(220,106,79,0.02)_0%,transparent_60%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full flex flex-col items-center">
        
        {/* NVIDIA Trust Badge — Festival Laurels */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <a
            href={NVIDIA_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 md:gap-4 group"
          >
            <LaurelWreathHalf className="h-20 md:h-24 w-auto text-zolix-dark/70 shrink-0 transition-transform duration-500 group-hover:-rotate-6 group-hover:text-zolix-dark" />
            <div className="flex flex-col items-center gap-2.5 px-1">
              <span className="text-xs font-black text-zolix-dark/40 uppercase tracking-wide">Official Member</span>
              <Image
                src={NVIDIA_BADGE_PATH}
                alt="NVIDIA Inception Member"
                width={501}
                height={217}
                className="h-12 md:h-14 w-auto object-contain"
                onError={handleNvidiaImgError}
              />
              <span className="text-xs font-extrabold text-zolix-dark uppercase tracking-wide group-hover:text-zolix-orange transition-colors">
                Inception Program
              </span>
            </div>
            <LaurelWreathHalf flip className="h-20 md:h-24 w-auto text-zolix-dark/70 shrink-0 transition-transform duration-500 group-hover:rotate-6 group-hover:text-zolix-dark" />
          </a>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-7xl lg:text-[90px] font-extrabold tracking-tighter text-zolix-dark mb-10 leading-[0.95] max-w-5xl"
        >
          AI-Powered Cloud Cost <br />
          <span className="text-zolix-orange italic relative inline-block">
            Optimization & Management Platform
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-zolix-dark/40 font-bold mb-16 tracking-tight max-w-3xl"
        >
          Save Up to <span className="text-zolix-dark">60%</span> On Your Infrastructure Bill.
        </motion.h2>

        {/* Tech Stack Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-wrap justify-center gap-3 mb-24 max-w-4xl"
        >
          {PROVIDERS.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 bg-white/70 px-5 py-2.5 rounded-[20px] border border-zolix-dark/5 shadow-sm hover:bg-white hover:border-zolix-orange/20 transition-colors duration-300 cursor-default group"
            >
              <p.icon size={14} className="text-zolix-orange group-hover:rotate-12 transition-transform" />
              <span className="text-[9px] font-bold text-zolix-dark uppercase tracking-widest">{p.name}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-10">
            <a 
              href="https://lite.zolix.ai/signup" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-zolix-dark text-white pl-10 pr-3 py-3 rounded-full flex items-center gap-10 group hover:bg-zolix-orange transition-colors duration-500 shadow-2xl shadow-zolix-dark/20"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Start scanning for free</span>
              <div className="bg-white text-zolix-dark p-3 rounded-full group-hover:rotate-45 transition-transform">
                <ArrowRight size={20} strokeWidth={3} />
              </div>
            </a>
            
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex gap-1">
                {STARS.map((i) => (
                  <Star key={i} size={14} fill="#dc6a4f" className="text-zolix-orange" />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-bold text-zolix-dark/40 tracking-[0.1em] uppercase">4.9/5 ON G2 & CLUTCH</span>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-3 bg-zolix-dark/5 px-6 py-3 rounded-2xl border border-zolix-dark/5">
            <ShieldCheck size={16} className="text-zolix-orange" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zolix-dark/60">Sovereign C2O Engine • 9B Parameters</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Hero);
