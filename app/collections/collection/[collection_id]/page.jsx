import Media from "@/components/Media";
import { getCollection } from "@/services/getCollection";

const page = async ({ params }) => {
  const collection = await getCollection(params.collection_id);
  return (
    <div className="text-white mt-[60px]">
      <div className="container mx-auto space-y-4">
        <div className="space-y-2">
          <h1 className="lg:text-4xl text-xl font-bold capitalize">
            {collection.name}
          </h1>
          <span className="text-sm font-semibold">
            {collection.medias.length} saved media
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.medias.length > 0 ? (
            collection.medias.map((media) => (
              <Media
                key={media._id}
                media={media}
                collectionId={params.collection_id}
              />
            ))
          ) : (
            <h1 className="text-xl font-bold">No media saved yet</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
