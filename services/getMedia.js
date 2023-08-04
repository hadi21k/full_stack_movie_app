export async function getNowPlaying() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/media/movie/now_playing`,
    {
      next: { revalidate: 120 },
    }
  );
  return response.json();
}

export async function getPopular() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/media/movie/popular`,
    {
      next: { revalidate: 120 },
    }
  );
  return response.json();
}

export async function getTopRated() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/media/movie/top_rated`,
    {
      next: { revalidate: 120 },
    }
  );
  return response.json();
}

export async function getUpcoming() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/media/movie/upcoming`,
    {
      next: { revalidate: 120 },
    }
  );
  return response.json();
}

export async function getPopularTV() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/media/tv/popular`,
    {
      next: { revalidate: 120 },
    }
  );
  return response.json();
}

// export getTopRatedTV;

export async function getTopRatedTV(id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/media/tv/top_rated`,
    {
      next: { revalidate: 120 },
    }
  );
  return response.json();
}
