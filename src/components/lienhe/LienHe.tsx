"use client";
import React, { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
const LienHe = () => {
  const op = useRef<any>(null);
  return (
    <>
      <div
        className="shadow-6 cursor-pointer flex justify-center items-center justify-content-center w-[60px] h-[60px] border-circle bg-[#eac93d] border-solid border-2 border-[#fff]  fixed bottom-[100px] right-4"
        onClick={(e) => op.current.toggle(e)}
      >
        <div>
          <i className="pi pi-comments flex justify-center text-[#fff]"></i>
          <p className="flex justify-center text-[#fff] text-[13px]">Liên hệ</p>
        </div>
      </div>
      <OverlayPanel showCloseIcon ref={op}>
        <img
          src={
            "https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg"
          }
          alt="Bamboo Watch"
        ></img>
      </OverlayPanel>
    </>
  );
};
export default LienHe;
