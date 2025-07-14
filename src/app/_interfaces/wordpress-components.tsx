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

export interface DevelopmentPageWp {
  information: InformationWp;
  projects: FeatureProjectWp[];
}

export interface DecorPageWp {
  cover: MediaFileWp;
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

export interface DevelopmentSlugWp {
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
  kitchen_projects: ProjectsCategoryWp;
  rooms_projects: ProjectsCategoryWp;
  furniture_projects: ProjectsCategoryWp;
  textiles_projects: ProjectsCategoryWp;
  materials_projects: ProjectsCategoryWp;
}

export interface ProjectsCategoryWp {
  category: CategoryResultWp;
  category_introduction: IntroductionProjectWp[];
  category_project: CategoryProject[];
}

export interface CategoryProject {
  project_category: ProjectCategoryItem[];
}

export interface ProjectCategoryItem {
  image_with_title: ImageWithTitlesWp;
  image_with_description: ImageWithDescriptionWp;
}

export interface ImageWithTitlesWp {
  image: ImageAcf;
  title: string;
  description_optional: string;
}

export interface ImageWithDescriptionWp {
  image: ImageAcf;
  description: string;
}


export interface CategoryProjectsWp {
  category: CategoryResultWp;
  category_introduction: IntroductionProjectWp[];
  category_project: ProjectCategoryWp[];
}

export interface CategoryResultWp {
  term_id: number;
  name: string;
  slug: string;
}

export interface IntroductionProjectWp {
  image: ImageAcf;
  description: string;
}

export interface ProjectCategoryWp {
  title: string;
  first_image: ImageAcf;
  second_image: ImageAcf;
  description: string;
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
