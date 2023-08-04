import Collection from "./Collection";

const Collections = ({ collectionsData, media }) => {
  return (
    <div className="space-y-3">
      {collectionsData?.length > 0 ? (
        collectionsData?.map((collection) => (
          <Collection
            collection={collection}
            media={media}
            key={collection._id}
          />
        ))
      ) : (
        <h1 className="text-xl font-semibold">
          <span>No collections</span>
        </h1>
      )}
    </div>
  );
};

export default Collections;
