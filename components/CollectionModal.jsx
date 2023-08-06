"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Collections from "./Collections";

const CollectionModal = ({ media }) => {
  const { data: session } = useSession();
  const [collectionsData, setCollectionsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/users/collections/saved?mediaId=${media.id}`,
          {
            cache: "no-cache",
          }
        );

        const d = await res.json();

        setCollectionsData(d);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [session]);

  return (
    <Dialog>
      <DialogTrigger>
        <span className="w-9 h-9 bg-white/10 text-white hover:bg-white/20 backdrop-filter backdrop-blur-2xl flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer">
          <BookmarkIcon className="w-5 h-5" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            <h1 className="text-lg">Collections</h1>
            <Link
              href={`/create_collection/${media.id}?type=${media.media_type}`}
            >
              <span className="text-sm text-primary">New collection</span>
            </Link>
          </DialogTitle>
          <DialogDescription>
            {loading ? (
              <span>Loading...</span>
            ) : (
              <Collections collectionsData={collectionsData} media={media} />
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionModal;
