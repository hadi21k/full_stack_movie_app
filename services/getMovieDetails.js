export const getMovieDetails = async (movie_id, type) => {
  try {
    const res = await fetch(
      `${process.env.API_URL}/media/media_details/${type}/${movie_id}`,
      {
        next: { revalidate: 120 },
      }
    );

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};
