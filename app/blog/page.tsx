/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import prayuktiData from '../../data/prayukti/blogs.json';
import archiveData from '../../data/archive/blogs.json';
import utkarshiData from '../../data/utkarshi/blogs.json';
import abohomanData from '../../data/abohoman/blogs.json';
import sarvagyaData from '../../data/sarvagya/blogs.json';

const getGoogleUrl = (id: string) => {
  if (!id) return '/images/placeholder.jpg';
  return `https://lh3.googleusercontent.com/${id}`;
};

const ARTICLES_PER_PAGE = 12;

export default function BlogPage() {
  const allArticles = [...utkarshiData, ...prayuktiData, ...abohomanData, ...sarvagyaData, ...archiveData];
  
  // Sort by date (most recent first)
  allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Get first 12 articles for page 1
  const articles = allArticles.slice(0, ARTICLES_PER_PAGE);
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  const currentPage = 1;

  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      <section className="max-w-6xl mx-auto px-6">
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => {
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

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <Link 
            href={`/blog/page/1`}
            className={`w-10 h-10 flex items-center justify-center border transition-colors ${
              currentPage === 1 
                ? 'pointer-events-none opacity-50 border-gray-200 text-gray-400' 
                : 'border-gray-200 text-gray-600 hover:border-black'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          
          {[...Array(Math.min(totalPages, 5))].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <Link
                key={pageNum}
                href={pageNum === 1 ? '/blog' : `/blog/page/${pageNum}`}
                className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                  pageNum === currentPage
                    ? 'bg-black text-white border-black'
                    : 'border-gray-200 text-gray-600 hover:border-black'
                }`}
              >
                {pageNum}
              </Link>
            );
          })}
          
          {totalPages > 1 && (
            <Link 
              href="/blog/page/2"
              className="h-10 px-4 border border-gray-200 text-gray-600 hover:border-black transition-colors flex items-center"
            >
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}