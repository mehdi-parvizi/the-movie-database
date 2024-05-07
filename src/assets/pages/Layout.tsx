import SearchBar from "../components/SearchBar";
import { Outlet } from "react-router-dom";
import { Box, Center, Show } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useMovieStore from "../services/MovieStore";
import SearchInput from "../components/SearchInput";

const Layout = () => {
  const showSearchBar = useMovieStore((s) => s.showSearchbar);
  return (
    <>
      <NavBar />
      <Show above="md">
        <Center>
          <SearchBar />
        </Center>
      </Show>
      <Show below="md">
        {showSearchBar && (
          <Box left={"19%"} mt={2} pos={"fixed"} zIndex={2500}>
            <SearchInput />
          </Box>
        )}
        <Footer />
      </Show>
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
