import { Link } from "@/navigation";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import Cover from "./cover-pages";

interface Props {
  projects: WordPressFrontendPage[];
}

function ArchitecturePage(props: Props) {
  const { projects } = props;
  console.log("this", projects);
  return (
    <div className="ArchitecturePage pb-[50px]">
      {projects &&
        projects.map((project) => (
          <Link key={project.id} href={`/architecture/${project.slug}`}>
            <img
              className="object-cover w-full h-[calc(100dvh-50px)]"
              src={project.acf.architecture_projects.cover_project.url}
            />
          </Link>
        ))}
    </div>
  );
}

export default ArchitecturePage;
