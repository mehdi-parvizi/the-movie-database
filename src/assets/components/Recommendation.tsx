import { Box, Center, ListItem, OrderedList } from "@chakra-ui/react";
import useRecommendation from "../hooks/useMovie";
import { Link } from "react-router-dom";

interface Props {
  id: string;
}

const Recommendation = ({ id }: Props) => {
  const { data, error } = useRecommendation(id);
  if (!data) return <p>{error?.message}</p>;

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} flex={1}>
        <Box>
          <h5>Recommendations</h5>
          <Center>
            {data.results.length === 0 && <p>No Results were found</p>}
          </Center>
          <OrderedList>
            {data?.results.map((data) => (
              <Link key={data.id} to={`/media/${data.id}`}>
                <ListItem my={1}>
                  {data.media_type === "tv"
                    ? data.original_name
                    : data.original_title}
                </ListItem>
              </Link>
            ))}
          </OrderedList>
        </Box>
      </Box>
    </>
  );
};

export default Recommendation;
