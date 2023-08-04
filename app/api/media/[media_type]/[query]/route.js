import { NextResponse } from "next/server";

export async function GET(res, { params }) {
  try {
    const url = `https://api.themoviedb.org/3/${params.media_type}/${params.query}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    const filteredData = data.results.map((media) => {
      return {
        id: media.id,
        title: media.title || media.name,
        src: `https://image.tmdb.org/t/p/original${
          media.backdrop_path || media.poster_path
        }`,
        media_type: params.media_type,
      };
    });

    return NextResponse.json(filteredData);
  } catch (err) {
    return NextResponse.error(err);
  }
}
