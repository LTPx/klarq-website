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

export interface ArchitecturePageWp {
  projects: FeatureProjectWp[];
} 

export interface ArchitectureSlugWp {
  cover_project: ImageAcf;
  title: string;
  date: string;
  description_project: string;
  images_project: ImageAcf[];
}

export interface FeatureProjectWp {
  project: ProjectPostWp;
}

export interface ProjectPostWp {
  ID: number;
  post_title: string;
  imageUrl: string;
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

