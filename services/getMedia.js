export async function getMedia(media_type, query) {
  try {
    const url = `https://api.themoviedb.org/3/${media_type}/${query}`;
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
        media_type: media_type,
      };
    });

    return filteredData;
  } catch (err) {
    console.error(err);
  }
}
