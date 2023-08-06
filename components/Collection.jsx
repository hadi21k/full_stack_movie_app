"use client";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  CheckIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

const Collection = ({ collection, media }) => {
  const pathname = usePathname();
  const [name, setName] = useState(collection.name);
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [added, setAdded] = useState(collection.isSaved);
  const router = useRouter();

  const saveCollectionName = async (id, name) => {
    await fetch(`/api/collections/collection/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name }),
    });
    setEditing(false);
    window.location.reload();
  };

  const deleteCollection = async (id) => {
    try {
      fetch(`/api/collections/collection/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addMediaToCollection = async (id) => {
    try {
      await fetch(`/api/collections/collection/${id}/media`, {
        method: "PATCH",
        body: JSON.stringify({
          title: media.title || media.name,
          src: media.src || media.backdrop_image || media.backdrop_path,
          mediaId: media.id,
          mediaType: media.media_type,
        }),
      });
    } catch (error) {
      console.error(error);
    }
    setAdded(true);
    window.location.reload();
  };

  const removeMediaFromCollection = async (id) => {
    try {
      await fetch(`/api/collections/collection/${id}/media`, {
        method: "DELETE",
        body: JSON.stringify({
          mediaId: media.id,
        }),
      });
    } catch (error) {
      console.error(error);
    }
    setAdded(false);
    window.location.reload();
  };

  return (
    <>
      {pathname.includes("/collections") && (
        <Link href={`/collections/collection/${collection._id}`}>
          <div className="relative max-md:min-h-[250px] min-h-[180px]">
            <Image
              src={collection.backdrop_image}
              alt={collection.name}
              width={500}
              height={500}
              className={`rounded-xl h-auto w-auto ${isLoading && "hidden"}`}
              priority={true}
              onLoadingComplete={() => setIsLoading(false)}
            />
            {isLoading && (
              <Skeleton className="absolute inset-0 rounded-md h-full w-auto bg-white/20" />
            )}
          </div>
        </Link>
      )}

      <div className="flex items-center justify-between text-white w-full mt-2">
        {pathname.includes("/collections") ? (
          <>
            {editing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/20 rounded-xl p-1 focus:outline-none"
              />
            ) : (
              <h1 className="text-sm">{collection.name}</h1>
            )}
            <div className="flex items-center space-x-4">
              <TrashIcon
                className="w-5 h-5 cursor-pointer
                "
                onClick={() => deleteCollection(collection._id)}
              />
              {editing ? (
                <>
                  <XMarkIcon
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => setEditing(false)}
                  />
                  <CheckIcon
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => saveCollectionName(collection._id, name)}
                  />
                </>
              ) : (
                <PencilIcon
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setEditing(true)}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-sm">{collection.name}</h1>
            {added ? (
              <div
                className="p-1 bg-white/20 backdrop-filter backdrop-blur-xl rounded-full"
                onClick={() => removeMediaFromCollection(collection._id)}
              >
                <CheckIcon className="w-5 h-5 cursor-pointer" />
              </div>
            ) : (
              <div
                className="p-1 bg-white/20 backdrop-filter backdrop-blur-xl rounded-full"
                onClick={() => addMediaToCollection(collection._id)}
              >
                <PlusIcon className="w-5 h-5 cursor-pointer" />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Collection;
