import { Input } from "@chakra-ui/react";
import { useRef } from "react";
import useMovieStore from "../services/MovieStore";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const setSearchText = useMovieStore((s) => s.setSearchText);
  const searchText = useMovieStore((s) => s.searchText);
  const focusRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  return (
    <>
      <Input
        onChange={(e) => {
          setSearchText(e.target.value);
          searchText.length > 2 && navigate("/");
        }}
        className="rounded-5"
        w={{ sm: "70vw", md: "35vw", lg: "50vw" }}
        placeholder="Search..."
        bg={"transparent"}
        backdropFilter={"blur(10px)"}
        ref={focusRef}
      />
    </>
  );
};

export default SearchInput;
