import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Collapse,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import placeHolder from "../resources/imgPlaceholder.png";
import useMovieStore from "../services/MovieStore";
import getImageLink from "../services/getImageLink";
import Person from "../entities/Person";

interface Props {
  person: Person;
}

const PersonCard = ({ person }: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  const [showMore, setShowMore] = useState(Array(20).fill(false));
  const handleClick = (index: number) => {
    setShowMore((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const setMediaId = useMovieStore((s) => s.setMediaId);
  const setPersonName = useMovieStore((s) => s.setPersonName);
  return (
    <Box key={person.id} position="relative" mb={4}>
      <Card
        color={"white"}
        boxShadow={"dark-lg"}
        backgroundColor={"transparent"}
        padding={6}
        overflow={"visible"}
      >
        {showMore && (
          <Image
            src={getImageLink(person.profile_path)}
            fallbackSrc={placeHolder}
            className="rounded-2"
          />
        )}
        <CardHeader paddingX={0}>
          <Box
            color={"white"}
            as="button"
            onClick={() => {
              setMediaId(person.id);
              setPersonName(person.original_name);
            }}
          >
            <h5>{person.original_name}</h5>
          </Box>
          <br />
          {person.known_for_department}
        </CardHeader>
        <CardBody color={"white"} padding={0}>
          <Collapse
            startingHeight={40}
            in={isOpen}
            transition={{ exit: { delay: 0.1 }, enter: { duration: 0.5 } }}
            animateOpacity
          >
            {person.known_for.map((item, index) => (
              <p key={index}>{item.original_name || item.original_title}</p>
            ))}
          </Collapse>
        </CardBody>

        <Center>
          <CardFooter color={"white"} paddingTop={5} paddingBottom={0}>
            <button
              className="btn btn-outline-light"
              onClick={() => {
                handleClick(person.id);
                onToggle();
              }}
            >
              {showMore[person.id] ? "Show less" : "Show more"}
            </button>
          </CardFooter>
        </Center>
      </Card>
    </Box>
  );
};

export default PersonCard;
