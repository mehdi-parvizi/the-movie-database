import {
  Box,
  Button,
  Center,
  GridItem,
  Hide,
  SimpleGrid,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetails";
import getImageLink from "../services/getImageLink";
import Trailer from "../components/Trailer";
import Details from "../components/Details";
import Recommendation from "../components/Recommendation";
import { IoArrowBackOutline } from "react-icons/io5";
import useMovieStore from "../services/MovieStore";
import { useEffect } from "react";

const MediaPage = () => {
  const { id } = useParams();
  const { data: details, error } = useMovieDetails(id);
  const selectedType = useMovieStore((store) => store.selectedType);
  const setSelectedType = useMovieStore((s) => s.setSelectedType);

  useEffect(() => {
    const storedItem = window.localStorage.getItem("type");
    if (storedItem) setSelectedType(storedItem as "movie" | "tv");
  }, []);

  useEffect(() => {
    if (selectedType) {
      window.localStorage.setItem("type", selectedType);
    }
  }, [selectedType]);

  if (!details)
    return (
      <Center>
        <p>{error?.message}</p>;
      </Center>
    );
  return (
    <>
      <Hide above="md">
        <Center my={10}>
          <Link to={"/"}>
            <Button>
              <IoArrowBackOutline />
            </Button>
          </Link>
        </Center>
      </Hide>
      <Center>
        <h5>{details.original_title || details.original_name}</h5>
      </Center>
      <Center>
        <SimpleGrid
          alignItems={"center"}
          mt={10}
          columns={{ md: 1, lg: 2 }}
          justifyContent={"center"}
          backgroundSize={"cover"}
          backgroundImage={`linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),url(${getImageLink(
            details.backdrop_path
          )})`}
          p={{ base: 1, sm: 2, md: 10, lg: 20 }}
          boxShadow={"dark-lg"}
        >
          <GridItem mt={{ base: "55px" }}>
            <Trailer id={id!} />
          </GridItem>
          <GridItem
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            <Details details={details} />
          </GridItem>
        </SimpleGrid>
      </Center>
      <Center>
        <Box
          mt={20}
          overflowY={"scroll"}
          height={"30vh"}
          mb={{ base: "100px", sm: "150px", md: 55 }}
          borderWidth={1}
          boxShadow={"dark-lg"}
          bg={"gray"}
          borderRadius={10}
          w={"80vw"}
        >
          <Recommendation id={id || ""} />
        </Box>
      </Center>
    </>
  );
};

export default MediaPage;
