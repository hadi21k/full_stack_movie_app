"use client";
import YouTube from "react-youtube";

const YoutubeTrailer = ({ trailer, trailerRef }) => {
  return (
    <div ref={trailerRef} className="mt-4 scroll-m-[60px]">
      <YouTube
        videoId={trailer?.key}
        opts={{ width: "100%", height: "400px" }}
      />
    </div>
  );
};

export default YoutubeTrailer;
