import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Collection from "@/models/collection";
import { getServerSession } from "next-auth";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const mediaId = searchParams.get("mediaId");
    const session = await getServerSession(authOptions);

    const collections = await Collection.find({ userId: session.user.id });

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
