"use client";

import Navbar from "@/components/navbar/navbar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import Content from "@/components/content/Content";
import ContentFoot from "@/components/contentFoot/contentFoot";
import React, { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import LienHe from "@/components/lienhe/LienHe";
const Collection = () => {
  const op = useRef<any>(null);

  return (
    <>
      <div>
        <p
          className="py-2 text-[13px] opacity-70 text-[#000]"
          style={{ wordSpacing: "5px !important" }}
        >
          Trang chủ / Áo nam / Áo thun nam cao cấp - Áo polo nam cao cấp
        </p>
        <div className="grid flex">
          <div className="col-3">
            <Navbar />
          </div>
          <div className="col-9">
            <Content />
          </div>
        </div>
        <div className="mt-3">
          <ContentFoot />
        </div>
        <LienHe />
      </div>
    </>
  );
};
export default Collection;
