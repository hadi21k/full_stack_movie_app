export const getCollection = async (collection_id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/collections/collection/${collection_id}`,
      {
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
