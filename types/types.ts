// types/types.ts
export interface BlogImage {
  id: string;
  caption?: string;
  position: number; // After which paragraph this image should appear
}

export interface Author {
  name: string;
  role: string;
}

export interface ArticleData {
  id: string;
  title: string;
  excerpt: string;
  department: string; // "Prayukti" | "Abhayaman" | "Archive"
  date: string;
  readTime: string;
  author: Author;
  paragraphs: string[];
  images: BlogImage[];
  tags?: string; // Mapped from department
}

export interface BlogPost extends ArticleData {
  category?: string;
}