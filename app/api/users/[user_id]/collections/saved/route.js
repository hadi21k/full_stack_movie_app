import Collection from "@/models/collection";

export const GET = async (req, { params }) => {
  try {
    const { searchParams } = new URL(req.url);
    const mediaId = searchParams.get("mediaId");

    const { user_id: userId } = params;

    const collections = await Collection.find({ userId });

    const collectionsWithIsSaved = collections.map((collection) => ({
      ...collection.toObject(),
      isSaved: collection.medias.some(
        (media) => media.mediaId === Number(mediaId)
      ),
    }));

    return new Response(JSON.stringify(collectionsWithIsSaved), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
