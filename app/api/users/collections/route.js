import Collection from "@/models/collection";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    
    console.log(session);
    if (!session) throw new Error("Unauthorized");

    const collections = await Collection.find({ userId: session.user.id });

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
