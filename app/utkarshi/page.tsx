'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Award } from 'lucide-react';
import utkarshiData from '../../data/utkarshi/blogs.json';

const getGoogleUrl = (id: string) => {
  if (!id) return '/images/placeholder.jpg';
  return `https://lh3.googleusercontent.com/${id}`;
};

export default function UtkarshiPage() {
  const articles = utkarshiData;

  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full mb-4">
            <Award className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Utkarshi</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Excellence & Achievements
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Celebrating outstanding achievements and excellence.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const coverId = article.images?.[0]?.id;
            
            return (
              <article key={article.id} className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-emerald-600 text-white text-xs font-bold uppercase px-3 py-1.5 tracking-wider rounded">
                      {article.department}
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
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  {/* Title */}
                  <Link href={`/utkarshi/blog/${article.id}`}>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {article.title}
                    </h2>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Author & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                        {article.author.name[0]}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{article.author.name}</p>
                        <p className="text-xs text-gray-500">{article.author.role}</p>
                      </div>
                    </div>

                    <Link 
                      href={`/utkarshi/blog/${article.id}`}
                      className="text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-20">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
            <p className="text-gray-600">Check back soon for new technical content!</p>
          </div>
        )}
      </section>
    </main>
  );
}