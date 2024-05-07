import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import useMovieStore from "../services/MovieStore";
import { useState, useEffect } from "react";

const AccordianNavBar = () => {
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsFixed(scrollPosition > 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const setSelectedGenre = useMovieStore((s) => s.setSelectedGenre);
  const setSelectedType = useMovieStore((s) => s.setSelectedType);

  const { data: movieGenres, error } = useGenres("movie");
  const { data: seriesGenres } = useGenres("tv");

  return (
    <>
      {error && <div className="alert danger text-danger">Network error</div>}
      <Box
        pos={isFixed ? "fixed" : "relative"}
        top={isFixed ? 0 : ""}
        mt={isFixed ? "0px" : "10px"}
        transition={"margin-top 0.15s ease-in-out"}
        ml={3}
        width="100%"
      >
        <Accordion allowToggle w={"230px"}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Movies
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pt={0} pb={4}>
              <Button
                onClick={() => {
                  setSelectedGenre(null);
                  setSelectedType("movie");
                }}
                variant="ghost"
                width="100%"
              >
                Top Movies
              </Button>
              {movieGenres?.genres.map((genre) => (
                <Button
                  onClick={() => {
                    {
                      setSelectedGenre(genre);
                      setSelectedType("movie");
                    }
                  }}
                  key={genre.id}
                  variant="ghost"
                  width="100%"
                >
                  {genre.name}
                </Button>
              ))}
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Series
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pt={0} pb={4}>
              <Button
                onClick={() => {
                  setSelectedGenre(null);
                  setSelectedType("tv");
                }}
                variant="ghost"
                width="100%"
              >
                Top Series
              </Button>
              {seriesGenres?.genres.map((genre) => (
                <Button
                  onClick={() => {
                    {
                      setSelectedGenre(genre);
                      setSelectedType("tv");
                    }
                  }}
                  key={genre.id}
                  variant="ghost"
                  width="100%"
                >
                  {genre.name}
                </Button>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default AccordianNavBar;
