import Collection from "@/models/collection";
import { connectToDB } from "@/utils/database";

export const PATCH = async (req, { params }) => {
  try {
    const { collection_id } = params;
    const { title, src, mediaId, mediaType } = await req.json();

    if (!collection_id || !title || !mediaId || !mediaType || !src) {
      return new Response("Missing required fields.", { status: 400 });
    }

    connectToDB();

    const collection = await Collection.findById(collection_id);

    collection.medias.push({ title, src, mediaId, mediaType });

    await collection.save();

    return new Response(JSON.stringify(collection), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { collection_id } = params;
    const { mediaId } = await req.json();

    const collection = await Collection.findById(collection_id);

    collection.medias = collection.medias.filter(
      (media) => media.mediaId !== mediaId
    );

    await collection.save();

    return new Response(JSON.stringify(collection), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
};
