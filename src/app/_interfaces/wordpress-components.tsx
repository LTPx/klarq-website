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
  information: InformationWp;
  projects: FeatureProjectWp[];
} 

export interface DecorPageWp {
  cover: ImageAcf;
  information: InformationWp;
  page_content: DecorContentWp;
} 

export interface ArchitectureSlugWp {
  cover_project: ImageAcf;
  title_project: string;
  date: string;
  description_project: string;
  images_project: ImageAcf[];
}

export interface DecorSlugWp {
  cover_project: ImageAcf;
  banner: BannerWp;
  projects: ProjectDecorWp[];
}

export interface BannerWp {
  title: string;
  description: string;
}

export interface ProjectDecorWp {
  title: string;
  date: string;
  description: string;
  gallery: ImageAcf[];
}

export interface ContactPageWp {
  cover: ImageAcf;
  description: string;
}

export interface PublicationsPageWp {
  publications: PublicationsWp[];
}

export interface PublicationsWp {
  image: ImageAcf;
  title: string;
  sub_title: string;
  url: string;
}

export interface FeatureProjectWp {
  project: ProjectPostWp;
}

export interface InformationWp {
  image: ImageAcf;
  description: string;
}

export interface DecorContentWp {
  title_banner: string;
  projects_decor: ProjectDecorWp[];
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
  description_service: string;
}

export interface teamHome {
  image_team: ImageAcf;
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

