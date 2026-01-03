// components/ArticlePage.tsx
import React from 'react';
import Link from 'next/link';
import { Clock, Calendar, ChevronLeft } from 'lucide-react'; // Install lucide-react if needed
import BlogImage from '../Images/BlogImage';
import type { ArticleData } from '../../types/types';

export default function ArticlePage({ article }: { article: ArticleData }) {
  
  // Helper: Find all images that should appear after a specific paragraph index
  const getImagesForIndex = (index: number) => {
    return article.images.filter((img) => img.position === index);
  };

  return (
    <main className="min-h-screen bg-white pb-24">
      
      {/* 1. Top Navigation */}
      <nav className="max-w-4xl mx-auto px-6 py-8">
        <Link 
          href="/magazine" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Magazine
        </Link>
      </nav>

      {/* 2. Header Section */}
      <header className="max-w-3xl mx-auto px-6 mb-12 text-center">
        <div className="flex justify-center gap-2 mb-6">
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-100">
            {article.tags}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
          {article.title}
        </h1>

        <p className="text-xl text-gray-500 mb-8 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 border-y border-gray-100 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
               {article.author.name[0]}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900">{article.author.name}</p>
              <p className="text-xs text-gray-500">{article.author.role}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-2" /> {article.date}
            </span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-2" /> {article.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* 3. Main Content Render Loop */}
      <article className="max-w-3xl mx-auto px-6">
        <div className="prose prose-lg prose-slate prose-p:text-gray-700 prose-p:leading-8 prose-headings:font-bold prose-a:text-blue-600">
          
          {article.paragraphs.map((paragraph, index) => {
            // We use (index + 1) because humans count from line 1, not 0
            const imagesAtIndex = getImagesForIndex(index + 1);

            return (
              <React.Fragment key={index}>
                
                {/* Render the Text Paragraph */}
                <p dangerouslySetInnerHTML={{ __html: paragraph }} />

                {/* Render Images (if any exist for this position) */}
                {imagesAtIndex.map((img, imgIdx) => (
                  <BlogImage key={`${index}-img-${imgIdx}`} image={img} />
                ))}
                
              </React.Fragment>
            );
          })}

        </div>
        
        {/* Footer / End Marker */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
           <p className="text-gray-400 italic">End of Article</p>
        </div>
      </article>
    </main>
  );
}