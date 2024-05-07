import { Button } from "@chakra-ui/button";
import { IoIosSearch } from "react-icons/io";
import useSearch from "../hooks/useSearch";
import useMovieStore from "../services/MovieStore";
import { Spinner } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
  isClose: boolean;
}

const SearchButton = ({ onClick, isClose }: Props) => {
  const { isLoading } = useSearch();
  const searchedText = useMovieStore((s) => s.searchText);
  return (
    <Button
      mr={10}
      bg={isClose ? "gray.600" : "gray.700"}
      zIndex={1000}
      onClick={() => {
        onClick();
      }}
      rounded={50}
    >
      {isLoading && searchedText.length > 2 ? (
        <Spinner size={"sm"} />
      ) : (
        <IoIosSearch color="white" />
      )}
    </Button>
  );
};

export default SearchButton;
