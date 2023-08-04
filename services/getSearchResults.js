export const getSearchResults = async (searchTerm) => {
  try {
    if (!searchTerm) throw new Error("Search term is required");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search?s=${searchTerm}`,
      {
        next: { revalidate: 60 },
      }
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};
