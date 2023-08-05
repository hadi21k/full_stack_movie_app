"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = ({ media }) => {
  const router = useRouter();
  return (
    <div className="min-h-[400px] flex gap-6 overflow-x-scroll scrollbar-none snap-x snap-mandatory">
      {media.map((m) => (
        <Image
          key={m.id}
          src={m.src}
          alt={m.title}
          width={800}
          height={800}
          quality={100}
          priority
          className="rounded-2xl w-auto h-auto cursor-pointer snap-center"
          onClick={() =>
            router.push(`/media_details/${m.id}?type=${m.media_type}`)
          }
        />
      ))}
    </div>
  );
};

export default Hero;
