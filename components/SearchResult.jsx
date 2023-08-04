import Link from "next/link";
import MediaImage from "./MediaImage";

const SearchResult = ({ result }) => {
  return (
    <Link
      key={result.id}
      href={`media_details/${result.id}?type=${result.media_type}`}
    >
      <div className="flex items-center justify-between p-2 space-x-4">
        <MediaImage src={result.src} alt={result.title} />
        <h1 className="font-semibold flex-1 text-sm">{result.title}</h1>
      </div>
    </Link>
  );
};

export default SearchResult;
