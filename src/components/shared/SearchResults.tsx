import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostLists from "./GridPostLists";

type searchResultProps = {
    isSearchFetching: boolean;
    searchedPosts: Models.Document[]; 
  };
  
  const SearchResults = ({
    isSearchFetching,
    searchedPosts,
  }: searchResultProps) => {
    if (isSearchFetching) return <Loader />;
  
    if (searchedPosts?.length > 0) return <GridPostLists posts={searchedPosts} />;
  
    return (
      <p className="text-light-4 mt-10 text-center w-full">No Results Found</p>
    );
  };
  
  export default SearchResults;
  