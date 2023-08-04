"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CollectionModal from "./CollectionModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "./ui/skeleton";

const Media = ({ media, collectionId }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const removeMediaFromCollection = async () => {
    try {
      await fetch(`/api/collections/collection/${collectionId}/media`, {
        method: "DELETE",
        body: JSON.stringify({
          mediaId: media.id || media.mediaId,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`flex flex-col relative ${
        !pathname.includes("/search") && "w-[400px]"
      }`}
    >
      <Link
        href={`/media_details/${media.id || media.mediaId}?type=${
          media.media_type || media.mediaType
        }`}
      >
        <div
          className={`${
            (pathname === "/" || pathname.includes("media_details")) &&
            "w-[400px] h-[230px]"
          }`}
        >
          <Image
            src={media.src}
            alt={media.title}
            width={350}
            height={350}
            quality={100}
            className={`rounded-2xl w-full h-auto cursor-pointer
            ${loading && "hidden"}`}
            priority={true}
            onLoadingComplete={() => setLoading(false)}
          />
          {loading && (
            <Skeleton
              className={`absolute inset-0 rounded-md w-auto bg-white/20 ${
                pathname.includes("/collections") && "h-[220px]"
              }`}
            />
          )}
        </div>
      </Link>
      {!loading && (
        <div className="absolute bottom-0 p-2 font-bold text-gray-200 flex justify-between items-center w-full">
          <div>
            <h4 className="max-w-xs">{media.title}</h4>
          </div>
          {!pathname.includes("/collections") && session && (
            <CollectionModal media={media} />
          )}
          {pathname.includes("/collections") && session && (
            <div
              className="w-9 h-9 bg-white/10 text-white hover:bg-white/20 backdrop-filter backdrop-blur-2xl flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer"
              onClick={removeMediaFromCollection}
            >
              <TrashIcon className="w-5 h-5 cursor-pointer" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Media;
