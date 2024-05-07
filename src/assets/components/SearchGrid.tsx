import { Box, Center, HStack, SimpleGrid } from "@chakra-ui/react";
import useSearch from "../hooks/useSearch";
import PersonCard from "./PersonCard";
import MovieCard from "./MovieCard";
import useMovieStore from "../services/MovieStore";
import PersonCreditsCard from "./PersonCreditsCard";
import SkeletonCard from "./SkeletonCard";

const SearchGrid = () => {
  const { data: search } = useSearch();
  const personName = useMovieStore((s) => s.personName);
  const searchedText = useMovieStore((s) => s.searchText);

  const skeletons = [1, 2, 3, 4];
  return (
    <Box margin={10} pt={3}>
      <h5>Searching for: {searchedText}</h5>
      {search?.total_results === 0 && (
        <Center paddingRight={350}>
          <h5>No result was found</h5>
        </Center>
      )}
      <HStack>
        {!search &&
          skeletons.map((skeleton) => <SkeletonCard key={skeleton} />)}
      </HStack>
      <SimpleGrid
        spacing={3}
        alignContent={"start"}
        columns={{ sm: 1, md: 2, lg: 4, xl: 5 }}
      >
        {search?.results.map(
          (result) =>
            result.media_type === "person" && (
              <PersonCard key={result.id} person={result} />
            )
        )}
        {search?.results.map(
          (media) =>
            media.media_type !== "person" && (
              <MovieCard key={media.id} media={media} />
            )
        )}
        {personName && <PersonCreditsCard />}
      </SimpleGrid>
    </Box>
  );
};

export default SearchGrid;
