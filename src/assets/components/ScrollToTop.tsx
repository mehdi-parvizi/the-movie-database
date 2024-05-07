import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiSolidArrowFromBottom } from "react-icons/bi";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      scrollPosition > 1200 ? setIsVisible(true) : setIsVisible(false);
    };
    addEventListener("scroll", handleScroll);
    return () => addEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Button
        bg={"gray.700"}
        zIndex={8500}
        onClick={() => window.scroll(0, 0)}
        position={"fixed"}
        color={"gold"}
        right={isVisible ? 25 : -80}
        transition={"right 0.2s ease-in-out"}
        bottom={{ base: 85, sm: 85, md: 45 }}
      >
        <BiSolidArrowFromBottom size={"25px"} />
      </Button>
    </>
  );
};

export default ScrollToTop;
