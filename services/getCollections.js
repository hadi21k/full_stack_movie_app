import { headers } from "next/headers"
export const getCollections = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/users/collections`, {
      cache: "no-cache",
      headers: headers(),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
