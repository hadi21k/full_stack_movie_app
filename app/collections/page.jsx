import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CollectionsList from "@/components/CollectionsList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getCollections } from "@/services/getCollections";

const page = async () => {
  // if didn't work switch to params
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const collectionsData = await getCollections();
  return (
    <div className="text-white mt-[60px]">
      <div className="container mx-auto px-1 sm:px-4">
        <h1>Collections</h1>
        <CollectionsList data={collectionsData} />
      </div>
    </div>
  );
};

export default page;
