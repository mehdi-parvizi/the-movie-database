import {
  Badge,
  Box,
  Text,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Collapse,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import placeHolder from "../resources/imgPlaceholder.png";
import getImageLink from "../services/getImageLink";
import { Link } from "react-router-dom";
import useMovieStore from "../services/MovieStore";
import { MediaResults } from "../hooks/useSearch";
import Media from "../entities/Media";

interface Props {
  media: MediaResults | Media;
}

const MovieCard = ({ media }: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  const [showMore, setShowMore] = useState(Array(20).fill(false));
  const setSelectedType = useMovieStore((s) => s.setSelectedType);
  const searchedText = useMovieStore((s) => s.searchText);

  const handleClick = (index: number) => {
    setShowMore((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  const handleType = () => {
    if (searchedText.length < 3) return;
    setSelectedType(media.media_type);
  };
  return (
    <Box position="relative" mb={4}>
      <Card
        boxShadow={"dark-lg"}
        backgroundColor={"transparent"}
        padding={6}
        key={media.id}
        overflow={"visible"}
        rounded={10}
      >
        <Image
          src={getImageLink(media.poster_path)}
          className="rounded-2"
          fallbackSrc={placeHolder}
        />

        <CardHeader paddingX={0} color={"white"}>
          <Link
            onClick={() => {
              window.scroll(0, 0);
              handleType();
            }}
            to={`/media/${media.id}`}
          >
            <Box color={"white"}>
              <h5>
                {media.original_name || media.original_title}
                <br />
                {media.first_air_date ||
                  (media.release_date && (
                    <Badge variant={"outline"} colorScheme="purple">
                      {media.first_air_date
                        ? media.first_air_date.substring(0, 4)
                        : media.release_date.substring(0, 4)}
                    </Badge>
                  ))}
              </h5>
            </Box>
          </Link>
          <br />
          <Badge
            colorScheme={
              media.vote_average > 8
                ? "teal"
                : media.vote_average < 8 && media.vote_average > 7.3
                ? "green"
                : "yellow"
            }
          >
            {media.vote_average?.toFixed(1)}
          </Badge>{" "}
          out of {media.vote_count} users
        </CardHeader>
        <CardBody padding={0}>
          <Collapse
            color={"white"}
            startingHeight={70}
            in={isOpen}
            transition={{ exit: { delay: 0.1 }, enter: { duration: 0.5 } }}
            animateOpacity
          >
            <Text color={"white"}>{media.overview}</Text>
          </Collapse>
        </CardBody>

        <Center>
          <CardFooter paddingTop={5} paddingBottom={0} color={"white"}>
            <button
              className="btn btn-outline-light"
              onClick={() => {
                handleClick(media.id);
                onToggle();
              }}
            >
              {showMore[media.id] ? "Show less" : "Show more"}
            </button>
          </CardFooter>
        </Center>
      </Card>
    </Box>
  );
};

export default MovieCard;
