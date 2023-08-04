import SearchResult from "./SearchResult";

const SearchResults = ({ searchResults, isSearching }) => {
  return (
    <div className="absolute left-0 mt-2 bg-black p-2 rounded-xl w-full h-96 overflow-y-scroll scrollbar-none text-white z-50">
      {isSearching ? (
        <div>
          <h1>Searching...</h1>
        </div>
      ) : searchResults.length === 0 && !isSearching ? (
        <h1 className="text-white">No results found</h1>
      ) : (
        searchResults.map((result) => (
          <SearchResult key={result.id} result={result} />
        ))
      )}
    </div>
  );
};

export default SearchResults;
