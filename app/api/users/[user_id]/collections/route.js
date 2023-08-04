import Collection from "@/models/collection";

export const GET = async (req, { params }) => {
  try {
    const { user_id: userId } = params;
    const collections = await Collection.find({ userId });

    return new Response(JSON.stringify(collections), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
