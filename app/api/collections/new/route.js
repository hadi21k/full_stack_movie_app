import { connectToDB } from "@/utils/database";
import Collection from "@/models/collection";

export const POST = async (req) => {
  try {
    const { userId, collectionName, title, src, mediaId, mediaType } =
      await req.json();

    connectToDB();

    const collectionExisting = await Collection.findOne({
      userId,
      name: collectionName,
    });

    if (!collectionExisting) {
      const newCollection = new Collection({
        name: collectionName,
        backdrop_image: src,
        medias: [
          {
            title,
            src,
            mediaId,
            mediaType,
          },
        ],
        userId,
      });
      await newCollection.save();
    } else {
      return new Response(
        JSON.stringify({ message: "Collection Already Exists" }),
        { status: 400 }
      );
    }
    return new Response(JSON.stringify({ message: "Collection Created" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
