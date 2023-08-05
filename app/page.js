import Hero from "@/components/Hero";
import MoviesList from "@/components/MoviesList";
import PageHeader from "@/components/PageHeader";
import { getMedia } from "@/services/getMedia";

export default async function Home({ searchParams }) {
  const nowPlayingData = getMedia("movie", "now_playing");
  const popularData = getMedia("movie", "popular");
  const top_ratedData = getMedia("movie", "top_rated");
  const upcomingData = getMedia("movie", "upcoming");
  const popularTvData = getMedia("tv", "popular");
  const top_ratedDataTv = getMedia("tv", "top_rated");

  const nowPlaying = await nowPlayingData;
  const popular = await popularData;
  const top_rated = await top_ratedData;
  const upcoming = await upcomingData;

  const popular_tv = await popularTvData;
  const topRated_tv = await top_ratedDataTv;

  return (
    <section className="text-white lg:ml-[200px] mt-[60px]">
      <div className="container space-y-4 mx-auto px-4">
        <PageHeader />

        {searchParams.type === "tv" ? (
          <>
            <MoviesList movies={topRated_tv} title="Top Rated" />
            <MoviesList movies={popular_tv} title="Popular" />
          </>
        ) : (
          <>
            <Hero media={nowPlaying} />
            <MoviesList movies={popular} title="Popular" />
            <MoviesList movies={top_rated} title="Top Rated" />
            <MoviesList movies={upcoming} title="Upcoming" />
          </>
        )}
      </div>
    </section>
  );
}
