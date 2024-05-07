import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <Card style={{ backgroundColor: "gray" }} w={"275px"}>
      <Skeleton height={"350px"} />
      <CardBody>
        <SkeletonText style={{ backgroundColor: "gray" }} mb={2} />
        <SkeletonText style={{ backgroundColor: "gray" }} />
      </CardBody>
    </Card>
  );
};

export default SkeletonCard;
