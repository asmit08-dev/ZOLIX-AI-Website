"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import LinkedinIcon from './icons/LinkedinIcon';

const leaders = [
  {
    name: "Raghuveer Sakuru",
    role: "CEO & Founder",
    image: "/assets/team/raghuveer.webp",
    linkedin: "https://www.linkedin.com/in/raghuveer-sakuru-4435a2140/",
    bio: "Visionary leader driving the future of Cloud and AI financial operations."
  },
  {
    name: "Ramesh Kasver",
    role: "COO & Co-Founder",
    image: "/assets/team/ramesh.webp",
    linkedin: "https://www.linkedin.com/in/ramesh-kasver-1bb8b9a8/",
    bio: "Operations specialist focused on global footprint and seamless delivery."
  },
  {
    name: "Suraj Singh",
    role: "CPO & Co-Founder",
    image: "/assets/team/suraj.webp",
    linkedin: "https://www.linkedin.com/in/suraj-singh-61445522/",
    bio: "Product architect making complex FinOps data intuitive and actionable."
  },
  {
    name: "Neeraj Rastogi",
    role: "Business Head",
    image: "/assets/team/neeraj.webp",
    linkedin: "https://www.linkedin.com/in/neeraj-rastogi-83a4561b1/",
    bio: "Strategic leader focused on enterprise partnerships and market expansion."
  },
  {
    name: "Vikas Koul",
    role: "Growth & Strategy",
    image: "/assets/team/vikas.webp",
    linkedin: "https://www.linkedin.com/in/vikas-koul-544476155/",
    bio: "Driving global growth initiatives and strategic cloud partnerships."
  },
  {
    name: "Praveena",
    role: "Advisory",
    image: "/assets/team/praveena.webp",
    linkedin: "https://www.linkedin.com/in/praveena/",
    bio: "Expert advisory on cloud governance, compliance, and financial engineering."
  }
];

const Leadership = () => {
  return (
    <section
      data-nav-theme="light"
      className="py-24 px-6 bg-white border-t border-zolix-dark/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-zolix-dark">Leadership Team</h2>
          <p className="mx-auto max-w-xl text-gray-500 font-medium">The experts behind ZOLIX AI, dedicated to revolutionizing the cloud economy.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {leaders.map((person, idx) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative mb-8 w-28 h-28 shrink-0">
                <div className="absolute inset-0 bg-zolix-orange rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10" />
                <div className="relative w-full h-full overflow-hidden rounded-3xl bg-zolix-beige border border-zolix-dark/5 shadow-sm">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="112px"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/112x112?text=TEAM';
                    }}
                  />
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <h3 className="text-xl font-bold text-zolix-dark">{person.name}</h3>
                <p className="text-zolix-orange text-[10px] font-bold uppercase tracking-[0.2em]">{person.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed font-medium max-w-[240px] mb-6">
                  {person.bio}
                </p>
                <a 
                  href={person.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex w-10 h-10 rounded-xl bg-zolix-beige items-center justify-center text-zolix-dark/40 hover:text-white hover:bg-zolix-dark transition-all duration-300"
                  aria-label={`${person.name} LinkedIn`}
                >
                  <LinkedinIcon size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
