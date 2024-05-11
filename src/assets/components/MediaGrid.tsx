import useMedia from "../hooks/useMedia";
import { Box, Button, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeletons from "./Skeletons";
import useMovieStore from "../services/MovieStore";
const MediaGrid = () => {
  const { data, fetchNextPage, hasNextPage } = useMedia();
  const setSelectedType = useMovieStore((s) => s.setSelectedType);
  const setSelectedGenre = useMovieStore((s) => s.setSelectedGenre);
  const selectedGenre = useMovieStore((s) => s.selectedGenre);
  const selectedType = useMovieStore((s) => s.selectedType);
  const fetchedMediaCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        mt={10}
        ml={{ base: 5, md: 20 }}
        pt={10}
        w={"90%"}
      >
        <Button
          onClick={() => {
            setSelectedType("movie");
            setSelectedGenre(null);
          }}
          bg={selectedType === "movie" ? "gray.700" : "gray.800"}
          color={"white"}
          w={"49%"}
          rounded={30}
        >
          Movies
        </Button>
        <Button
          rounded={30}
          bg={selectedType === "tv" ? "gray.700" : "gray.800"}
          onClick={() => {
            setSelectedType("tv");
            setSelectedGenre(null);
          }}
          w={"49%"}
          color={"white"}
        >
          Series
        </Button>
      </Flex>
      <InfiniteScroll
        dataLength={fetchedMediaCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner size={"sm"} />}
      >
        <Box alignContent={"start"} margin={10}>
          {selectedType === "movie" && (
            <h4>{selectedGenre?.name || "Top Movies"}</h4>
          )}
          {selectedType === "tv" && (
            <h4>{selectedGenre?.name || "Top Series"}</h4>
          )}
          <SimpleGrid spacing={3} columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}>
            {!data && <Skeletons />}
            {data?.pages.map((medias, index) => (
              <React.Fragment key={index}>
                {medias.results.map((media) => (
                  <MovieCard key={media.id} media={media} />
                ))}
              </React.Fragment>
            ))}
          </SimpleGrid>
        </Box>
      </InfiniteScroll>
    </>
  );
};
export default MediaGrid;
