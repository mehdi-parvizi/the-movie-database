import SkeletonCard from "./SkeletonCard";

const Skeletons = () => {
  const skeletons = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {skeletons.map((skeleton) => (
        <SkeletonCard key={skeleton} />
      ))}
    </>
  );
};

export default Skeletons;
