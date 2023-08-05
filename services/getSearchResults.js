export const getSearchResults = async (searchTerm, number) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };
  try {
    const url = `https://api.themoviedb.org/3/search/multi?query=${searchTerm}`;

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
      return filteredData.slice(0, number);
    }

    return filteredData;
  } catch (err) {
    console.log(err);
  }
};
