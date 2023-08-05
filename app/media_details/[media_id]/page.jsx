import MovieDetails from "@/components/MovieDetails";
import { getMediaDetails } from "@/services/getMovieDetails";

const page = async ({ params, searchParams }) => {
  const data = await getMediaDetails(params.media_id, searchParams.type);
  return <MovieDetails data={data} />;
};

export default page;
