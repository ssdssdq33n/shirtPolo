import { Image } from "primereact/image";
import { ILogo } from "@/types/header";
import React, { FunctionComponent } from "react";

const Logo: FunctionComponent<ILogo> = ({ src }) => {
  return (
    <div>
      <Image src={src} alt="Image" width="150" height="150" preview />
    </div>
  );
};

export default Logo;
