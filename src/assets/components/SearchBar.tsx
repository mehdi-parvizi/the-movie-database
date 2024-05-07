import {
  Box,
  Button,
  Center,
  HStack,
  SlideFade,
  useDisclosure,
} from "@chakra-ui/react";
import SearchButton from "./SearchButton";
import { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import useMovieStore from "../services/MovieStore";
import SearchInput from "./SearchInput";

const SearchBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [timer, setTimer] = useState(0);
  const showSearchBar = useMovieStore((s) => s.showSearchbar);
  const setShowSearchBar = useMovieStore((s) => s.setShowSearchbar);
  const focusRef = useRef<HTMLInputElement>(null);
  const searchBarHandler = () => {
    showSearchBar ? setTimer(0) : setTimer(70);
    setTimeout(() => {
      setShowSearchBar(!showSearchBar);
    }, timer);
  };

  const setSearchText = useMovieStore((s) => s.setSearchText);

  const handleClick = () => {
    onToggle();
    searchBarHandler();
    setTimeout(() => {
      focusRef.current?.focus();
    }, 10);
  };

  return (
    <Box maxW={"450px"} mt={1} top={"0"} pos={"fixed"} zIndex={2500}>
      <Center mb={"15px"}>
        <SearchButton onClick={handleClick} isClose={isOpen} />
      </Center>
      <Box>
        {showSearchBar && (
          <SlideFade in={isOpen}>
            <Center>
              <HStack pt={2}>
                <SearchInput />
                <Button
                  right={14}
                  style={{ backgroundColor: "transparent" }}
                  bg={"transparent"}
                  variant={"ghost"}
                  zIndex={1000}
                  onClick={() => {
                    searchBarHandler();
                    onToggle();
                    setSearchText("");
                  }}
                >
                  <IoCloseOutline />
                </Button>
              </HStack>
            </Center>
          </SlideFade>
        )}
      </Box>
    </Box>
  );
};

export default SearchBar;
