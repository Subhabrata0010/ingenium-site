import Image from "next/image";
import type { BlogImage as BlogImageType } from "../../types/types";

const getGoogleUrl = (id: string) => `https://lh3.googleusercontent.com/${id}`;

export default function BlogImage({ image }: { image: BlogImageType }) {
  if (!image.id) return null;

  return (
    <figure className="my-12 w-full">
      <div className="relative w-full aspect-video md:aspect-21/9 rounded-xl overflow-hidden shadow-xl bg-gray-100 border border-gray-100">
        <Image
          src={getGoogleUrl(image.id)}
          alt={image.caption || "Article illustration"}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1200px"
        />
      </div>
      {image.caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-3 font-medium italic">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
