import Media from "@/components/Media";
import { getSearchResults } from "@/services/getSearchResults";
import SearchInput from "./SearchInput";
import SearchResult from "@/components/SearchResult";

const page = async ({ searchParams }) => {
  let searching = true;
  const searchResults = await getSearchResults(searchParams.s);
  searching = false;
  return (
    <main className="mt-[60px] text-white">
      <div className="container mx-auto px-4">
        <SearchInput />
        <div className="space-y-6">
          {!searching ? (
            searchResults ? (
              searchResults.map((result) => (
                <SearchResult key={result.id} result={result} />
              ))
            ) : (
              <div className="text-center text-white">No results found</div>
            )
          ) : (
            <div className="text-center text-white">Searching...</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default page;
