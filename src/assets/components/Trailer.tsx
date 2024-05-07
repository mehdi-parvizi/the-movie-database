import { Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useVideo from "../hooks/useVideo";
import getVideoLink from "../services/getVideoLink";

interface Props {
  id: string;
}

const Trailer = ({ id }: Props) => {
  const [width, setWidth] = useState("640");
  const [height, setHeight] = useState("315");
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth < 640 ? "240" : "640");
      setHeight(window.innerWidth < 640 ? "165" : "315");
    };
    addEventListener("resize", handleResize);
    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);
  const { data, isLoading, error } = useVideo(id);
  if (data?.results.length === 0) return <p>{error?.message}</p>;
  if (isLoading) return <Spinner size={"xl"} />;

  return (
    <Center>
      <iframe
        className="frame"
        width={width}
        height={height}
        src={getVideoLink(data?.results[0].key!)}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </Center>
  );
};

export default Trailer;
