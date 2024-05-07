import { Grid, GridItem, Show } from "@chakra-ui/react";
import MediaGrid from "../components/MediaGrid";
import ScrollToTop from "../components/ScrollToTop";
import SearchGrid from "../components/SearchGrid";
import useMovieStore from "../services/MovieStore";
import AccordianNavBar from "../components/AccordianNavBar";

const HomePage = () => {
  const searchText = useMovieStore((s) => s.searchText);
  return (
    <>
      <Grid
        templateAreas={{
          md: `"nav main"`,
        }}
        gridTemplateRows={{ base: "auto auto auto auto" }}
        gridTemplateColumns={{ base: "1fr", md: "230px 1fr" }}
      >
        <Show above="md">
          <GridItem mt={16} area={"nav"}>
            <AccordianNavBar />
          </GridItem>
        </Show>
        <GridItem area={"main"}>
          {searchText.length < 3 ? (
            <>
              <MediaGrid />
            </>
          ) : (
            <SearchGrid />
          )}
        </GridItem>
        <ScrollToTop />
      </Grid>
    </>
  );
};

export default HomePage;
