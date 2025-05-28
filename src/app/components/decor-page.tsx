"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/navigation";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import CoverDynamic from "./cover-dynamic";
import {
  DecorPageWp,
  InformationWp,
} from "../_interfaces/wordpress-components";
import CallToAction from "./call-to-action";
import DecorProjects from "./decor-projects";

interface Props {
  decor_information: DecorPageWp;
}

function DecorPage({ decor_information }: Props) {
  const [currentTitle, setCurrentTitle] = useState("");
  const [hasExpanded, setHasExpanded] = useState(false);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const handleExpandEnd = () => {
    setHasExpanded(true);
  };

  return (
    <div
      className="bg-white"
      style={{ overflowY: hasExpanded ? "scroll" : "hidden" }}
    >
      <div className="DecorPage relative h-[calc(100dvh-50px)] overflow-y-scroll snap-y snap-mandatory">
        <CoverDynamic
          img={decor_information.cover.url}
          information={decor_information.information}
          labelTitle="Decor"
        />
      </div>
      <div>
        <section className="py-[200px]">
          <CallToAction title={decor_information.page_content.title_banner} />
        </section>
        <section className="px-[40px] flex flex-col gap-[180px] pb-[130px]">
          {decor_information.page_content.projects_decor &&
            decor_information.page_content.projects_decor.map(
              (decor, index) => (
                <div key={index}>
                  <DecorProjects
                    title={decor.title}
                    description={decor.description}
                    images={decor.gallery}
                    date={decor.date}
                    url="/"
                  />
                </div>
              )
            )}
        </section>
      </div>
    </div>
  );
}

export default DecorPage;
