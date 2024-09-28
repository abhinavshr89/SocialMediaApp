import GridPostList from "@/components/shared/GridPostLists";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";
import { useState } from "react";

const Explore = () => {
  const { data: posts, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState("");

  // Debounce the search value
  const debounceValue = useDebounce(searchValue, 500);

  // Fetch posts based on the debounced search value
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debounceValue);

  // If no posts are available initially
  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  // Show search results if the searchValue is not empty
  const shouldShowSearchResults = searchValue !== "";

  // Check if there are no posts available
  const shouldShowNoPosts = !shouldShowSearchResults && posts.pages.every((page) => page.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full text-center">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img src="/assets/icons/search.svg" width={24} height={24} alt="search" />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium">All</p>
          <img src="/assets/icons/filter.svg" width={20} height={20} alt="filter" />
        </div>
      </div>

      {/* Results Section */}
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          // Show Search Results
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts?.documents || []} // Safeguard if searchedPosts is undefined
          />
        ) : shouldShowNoPosts ? (
          // Show message if no posts are available
          <p className="text-light-1 mt-10 text-center w-full">End of Posts</p>
        ) : (
          // Show Grid of Posts
          posts.pages.map((page, index) => (
            <GridPostList key={`page-${index}`} posts={page.documents} />
          ))
        )}
      </div>

      {/* Fetch More Posts Button */}
      {hasNextPage && (
        <div className="flex-center mt-10">
          <button
            onClick={() => fetchNextPage()}
            className="btn-primary"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;
