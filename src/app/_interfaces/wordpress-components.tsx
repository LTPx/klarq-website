import { ImageAcf } from "./wordpress-page";

export interface MediaFileWp {
  url: string;
  type: "video" | "image";
}

export interface HomePageWp {
  services: servicesHome[];
  description_home: string;
  team_section: teamHome;
}

export interface servicesHome {
  image: ImageAcf;
  title: string;
  description: string;
}

export interface teamHome {
  image: ImageAcf;
  name: string;
  profession: string;
  description: string;
}

