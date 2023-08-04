"use client";
import Image from "next/image";
import { useState } from "react";

const Actor = ({ actor }) => {
  const [loading, setLoading] = useState(true);
  const { name, profile } = actor;
  return (
    <div className="space-y-2 w-full h-full">
      <Image
        src={profile}
        alt={name}
        width={200}
        height={50}
        className="rounded-xl max-w-fit w-auto h-auto"
        priority
        onLoadingComplete={() => setLoading(false)}
      />
      {!loading && <h1 className="text-sm font-semibold">{name}</h1>}
    </div>
  );
};

export default Actor;
