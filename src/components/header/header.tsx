"use client";
import React, { useState, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
const Header = () => {
  const op = useRef<any>(null);
  return (
    <div>
      <div className="card flex flex-wrap justify-content-center gap-3">
        <div
          className="flex justify-between cursor-pointer"
          onClick={(e) => op.current.toggle(e)}
        >
          <i className="pi pi-user text-[25px] flex align-items-center mr-2"></i>
          <div className="ml-1 text-[14px]">
            <p>Đăng nhập / Đăng ký</p>
            <p>
              Tài khoản của tôi <i className="pi pi-angle-down"></i>
            </p>
          </div>
        </div>
        <OverlayPanel ref={op}>
          <div className="grid w-[300px]">
            <h2 className="text-[18px] font-[500] pb-2 border-bottom-2 border-bluegray-400 px-5 flex justify-center">
              ĐĂNG NHẬP TÀI KHOẢN
            </h2>
            <span className="p-float-label mt-4">
              <InputText
                type="text"
                id="username"
                className="w-full h-3rem border-1 border-bluegray-200"
              />
              <label htmlFor="username">Username</label>
            </span>
            <span className="p-float-label mt-4">
              <InputText
                type="password"
                id="password"
                className="w-full h-3rem border-1 border-bluegray-200"
              />
              <label htmlFor="password">Password</label>
            </span>
            <p className="mt-1 w-full">
              This site is protected by reCAPTCHA and the Google{" "}
              <span className="text-[#2962ff]">Privacy Policy</span> and{" "}
              <span className="text-[#2962ff]">Terms of Service</span> apply.
            </p>
            <Button
              label="Đăng nhập"
              className="mt-2 w-full rounded-[15px] h-3rem bg-[#080808] text-[#fff]"
            />
            <p className="mt-2">
              Khách hàng mới?{" "}
              <span className="text-[#EAC93D] cursor-pointer">
                Tạo tài khoản
              </span>
            </p>
            <p className="mt-1">
              Quên mật khẩu?{" "}
              <span className="text-[#EAC93D] cursor-pointer">
                Khôi phục mật khẩu
              </span>
            </p>
          </div>
        </OverlayPanel>
      </div>
    </div>
  );
};
export default Header;
