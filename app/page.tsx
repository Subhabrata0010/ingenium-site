/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';

// --- DATA IMPORT ---
import prayuktiData from '../data/prayukti/blogs.json';
import abhayamanData from '../data/abhayaman/blogs.json';
import archiveData from '../data/archive/blogs.json';

// --- HELPER: GET GOOGLE IMAGE URL ---
const getGoogleUrl = (id: string) => {
  if (!id) return '/images/placeholder.jpg';
  return `https://lh3.googleusercontent.com/${id}`;
};

// --- COMPONENT: HERO CAROUSEL ---
const HeroCarousel = ({ articles }: { articles: any[] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (articles.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [articles.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % articles.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? articles.length - 1 : prev - 1));

  if (!articles.length) return null;

  return (
    <div className="relative w-full h-125 md:h-150 overflow-hidden bg-gray-900 group">
      <div 
        className="flex transition-transform duration-700 ease-out h-full" 
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {articles.map((article, idx) => {
           const coverId = article.images?.[0]?.id || ''; 
           
           return (
            <div key={idx} className="w-full shrink-0 relative h-full">
              <div className="absolute inset-0 bg-black/40 z-10" />
              {coverId ? (
                <Image 
                  src={getGoogleUrl(coverId)} 
                  alt={article.title} 
                  fill 
                  className="object-cover opacity-90"
                  priority={idx === 0}
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">Featured Article</div>
              )}
              
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
                <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4 rounded-sm">
                  {article.department}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight mb-4 drop-shadow-lg">
                  {article.title}
                </h2>
                <div className="flex items-center text-gray-200 text-sm font-medium gap-4">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{article.readTime}</span>
                </div>
                <Link 
                  href={`/${article.department.toLowerCase()}/blog/${article.id}`}
                  className="mt-6 bg-white text-black px-6 py-3 font-bold uppercase text-sm hover:bg-blue-600 hover:text-white transition-all"
                >
                  Read Article
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 p-2 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 p-2 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
        <ChevronRight className="w-6 h-6" />
      </button>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {articles.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all ${current === idx ? 'bg-white w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- COMPONENT: SECTION BOXES ---
const SectionGrid = () => {
  const sections = [
    { 
      title: "Prayukti", 
      color: "bg-emerald-600", 
      link: "/prayukti",
      description: "Technical Articles & Innovations"
    },
    { 
      title: "Abhayaman", 
      color: "bg-indigo-600", 
      link: "/abhayaman",
      description: "Campus Life & Culture"
    },
    { 
      title: "Archive", 
      color: "bg-rose-600", 
      link: "/archive",
      description: "Past Issues & Collections"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-30 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section, idx) => (
          <Link 
            key={idx} 
            href={section.link}
            className="group relative h-64 rounded-xl overflow-hidden shadow-xl cursor-pointer bg-white"
          >
            <div className="absolute inset-0 bg-gray-800" />
            <div className={`absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity ${section.color}`} />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 border-4 border-white/0 group-hover:border-white/20 transition-all duration-300 m-2 rounded-lg">
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">{section.title}</h3>
              <p className="text-sm text-white/80 mb-4">{section.description}</p>
              <span className="text-xs font-medium bg-white/20 px-4 py-1 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                Browse Section
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const allArticles = [...prayuktiData, ...abhayamanData, ...archiveData];
  const featuredArticles = allArticles.slice(0, 5);
  const feedArticles = allArticles.slice(0, 6);

  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. HERO CAROUSEL */}
      <HeroCarousel articles={featuredArticles} />

      {/* 2. SECTION BOXES */}
      <SectionGrid />

      {/* 3. MAIN ARTICLE FEED */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">Our Latest Stories</span>
          <h2 className="text-3xl font-bold text-gray-900">Recent Publications</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-20">
          {feedArticles.map((article) => {
             const coverId = article.images?.[0]?.id;

             return (
              <article key={article.id} className="flex flex-col group">
                <div className="relative w-full aspect-video md:aspect-2/1 rounded-2xl overflow-hidden bg-gray-100 shadow-md mb-8">
                  <div className="absolute top-4 left-4 z-10">
                     <span className="bg-black text-white text-xs font-bold uppercase px-3 py-1.5 tracking-wider">
                        {article.department}
                     </span>
                  </div>
                  {coverId && (
                    <Image
                      src={getGoogleUrl(coverId)}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="text-center max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-6 text-gray-400 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium text-gray-900">{article.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  <Link href={`/${article.department.toLowerCase()}/blog/${article.id}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors cursor-pointer font-serif leading-tight">
                      {article.title}
                    </h2>
                  </Link>

                  <p className="text-gray-500 leading-relaxed mb-8">
                    {article.excerpt}
                  </p>

                  <Link 
                    href={`/${article.department.toLowerCase()}/blog/${article.id}`}
                    className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors rounded-sm"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="w-full h-px bg-gray-100 mt-20" />
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}