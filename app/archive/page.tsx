/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, Archive as ArchiveIcon } from 'lucide-react';
import archiveData from '../../data/archive/blogs.json';

const getGoogleUrl = (id: string) => {
  if (!id) return '/images/placeholder.jpg';
  return `https://lh3.googleusercontent.com/${id}`;
};

export default function ArchivePage() {
  const articles = archiveData;

  // Group articles by year
  const articlesByYear = articles.reduce((acc: any, article) => {
    const year = new Date(article.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(article);
    return acc;
  }, {});

  const years = Object.keys(articlesByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero Section with handwritten year style */}
      <section className="max-w-6xl mx-auto px-6 mb-16 relative">
        {/* Decorative circles */}
        {/* <div className="absolute -top-10 -left-10 w-20 h-20 bg-emerald-400 rounded-full opacity-20"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-emerald-300 rounded-full opacity-15"></div>
        <div className="absolute bottom-0 left-1/4 w-16 h-16 bg-emerald-500 rounded-full opacity-10"></div> */}
        
        <div className="text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-full mb-6 border border-rose-200">
            <ArchiveIcon className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Archive</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Past Issues & Collections
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our rich history of publications and memorable stories from years past.
          </p>
        </div>
      </section>

      {/* Articles by Year */}
      <section className="max-w-6xl mx-auto px-6 relative">
        {/* Background decorative lines */}
        {/* <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30" style={{zIndex: 0}}>
          <path d="M 0 100 Q 200 150, 400 100 T 800 100" stroke="#10b981" strokeWidth="3" fill="none" />
          <path d="M 100 300 Q 300 250, 500 300 T 900 300" stroke="#10b981" strokeWidth="2" fill="none" />
          <circle cx="50" cy="150" r="15" fill="#10b981" />
          <circle cx="700" cy="350" r="20" fill="#10b981" />
        </svg> */}

        <div className="relative z-10">
          {years.map((year, yearIdx) => (
            <div key={year} className="mb-20">
              {/* Handwritten Year Display */}
              <div className="relative mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 relative z-10 pt-8">
                  {year}
                </h2>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articlesByYear[year].map((article: any) => {
                  const coverId = article.images?.[0]?.id;
                  
                  return (
                    <Link
                      key={article.id}
                      href={`/archive/blog/${article.id}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                        <div className="absolute top-3 left-3 z-10">
                          <span className="bg-rose-600 text-white text-xs font-bold uppercase px-3 py-1.5 tracking-wider rounded-full">
                            Archive
                          </span>
                        </div>
                        {coverId && (
                          <Image
                            src={getGoogleUrl(coverId)}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {article.date}
                          </span>
                          <span>{article.readTime}</span>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-sm font-bold">
                              {article.author.name[0]}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{article.author.name}</p>
                              <p className="text-xs text-gray-500">{article.author.role}</p>
                            </div>
                          </div>

                          <ArrowRight className="w-5 h-5 text-rose-600 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* More decorative circles at bottom
        <div className="absolute -bottom-20 right-0 w-40 h-40 bg-emerald-400 rounded-full opacity-10"></div>
        <div className="absolute -bottom-10 left-20 w-24 h-24 bg-emerald-500 rounded-full opacity-15"></div> */}
      </section>

      {/* Empty State */}
      {articles.length === 0 && (
        <div className="text-center py-20">
          <ArchiveIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No archived content yet</h3>
          <p className="text-gray-600">Check back soon for historical articles!</p>
        </div>
      )}
    </main>
  );
}