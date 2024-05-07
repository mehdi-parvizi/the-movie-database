import { Box, HStack, Show } from "@chakra-ui/react";
import movingLogo from "../resources/dbMan-unscreen.gif";
import { Link } from "react-router-dom";
import useMovieStore from "../services/MovieStore";

const NavBar = () => {
  const setSearchText = useMovieStore((s) => s.setSearchText);
  return (
    <HStack>
      <Show above="md">
        <Box paddingLeft={50} paddingTop={5}>
          <Link to={"/"} onClick={() => setSearchText("")}>
            <img
              className="circular-video"
              src={movingLogo}
              height={95}
              width={95}
            />
          </Link>
        </Box>
      </Show>
    </HStack>
  );
};

export default NavBar;
