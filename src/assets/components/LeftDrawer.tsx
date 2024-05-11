import { Box, Button } from "@chakra-ui/react";
import useGenres, { Genres } from "../hooks/useGenres";
import useMovieStore from "../services/MovieStore";
import { useNavigate } from "react-router";

const LeftDrawer = () => {
  const selectedType = useMovieStore((s) => s.selectedType);
  const { data: movieGenres } = useGenres(selectedType!) as {
    data: Genres;
    error?: any;
  };
  const isDrawerOpen = useMovieStore((s) => s.isDrawerOpen);
  const setIsDrawerOpen = useMovieStore((s) => s.setIsDrawerOpen);
  const setSelectedGenre = useMovieStore((s) => s.setSelectedGenre);

  const navigate = useNavigate();
  return (
    <Box
      transition={"left 0.15s ease-in-out"}
      pos={"fixed"}
      padding={2}
      top={0}
      zIndex={1500}
      height={"100vh"}
      w={"50vw"}
      bg={"black"}
      left={isDrawerOpen ? "0" : "-50vw"}
    >
      <Button
        mb={1}
        bg={"darkcyan"}
        w={"100%"}
        onClick={() => {
          setSelectedGenre(null), navigate("/");
        }}
      >
        {selectedType === "tv" ? "Top Series" : "Top Movies"}
      </Button>
      {movieGenres?.genres.map((genre) => (
        <Button
          width={"100%"}
          mb={1}
          height={"4vh"}
          value={"outline"}
          key={genre.id}
          bg={"gray.800"}
          color={"white"}
          onClick={() => {
            setSelectedGenre(genre), navigate("/");
          }}
        >
          {genre.name}
        </Button>
      ))}
      <Button
        bg={"salmon"}
        w={"100%"}
        height={"5vh"}
        onClick={() => setIsDrawerOpen(false)}
      >
        Close
      </Button>
    </Box>
  );
};

export default LeftDrawer;
