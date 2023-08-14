"use client";
import { getCollections } from "@/services/getCollections";
import Collection from "./Collection";
import { useState, useEffect } from "react";

const CollectionsList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/users/collections", {
          cache: "no-cache",
        });

        const data = await res.json();

        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [filteredData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
      {loading ? (
        <p>Loading...</p>
      ) : filteredData?.length > 0 ? (
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
