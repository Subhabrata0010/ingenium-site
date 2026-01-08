// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to get Google Drive image URL
export function getGoogleImageUrl(id: string): string {
  if (!id) return '/images/placeholder.jpg';
  return `https://lh3.googleusercontent.com/${id}`;
}

// Helper to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Helper to calculate read time from content
export function calculateReadTime(paragraphs: string[]): string {
  const wordsPerMinute = 200;
  const totalWords = paragraphs.join(' ').split(/\s+/).length;
  const minutes = Math.ceil(totalWords / wordsPerMinute);
  return `${minutes} min read`;
}

// Helper to get category styles
export function getCategoryStyles(category: string) {
  switch (category?.toLowerCase()) {
    case "prayukti":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        accent: "bg-emerald-600"
      };
    case "abhayaman":
      return {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        border: "border-indigo-200",
        accent: "bg-indigo-600"
      };
    case "archive":
      return {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        accent: "bg-rose-600"
      };
    default:
      return {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        accent: "bg-blue-600"
      };
  }
}