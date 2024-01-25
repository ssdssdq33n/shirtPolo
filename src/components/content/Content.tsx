import { Image } from "primereact/image";
import img from "./images/aothunnam.webp";
const Content = () => {
  return (
    <>
      <Image src={img.src} alt="Image" className="w-full" width="100%" />
    </>
  );
};
export default Content;
