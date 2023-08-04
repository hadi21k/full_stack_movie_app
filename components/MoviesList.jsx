import Media from "./Media";

const MoviesList = ({ movies, title }) => {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">
        <span>{title}</span>
      </h1>
      <div className="overflow-x-scroll scrollbar-none flex gap-4 snap-mandatory snap-x">
        {movies.map((movie) => (
          <Media media={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
