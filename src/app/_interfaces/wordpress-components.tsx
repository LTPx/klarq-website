import { ImageAcf } from "./wordpress-page";

export interface MediaFileWp {
  url: string;
  type: "video" | "image";
}

export interface HomePageWp {
  services: servicesHome[];
  description_home: string;
  team: teamHome;
  information_home: InformationHome;
  slider: sliderHome[];
  carousel_images: ImageAcf[];
}

export interface sliderHome {
  title: string;
}

export interface servicesHome {
  image: ImageAcf;
  title: string;
  description: string;
}

export interface teamHome {
  first_team_member: teamInformation;
  second_team_member: teamInformation;
}

export interface teamInformation {
  image: ImageAcf;
  name: string;
  profession: string;
  description: string;
}

export interface InformationHome {
  title: string;
  description: string;
}

