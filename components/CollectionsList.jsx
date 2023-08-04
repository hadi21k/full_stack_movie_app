"use client";
import Collection from "./Collection";
import { useState } from "react";

const CollectionsList = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
      {filteredData?.length > 0 ? (
        filteredData.map((collection) => (
          <div key={collection._id} className="space-y-3">
            <Collection
              collection={collection}
              setFilteredData={setFilteredData}
            />
          </div>
        ))
      ) : (
        <p>No collections found.</p>
      )}
    </div>
  );
};

export default CollectionsList;
