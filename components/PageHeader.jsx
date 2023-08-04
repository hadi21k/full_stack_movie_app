"use client";
import { useRouter, useSearchParams } from "next/navigation";

const PageHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  console.log(type);
  return (
    <nav>
      <ul className="flex space-x-4">
        <li
          className={`text-sm font-medium text-white cursor-pointer bg-primary px-2 py-1 rounded-xl hover:bg-primary/90 ${
            type === "movie" || !type ? "bg-primary/80" : ""
          }`}
          onClick={() => router.push("/?type=movie")}
        >
          Movies
        </li>
        <li
          className={`text-sm font-medium text-white cursor-pointer bg-primary px-2 py-1 rounded-xl hover:bg-primary/90 ${
            type === "tv" ? "bg-primary/80" : ""
          }`}
          onClick={() => router.push("/?type=tv")}
        >
          TV Shows
        </li>
      </ul>
    </nav>
  );
};

export default PageHeader;
