import { getProxyImageUrl } from "@/utils/image_proxy";
import { ImageAcf } from "../_interfaces/wordpress-page";

interface Props {
  images?: ImageAcf[];
}

function ArchitectureImages({ images = [] }: Props) {
  return (
    <div className="grid grid-cols-2 gap-y-[150px] architectureImages">
      {images.map((src, index) => {
        const mod = index % 6;
        let wrapperClass = "";
        let imageStyle: React.CSSProperties = {};

        if (mod === 0) {
          wrapperClass = "flex items-end justify-start";
          imageStyle = { height: "500px", width: "395px" };
        } else if (mod === 1) {
          wrapperClass = "";
          imageStyle = { height: "850px", width: "100%" };
        } else if (mod === 2 || mod === 5) {
          wrapperClass = "col-span-2";
          imageStyle = { height: "850px", width: "100%" };
        } else if (mod === 3) {
          wrapperClass = "";
          imageStyle = { height: "850px", width: "100%" };
        } else if (mod === 4) {
          wrapperClass = "flex items-end justify-end";
          imageStyle = { height: "500px", width: "395px" };
        }

        return (
          <div key={index} className={wrapperClass}>
            <img
              data-aos="fade-up"
              src={getProxyImageUrl(src.url)}
              alt={`Architecture ${index + 1}`}
              style={imageStyle}
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}

export default ArchitectureImages;
