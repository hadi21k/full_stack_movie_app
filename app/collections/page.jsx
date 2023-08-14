import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CollectionsList from "@/components/CollectionsList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="text-white mt-[60px]">
      <div className="container mx-auto px-1 sm:px-4">
        <h1>Collections</h1>
        <CollectionsList />
      </div>
    </div>
  );
};

export default page;
