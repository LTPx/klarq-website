"use client";

import { useEffect, useState } from "react";
import { DecorPageWp } from "../_interfaces/wordpress-components";

import DecorPageDesktop from "./decor-page";
import DecorPageMobile from "./decor-page-mobile";

interface Props {
  decor_information: DecorPageWp;
}

function DecorWrapper({ decor_information }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <DecorPageMobile decor_information={decor_information} />
      ) : (
        <DecorPageDesktop decor_information={decor_information} />
      )}
    </div>
  );
}

export default DecorWrapper;
