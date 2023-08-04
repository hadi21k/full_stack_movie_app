export const GET = async (req) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };
  try {
    const { searchParams } = new URL(req.url);
    const s = searchParams.get("s");
    const number = searchParams.get("media_number");
    const url = `https://api.themoviedb.org/3/search/multi?query=${s}`;

    const response = await fetch(url, options);
    const data = await response.json();

    const filteredData = data.results
      .filter((media) => media.backdrop_path && (media.name || media.title))
      .map((media) => {
        return {
          id: media.id,
          title: media.name || media.title,
          src: `https://image.tmdb.org/t/p/original${media.backdrop_path}`,
          media_type: media.media_type,
        };
      });

    if (number) {
      return new Response(JSON.stringify(filteredData.slice(0, number)), {
        status: 200,
      });
    }

    return new Response(JSON.stringify(filteredData), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
