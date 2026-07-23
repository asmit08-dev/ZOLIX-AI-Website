"use client";

import { memo, type ReactEventHandler } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
          className="text-4xl md:text-6xl lg:text-[76px] font-extrabold tracking-tighter text-zolix-dark mb-8 leading-[0.95] max-w-5xl"
        >
          Cut AI, GPU &{" "}
          <span className="text-zolix-orange italic relative inline-block">
            Cloud Costs Instantly
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-3xl text-zolix-dark/40 font-bold mb-10 tracking-tight max-w-3xl"
        >
          Save Up to <span className="text-zolix-dark">60%</span> On Your Bill
        </motion.h2>

        {/* Provider compatibility */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-10 flex max-w-4xl flex-col items-center gap-3"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zolix-dark/35">Built for your cloud and AI stack</span>
          <div className="flex flex-wrap justify-center gap-2">
            {PROVIDERS.map((p) => (
              <div
                key={p.name}
                className="group flex items-center gap-2 rounded-full border border-zolix-dark/8 bg-white/75 px-3.5 py-2 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zolix-orange/30 hover:bg-white"
              >
                <p.icon size={13} className="text-zolix-orange transition-transform group-hover:rotate-12" />
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-zolix-dark/75">{p.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Block */}
        <div
          className="relative w-full max-w-5xl self-center text-left"
        >
          <div className="relative overflow-hidden rounded-[30px] bg-zolix-dark px-6 py-7 text-white shadow-2xl shadow-zolix-dark/20 md:px-9 md:py-8">
            <div
              aria-hidden="true"
              className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-zolix-orange/20 blur-3xl"
            />
            <div className="relative">
              <p className="max-w-4xl text-xl font-medium leading-snug tracking-tight text-white/75 md:text-2xl">
                Stop guessing where your cloud budget is going. Get <span className="font-bold text-white">real-time visibility</span>, automated waste detection, and GPU-level cost control across every cloud—<span className="font-bold text-zolix-orange">all in one platform.</span>
              </p>

              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://lite.zolix.ai/signup"
                target="_blank"
                rel="noreferrer"
                className="group flex w-fit items-center gap-6 rounded-full bg-zolix-orange py-2 pl-6 pr-2 text-white shadow-lg shadow-black/20 transition-colors hover:bg-white hover:text-zolix-dark"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Start scanning for free</span>
                <div className="rounded-full bg-white p-2.5 text-zolix-dark transition-transform group-hover:rotate-45 group-hover:bg-zolix-orange group-hover:text-white">
                  <ArrowRight size={18} strokeWidth={3} />
                </div>
              </a>

              <Link
                href="/products"
                className="group flex w-fit items-center gap-3 rounded-full px-2 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/65 transition-colors hover:text-white"
              >
                Explore all features
                <ArrowRight size={15} strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
              </Link>
              </div>

              <div className="mt-7 flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-0.5">
                    {STARS.map((i) => (
                      <Star key={i} size={13} fill="#dc6a4f" className="text-zolix-orange" />
                    ))}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-white/50">4.9/5 on G2 &amp; Clutch</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                  <ShieldCheck size={15} className="text-zolix-orange" strokeWidth={2.5} />
                  Sovereign C2O Engine <span className="text-zolix-orange">•</span> 9B Parameters
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
