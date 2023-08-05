// export const getMovieDetails = async (movie_id, type) => {
//   try {
//     const res = await fetch(
//       `${process.env.API_URL}/media/media_details/${type}/${movie_id}`,
//       {
//         next: { revalidate: 120 },
//       }
//     );

//     const data = await res.json();

//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// };

const fetchAndParse = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

export const getMediaDetails = async (media_id, media_type) => {
  const movieUrl = `https://api.themoviedb.org/3/${media_type}/${media_id}`;
  const creditsUrl = `https://api.themoviedb.org/3/${media_type}/${media_id}/credits`;
  const imagesUrl = `https://api.themoviedb.org/3/${media_type}/${media_id}/images`;
  const videosUrl = `https://api.themoviedb.org/3/${media_type}/${media_id}/videos`;
  const recommendationsUrl = `https://api.themoviedb.org/3/${media_type}/${media_id}/recommendations`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  try {
    const [media, credits, images_, videos_, recommendations_] =
      await Promise.all([
        fetchAndParse(movieUrl, options),
        fetchAndParse(creditsUrl, options),
        fetchAndParse(imagesUrl, options),
        fetchAndParse(videosUrl, options),
        fetchAndParse(recommendationsUrl, options),
      ]);

    const cast = credits.cast
      ?.filter((actor, i) => actor.profile_path !== null && i < 12)
      .map((actor) => {
        return {
          id: actor.id,
          name: actor.name,
          character: actor.character,
          profile: `https://image.tmdb.org/t/p/original${actor.profile_path}`,
        };
      });

    const images = images_.backdrops
      ?.filter((image, i) => image.file_path !== null && i < 5)
      .map((image) => {
        return `https://image.tmdb.org/t/p/original${image.file_path}`;
      });

    const videos = videos_?.results
      ?.filter((media) => {
        return (
          media.site === "YouTube" &&
          (media.type === "Trailer" || media.type === "Clip") &&
          media.official === true
        );
      })
      .map((media) => {
        return {
          key: media.key,
          type: media.type,
        };
      });

    const recommendations = recommendations_.results
      ?.filter((media, i) => {
        return media.backdrop_path !== null && i < 6 && media.id != media_id;
      })
      .map((media) => {
        return {
          id: media.id,
          title: media.title || media.name,
          release_date: media.release_date,
          src: `https://image.tmdb.org/t/p/w500${media.backdrop_path}`,
          media_type: media.media_type,
        };
      });

    const filterData = {
      id: media.id,
      backdrop_path: `https://image.tmdb.org/t/p/original/${media.backdrop_path}`,
      imdb_id: media.imdb_id,
      title: media.original_title || media.name,
      overview: media.overview,
      runtime: media.runtime,
      vote_average: media.vote_average,
      vote_count: media.vote_count,
      genres: media.genres,
      release_date: media.release_date || media.first_air_date,
      cast,
      images,
      videos,
      recommendations,
      media_type: media_type,
    };

    return filterData;
  } catch (err) {
    console.log("Error");
    console.error(err);
  }
};
