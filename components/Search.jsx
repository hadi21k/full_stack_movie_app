import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchResults from "./SearchResults";
import { useRouter } from "next/navigation";

const Search = () => {
  const MEDIA_NUMBER = 6;
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true);
    const getSearchResults = async () => {
      try {
        if (searchText) {
          const res = await fetch(
            `/api/search?s=${searchText}&media_number=${MEDIA_NUMBER}`
          );
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (err) {
        console.log(err);
      }
      setIsSearching(false);
    };
    getSearchResults();
  }, [searchText]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchText) router.push(`/search?s=${searchText}`);
  };
  return (
    <div className="relative max-md:hidden">
      <form onSubmit={handleSearch}>
        <label htmlFor="Search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          id="Search"
          placeholder="Search for..."
          className="w-96 rounded-md bg-black border border-primary placeholder:text-white p-2 text-white shadow-sm sm:text-sm focus:outline-none focus:w-[460px] transition-all duration-300"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" className="text-gray-100 hover:text-gray-600">
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </span>
      </form>
      {searchText && (
        <SearchResults
          searchResults={searchResults}
          isSearching={isSearching}
        />
      )}
    </div>
  );
};

export default Search;
