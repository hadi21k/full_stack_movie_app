"use client";
import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import CollectionModal from "./CollectionModal";

const MovieInformation = ({ media, trailer, trailerRef }) => {
  const [background, setBackground] = useState(media.backdrop_path);
  const { data: session } = useSession();
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex items-end"
    >
      <div className="min-h-[300px] bg-background/20 w-full flex items-center">
        <div className="container mx-auto py-4 gap-6 grid md:grid-cols-2 md:place-items-center">
          <div className="space-y-4">
            <h1 className="sm:text-4xl font-bold">{media.title}</h1>
            <h1 className="flex space-x-2 items-center">
              <StarIcon className="inline-block w-5 h-5 fill-yellow-500" />
              <div>
                <span className="font-semibold">
                  {media.vote_average.toFixed(1)}
                </span>{" "}
              </div>
              <div className="flex space-x-4">
                <p className="space-x-2">
                  {media.genres.map((genre) => (
                    <span className="font-medium" key={genre.id}>
                      {genre.name}
                    </span>
                  ))}
                </p>
                {media.runtime && (
                  <span>
                    {Math.floor(media.runtime / 60)}h {media.runtime % 60}m
                  </span>
                )}
                <span>{media.release_date.split("-")[0]}</span>
              </div>
            </h1>
            <p className="max-w-2xl">{media.overview.slice(0, 250)}</p>
            <div className="flex items-center space-x-3">
              {trailer && (
                <Button
                  className="bg-primary hover:bg-foreground text-white transition-colors duration-200"
                  onClick={() =>
                    trailerRef.current.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  Watch Trailer
                </Button>
              )}
              {session && <CollectionModal media={media} />}
            </div>
          </div>

          <div className="space-y-4 max-md:hidden">
            <div className="overflow-x-scroll scrollbar-none flex gap-4">
              {media.images.map((image) => (
                <Image
                  key={image}
                  src={image}
                  alt={image}
                  width={200}
                  height={200}
                  onClick={() => setBackground(image)}
                  className="rounded-md cursor-pointer w-auto h-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInformation;
