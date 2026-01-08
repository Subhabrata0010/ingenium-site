/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/articles/ArticlePage";
import archiveData from "@/data/archive/blogs.json";
import type { ArticleData } from "@/types/types";

const blogData: ArticleData[] = archiveData.map((post: any) => ({
  ...post,
  tags: post.department,
}));

// Generate Static Params
export async function generateStaticParams() {
  return blogData.map((post) => ({
    id: post.id,
  }));
}

// Generate Metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = blogData.find((p) => p.id === id);
  
  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} - Archive | Ingenium 4.0`,
    description: post.excerpt,
  };
}

// The Page Component
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rawPost = blogData.find((p) => p.id === id);

  if (!rawPost) {
    return notFound();
  }

  const articleProps: ArticleData = rawPost;

  return <ArticlePage article={articleProps} section="archive" />;
}