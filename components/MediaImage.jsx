"use client";
import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { usePathname } from "next/navigation";

const MediaImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const pathname = usePathname();
  return (
    <div
      className={`relative ${
        pathname === "/" ? "w-36 h-24" : "w-72 h-48 max-sm:w-40 max-sm:h-28"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        quality={100}
        fill
        sizes="100vw"
        className="rounded-md h-auto w-auto"
        onLoadingComplete={() => setIsLoaded(false)}
      />
      {isLoaded && (
        <Skeleton className="absolute inset-0 rounded-md h-auto w-auto bg-white/20" />
      )}
    </div>
  );
};

export default MediaImage;
