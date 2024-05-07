import { Box, Button } from "@chakra-ui/react";
import useMovieStore from "../services/MovieStore";

const Footer = () => {
  const setIsDrawerOpen = useMovieStore((s) => s.setIsDrawerOpen);
  const setShowSearchbar = useMovieStore((s) => s.setShowSearchbar);
  const setSearchText = useMovieStore((s) => s.setSearchText);
  const showSearchBar = useMovieStore((s) => s.showSearchbar);
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      left={0}
      right={0}
      w={"100%"}
      pos={"fixed"}
      zIndex={1000}
      bottom={0}
    >
      <Button
        bg={"black"}
        _hover={{ bg: "gray.900" }}
        variant={"outline"}
        rounded={0}
        flex={1}
        height={20}
        onClick={() => setIsDrawerOpen(true)}
      >
        Genre
      </Button>
      <Button
        bg={"black"}
        _hover={{ bg: "gray.900" }}
        variant={"outline"}
        rounded={0}
        flex={1}
        height={20}
        onClick={() => {
          setShowSearchbar(!showSearchBar);
          setSearchText("");
        }}
      >
        {showSearchBar ? "Close Search" : "Search"}
      </Button>
    </Box>
  );
};

export default Footer;
