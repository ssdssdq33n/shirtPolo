"use client";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import { useForm } from "react-hook-form";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import { loginUser } from "./loginService";
import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { getEmail } from "../register/userService";
import XacThucEmail from "./Xacthuc";

type FormData = {
  tendangnhap: string;
  matkhau: string;
};
const Login = () => {
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      tendangnhap: "",
      matkhau: "",
    },
  });
  // console.log(watch("username"));
  const handleLogin = (data: any) => {
    console.log(data);
    loginUser(data)
      .then((res) => {
        if (res.data === "thanh cong") {
          console.log(true);
        } else {
          toast.error("Tài khoản không tồn tại");
        }
      })
      .catch((err) => console.log(err));
  };
  const header = (
    <div className="flex mt-4">
      <Link
        href={"/account/login"}
        className="w-[50%] flex justify-center font-[700] text-[#000] text-[25px] border-right-1 border-bluegray-100"
      >
        Đăng nhập
      </Link>
      <Link
        href={"/account/register"}
        className="w-[50%] flex justify-center text-[#cacaca] font-[700] text-[25px] border-left-1 border-bluegray-100 hover:text-[#000] transition-all"
      >
        Đăng ký
      </Link>
    </div>
  );
  return (
    <div className="w-full">
      <ToastContainer />
      <div className="card flex justify-content-center">
        <Card header={header} className="w-[600px] mt-[80px] mb-[150px]">
          <form onSubmit={handleSubmit(handleLogin)}>
            <span className="p-float-label mt-1">
              <InputText
                type="text"
                id="tendangnhap"
                {...register("tendangnhap", {
                  required: "Vui lòng nhập vào trường này",
                })}
                className="w-full h-3rem border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff]"
              />
              <label htmlFor="tendangnhap">Username</label>
            </span>
            {errors.tendangnhap?.message && (
              <p className="text-[red] font-[500] text-[15px]">
                <i className="pi pi-exclamation-triangle"></i>{" "}
                {errors.tendangnhap?.message}
              </p>
            )}
            <span className="p-float-label mt-4">
              <InputText
                type="password"
                id="matkhau"
                {...register("matkhau", {
                  required: "Vui lòng nhập vào trường này",
                })}
                className="w-full h-3rem border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff]"
              />
              <label htmlFor="password">Password</label>
            </span>
            {errors.matkhau?.message && (
              <p className="text-[red] font-[500] text-[15px]">
                <i className="pi pi-exclamation-triangle"></i>{" "}
                {errors.matkhau?.message}
              </p>
            )}
            <p className="mt-2">
              This site is protected by reCAPTCHA and the Google{" "}
              <span className="text-[#009dde]">Privacy Policy</span>
              and <span className="text-[#009dde]">Terms of Service</span>{" "}
              apply.
            </p>
            <div className="flex align-items-center mt-3">
              <Button
                type="submit"
                label="Đăng nhập"
                className="mt-1 w-[40%] rounded-[15px] h-3rem bg-[#080808] text-[#fff]"
              />
              <div className="ml-3">
                <p className="mt-1">
                  Khách hàng mới?{" "}
                  <span className="text-[#009dde] cursor-pointer">
                    Tạo tài khoản
                  </span>
                </p>
                <p className="mt-1">
                  Quên mật khẩu?{" "}
                  <span
                    onClick={() => setIsEmail(true)}
                    className="text-[#009dde] cursor-pointer"
                  >
                    Khôi phục mật khẩu
                  </span>
                </p>
              </div>
            </div>
          </form>
        </Card>
      </div>
      <XacThucEmail isEmail={isEmail} setIsEmail={setIsEmail} />
    </div>
  );
};
export default Login;
