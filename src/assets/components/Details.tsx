import { Flex, Badge, Box, Text } from "@chakra-ui/react";
import Media from "../entities/Media";

interface Props {
  details: Media;
}

const Details = ({ details }: Props) => {
  return (
    <Box display={"flex"} flexDir={"column"}>
      <Flex
        mt={{ md: 5 }}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        <Badge variant={"outline"} colorScheme={"purple"}>
          {details?.release_date || details?.first_air_date}
        </Badge>
        <Box display={"flex"}>
          <Box>
            <Badge
              colorScheme={
                details.vote_average > 8
                  ? "green"
                  : details.vote_average > 7 && details.vote_average < 8
                  ? "yellow"
                  : "red"
              }
              mr={2}
            >
              {details?.vote_average}
            </Badge>
          </Box>
          <Box>Out of {details?.vote_count} Users</Box>
        </Box>
      </Flex>
      <Text p={5}>{details?.overview}</Text>
    </Box>
  );
};

export default Details;
