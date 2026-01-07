/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/articles/ArticlePage"; // Make sure path is correct
import prayuktiData from "@/data/prayukti/blogs.json";
import abhayamanData from "@/data/abhayaman/blogs.json";
import type { ArticleData } from "@/types/types";

const blogData: ArticleData[] = [...prayuktiData, ...abhayamanData].map((post: any) => ({
  ...post,
  tags: post.department,
}));
// 1. Generate Static Params (Pre-builds pages for faster loading)
export async function generateStaticParams() {
  return blogData.map((post) => ({
    id: post.id,
  }));
}

// 2. Helper to get category styles
const getCategoryStyles = (category: string) => {
  switch (category?.toLowerCase()) {
    case "pragati":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "abhayaman":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "news articles":
      return "bg-rose-50 text-rose-700 border-rose-200";
    default:
      return "bg-blue-50 text-blue-700 border-blue-200";
  }
};

// 3. The Page Component
export default function Page({ params }: { params: { id: string } }) {
  // Find the specific article from the JSON file
  const rawPost = blogData.find((p) => p.id === params.id);

  if (!rawPost) {
    return notFound(); // Returns the Next.js 404 page
  }

  // DATA MAPPING:
  // Your JSON has "department" but your component asks for "tags".
  // We map them here so you don't have to change your component code.
  const articleProps: ArticleData = rawPost;

  return <ArticlePage article={articleProps} />;
}
