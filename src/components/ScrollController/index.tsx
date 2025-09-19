import React, { useEffect } from "react";

interface ScrollControllerProps {
  onScrollChange: (scrollY: number) => void;
}

const ScrollController: React.FC<ScrollControllerProps> = ({
  onScrollChange,
}) => {
  useEffect(() => {
    const handleScroll = () => {
      onScrollChange(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScrollChange]);

  return null;
};

export default ScrollController;
