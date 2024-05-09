import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";
import usePerson, { PersonCreditsType } from "../hooks/usePerson";
import React from "react";
import useMovieStore from "../services/MovieStore";

const PersonCreditsCard = () => {
  const { data: personCredits, isLoading, error } = usePerson();
  const setPersonName = useMovieStore((s) => s.setPersonName);
  const personName = useMovieStore((s) => s.personName);

  if (error instanceof Error) return error.message;
  else console.log(`logged`, error);

  return (
    <>
      <Card
        color={"white"}
        zIndex={1000}
        ml={{ base: "5vw", xl: "15vw" }}
        width={{ base: 300, sm: 600, md: 500, lg: 700 }}
        height={{ base: 500, sm: 500, md: 500, lg: 600 }}
        backdropFilter={"blur(100px)"}
        position={"fixed"}
        backgroundColor="transparent"
      >
        <CardHeader>
          <Box color={"white"} display="flex" justifyContent="flex-end">
            <Button bg={"gray"} onClick={() => setPersonName(null)}>
              <IoCloseOutline color="white" />
            </Button>
          </Box>
        </CardHeader>
        <Center>
          <h4>{personName}</h4>
        </Center>
        {isLoading && (
          <Center>
            <Spinner />
          </Center>
        )}
        <CardBody color={"white"} overflowY={"scroll"}>
          {personCredits?.cast.map((item: PersonCreditsType, index: number) => (
            <React.Fragment key={index}>
              <p>
                {`${index + 1}  :`}
                {item.original_name || item.original_title}
                <br />
                {item.first_air_date || item.release_date}
              </p>
              <hr />
            </React.Fragment>
          ))}
        </CardBody>
      </Card>
    </>
  );
};

export default PersonCreditsCard;
