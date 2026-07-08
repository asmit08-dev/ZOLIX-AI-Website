"use client";

import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { insightLinks, getTitleFromUrl } from '../lib/insights-data';
import { Search, ExternalLink, BookOpen, Newspaper, Globe, Cpu, Database } from 'lucide-react';

interface InsightsHubProps {
  mode?: 'insights' | 'blog';
}

const InsightsHub = ({ mode = 'insights' }: InsightsHubProps) => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const isBlogMode = mode === 'blog' || pathname === '/blog';
  
  const filteredLinks = insightLinks.filter(item => {
    const title = getTitleFromUrl(item.url).toLowerCase();
    const matchesSearch = title.includes(searchQuery.toLowerCase());
    
    if (isBlogMode) {
      return item.category === "blog" && matchesSearch;
    } else {
      return item.category !== "blog" && matchesSearch;
    }
  });

  const categories = isBlogMode 
    ? ["blog"] 
    : ["all", "resources", "industries", "technologies"];

  const [activeTab, setActiveTab] = useState(isBlogMode ? "blog" : "all");

  const finalFilteredLinks = filteredLinks.filter(item => {
    if (activeTab === "all" || isBlogMode) return true;
    return item.category === activeTab;
  });

  const getIcon = (cat: string) => {
    switch(cat) {
      case 'industries': return <Globe size={14} className="text-zolix-orange" />;
      case 'technologies': return <Cpu size={14} className="text-zolix-orange" />;
      case 'resources': return <Database size={14} className="text-zolix-orange" />;
      default: return <BookOpen size={14} className="text-zolix-orange" />;
    }
  };

  return (
    <div className="pt-40 pb-32 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-zolix-beige px-4 py-1.5 rounded-full mb-6 border border-zolix-dark/5"
            >
              {isBlogMode ? <Newspaper size={14} className="text-zolix-orange" /> : <BookOpen size={14} className="text-zolix-orange" />}
              <span className="text-[10px] font-bold uppercase tracking-widest text-zolix-dark/60">
                {isBlogMode ? "ZOLIX Engineering Blog" : "2026 Cloud Economy Insights"}
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]"
            >
              {isBlogMode ? "The Blog." : "Insights Hub."}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zolix-dark/40 font-bold max-w-xl"
            >
              {isBlogMode 
                ? "Deep-dives into the C2O engine, Sovereign AI, and the future of financial operations."
                : "83 unique technical guides, industry reports, and cloud optimization strategies."}
            </motion.p>
          </div>
          
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zolix-dark/20" size={20} />
            <input 
              type="text" 
              placeholder={`Search ${isBlogMode ? "articles" : "guides"}...`}
              className="w-full bg-zolix-beige border-none rounded-[24px] py-5 pl-14 pr-8 focus:ring-2 focus:ring-zolix-orange transition-all text-sm font-bold placeholder:text-zolix-dark/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {!isBlogMode && (
          <div className="flex flex-wrap gap-3 mb-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-3 ${
                  activeTab === cat 
                  ? "bg-zolix-dark text-white shadow-xl shadow-zolix-dark/20" 
                  : "bg-zolix-beige text-zolix-dark/40 hover:text-zolix-dark hover:bg-zolix-beige/80"
                }`}
              >
                {cat !== 'all' && getIcon(cat)}
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {finalFilteredLinks.map((item, idx) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 12) * 0.05 }}
            >
              <Link
                href={item.path}
                className="group bg-zolix-beige p-10 rounded-[48px] border border-zolix-dark/5 hover:bg-zolix-dark transition-all duration-500 flex flex-col justify-between h-[320px] relative overflow-hidden shadow-sm hover:shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-zolix-orange/5 group-hover:bg-zolix-orange/10 blur-3xl -mr-16 -mt-16 transition-colors"></div>
                
                <div className="relative z-10">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-zolix-orange mb-6 flex items-center gap-2">
                    {getIcon(item.category)}
                    {item.category}
                  </div>
                  <h3 className="text-2xl font-bold leading-[1.1] group-hover:text-white transition-colors tracking-tight">
                    {getTitleFromUrl(item.url)}
                  </h3>
                </div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zolix-dark/30 group-hover:text-white/40 transition-colors">
                    {isBlogMode ? "Read Article" : "View Guide"}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-zolix-dark group-hover:bg-zolix-orange group-hover:text-white transition-all transform group-hover:rotate-45 shadow-sm">
                    <ExternalLink size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {finalFilteredLinks.length === 0 && (
          <div className="py-32 text-center">
            <div className="text-zolix-dark/20 mb-6 flex justify-center">
              <Search size={48} />
            </div>
            <p className="text-zolix-dark/40 font-bold uppercase tracking-widest text-xs">No results found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(InsightsHub);
