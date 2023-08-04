import CreateForm from "@/components/CreateForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getMovieDetails } from "@/services/getMovieDetails";

const page = async ({ params, searchParams }) => {
  // if didn't work switch to params
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  const data = await getMovieDetails(params.id, searchParams.type);
  console.log(data);
  return (
    <div
      style={{
        backgroundImage: `url(${data.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="text-white min-h-screen flex items-center justify-center"
    >
      <CreateForm media={data} />
    </div>
  );
};

export default page;
