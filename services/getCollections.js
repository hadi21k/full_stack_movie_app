export const getCollections = async (user_id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${user_id}/collections`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
