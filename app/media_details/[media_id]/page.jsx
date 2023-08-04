import MovieDetails from "@/components/MovieDetails";
import { getMovieDetails } from "@/services/getMovieDetails";

const page = async ({ params, searchParams }) => {
  const data = await getMovieDetails(params.media_id, searchParams.type);
  return <MovieDetails data={data} />;
};

export default page;
