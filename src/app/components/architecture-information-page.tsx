import { Link } from "@/navigation";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import Cover from "./cover-pages";

interface Props {
  projects: WordPressFrontendPage[];
}

function ArchitecturePage(props: Props) {
  const { projects } = props;

  return (
    <div className="ArchitecturePage pb-[50px]">
      {projects &&
        projects.map((project, index) => (
          <Link href={`/architecture/${project.slug}`}>
            <Cover img={project.acf.architecture_projects.cover_project.url} />
          </Link>
        ))}
    </div>
  );
}

export default ArchitecturePage;
