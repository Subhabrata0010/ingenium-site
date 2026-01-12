/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';

// --- DATA IMPORT ---
import prayuktiData from '../data/prayukti/blogs.json';
import archiveData from '../data/archive/blogs.json';
import utkarshiData from '../data/utkarshi/blogs.json';
import abohomanData from '../data/abohoman/blogs.json';
import sarvagyaData from '../data/sarvagya/blogs.json';

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
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gray-900 group">
      <div 
        className="flex transition-transform duration-700 ease-out h-full" 
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {articles.map((article, idx) => {
           const coverId = article.images?.[0]?.id || ''; 
           
           return (
            <div key={idx} className="w-full shrink-0 relative h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              {coverId ? (
                <Image 
                  src={getGoogleUrl(coverId)} 
                  alt={article.title} 
                  fill 
                  className="object-cover"
                  priority={idx === 0}
                />
              ) : (
                <div className="w-full h-full bg-gray-800" />
              )}
              
              <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12">
                <div className="max-w-4xl">
                  <span className="bg-white text-black text-xs font-bold uppercase tracking-wider px-3 py-1.5 mb-4 inline-block">
                    {article.department}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    {article.title}
                  </h2>
                  <Link 
                    href={`/${article.department.toLowerCase()}/blog/${article.id}`}
                    className="inline-flex items-center gap-2 text-white border-b-2 border-white pb-1 hover:border-blue-400 transition-colors font-medium"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
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
      
      <div className="absolute bottom-6 right-6 z-30 flex gap-2">
        {articles.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all ${current === idx ? 'bg-white w-8' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- COMPONENT: SECTION TILES ---
const SectionTiles = () => {
  const sections = [
    { 
      title: "Utkarshi", 
      color: "from-purple-600 to-purple-800", 
      link: "/utkarshi",
      description: "Excellence & Achievements"
    },
    { 
      title: "Abohoman", 
      color: "from-blue-600 to-blue-800", 
      link: "/abohoman",
      description: "Cultural Heritage"
    },
    { 
      title: "Prayukti", 
      color: "from-emerald-600 to-emerald-800", 
      link: "/prayukti",
      description: "Technical Innovations"
    },
    { 
      title: "Sarvagya", 
      color: "from-orange-600 to-orange-800", 
      link: "/sarvagya",
      description: "Knowledge & Wisdom"
    },
    { 
      title: "Archive", 
      color: "from-rose-600 to-rose-800", 
      link: "/archive",
      description: "Past Collections"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Sections</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {sections.map((section, idx) => (
          <Link 
            key={idx} 
            href={section.link}
            className="group relative h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${section.color}`} />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
              <h3 className="text-2xl font-bold mb-2 transform group-hover:scale-110 transition-transform duration-300">
                {section.title}
              </h3>
              <p className="text-sm text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {section.description}
              </p>
              <div className="w-12 h-1 bg-white/50 group-hover:w-20 transition-all duration-300"></div>
            </div>

            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const allArticles = [...utkarshiData, ...prayuktiData, ...abohomanData, ...sarvagyaData, ...archiveData];
  
  // Sort by date (most recent first)
  allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Featured carousel articles (first 5)
  const featuredArticles = allArticles.slice(0, 5);
  
  // Recent feed articles (max 6 on home page)
  const feedArticles = allArticles.slice(0, 6);

  return (
    <main className="min-h-screen bg-white pt-16">
      
      {/* 1. HERO CAROUSEL */}
      <HeroCarousel articles={featuredArticles} />

      {/* 2. SECTION TILES */}
      <SectionTiles />

      {/* 3. RECENT ARTICLES FEED (MAX 6) */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">Latest Updates</span>
          <h2 className="text-3xl font-bold text-gray-900">Recent Publications</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {feedArticles.map((article) => {
             const coverId = article.images?.[0]?.id;

             return (
              <article key={article.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                  <div className="absolute top-3 left-3 z-10">
                     <span className="bg-black text-white text-xs font-bold uppercase px-3 py-1.5 tracking-wider">
                        {article.department}
                     </span>
                  </div>
                  {coverId && (
                    <Image
                      src={getGoogleUrl(coverId)}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <Link href={`/${article.department.toLowerCase()}/blog/${article.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{article.author.name}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Articles Button */}
        <div className="text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors rounded-sm"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}