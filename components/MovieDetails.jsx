"use client";
import { useRef } from "react";
import MovieInformation from "./MovieInformation";
import MoviesList from "./MoviesList";
import Actor from "./Actor";
import YoutubeTrailer from "./YoutubeTrailer";

const MovieDetails = ({ data }) => {
  const trailerRef = useRef();
  const getTrailer = data?.videos.filter(
    (video) => video.type === "Trailer"
  )[0];
  return (
    <div className="text-white">
      <MovieInformation
        media={data}
        trailer={getTrailer}
        trailerRef={trailerRef}
      />
      <div className="container mx-auto space-y-4">
        {getTrailer?.key && (
          <YoutubeTrailer trailer={getTrailer} trailerRef={trailerRef} />
        )}
        {data?.cast.length > 0 && (
          <div className="space-y-3 mt-3">
            <h1 className="text-xl font-semibold">Actors</h1>
            <div className="overflow-x-scroll scrollbar-none flex gap-4 w-auto">
              {data.cast.map((actor) => (
                <Actor actor={actor} key={actor.id} />
              ))}
            </div>
          </div>
        )}
        {data?.recommendations.length > 0 && (
          <MoviesList movies={data.recommendations} title="Recommendation" />
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
