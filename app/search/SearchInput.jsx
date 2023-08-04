"use client";
import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(search?.toString() || "");

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const searchSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      router.push(`/search?${createQueryString("s", searchTerm)}`);
    } else {
      router.push(`/search`);
    }
  };
  return (
    <form
      onSubmit={searchSubmit}
      className="flex justify-center items-center w-full mb-4"
    >
      <div class="relative">
        <label for="Search" class="sr-only">
          Search
        </label>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="px-4 py-2 text-white border bg-background rounded-md focus:outline-none max-sm:w-full placeholder:text-white"
          placeholder="Search for..."
        />

        <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" class="text-white hover:text-gray-300">
            <span class="sr-only">Search</span>
            <MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </span>
      </div>
    </form>
  );
};

export default SearchInput;
