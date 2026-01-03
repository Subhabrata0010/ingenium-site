export type BlogImage = {
  id: string; 
  caption?: string;
  position: number;
};

export type Author = {
  name: string;
  role: string;
  avatar?: string;
};

export type ArticleData = {
  id: string;
  title: string;
  excerpt: string;
  paragraphs: string[];
  images: BlogImage[];
  author: Author;
  date: string;
  readTime: string;
  tags: 'Prayukti' | 'Abhayaman' | 'Article' | 'Editorial' | 'Alumni';
};