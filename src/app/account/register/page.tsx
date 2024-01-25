"use client";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import emailjs from "@emailjs/browser";
import "./register.css";
import { createUser, getEmail } from "./userService";
import { useRouter } from "next/navigation";
import Loading from "./loading";

type FormData = {
  name: string;
  email: string;
  tendangnhap: string;
  matkhau: string;
  id: string;
};
const Register = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isTen, setIsTen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [dulieu, setDulieu] = useState<FormData>();
  const [ranDom, setRanDom] = useState<any>();
  const [soBack, setSoBack] = useState<string>();
  const [err, setErr] = useState<string>();
  const toast = useRef<any>(null);
  const router = useRouter();
  // const [ran, setRan] = useState<string>(
  //   Math.floor(Math.random() * 10).toString() +
  //     Math.floor(Math.random() * 10).toString() +
  //     Math.floor(Math.random() * 10).toString() +
  //     Math.floor(Math.random() * 10).toString() +
  //     Math.floor(Math.random() * 10).toString() +
  //     Math.floor(Math.random() * 10).toString()
  // );
  const form = useRef<any>();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      tendangnhap: "",
      matkhau: "",
      id: "2",
    },
  });
  const SubmitForm = (data: any) => {
    console.log(data);
    setDulieu(data);
    setLoading(true);
    getEmail(data)
      .then((res) => {
        console.log(res);
        if (res.data === "ton tai") {
          setIsTen(true);
          setVisible(false);
        } else {
          setVisible(true);
          setSoBack(res.data.toString());
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
    // emailjs
    //   .sendForm(
    //     "service_uc1fvqg",
    //     "template_8ixxsjc",
    //     form.current,
    //     "c8Tmt6Zee9EkNwchm"
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
    console.log(soBack);
  };
  // console.log(watch("username"));
  const handleResetMa = () => {
    setLoading(true);
    getEmail(dulieu)
      .then((res) => {
        console.log(res);
        setSoBack(res.data.toString());
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmitData = (e: any) => {
    e.preventDefault();
    if (ranDom === undefined) {
      setErr(`Bạn chưa nhập mã`);
    } else if (ranDom.includes(soBack)) {
      setLoading(true);
      createUser(dulieu)
        .then((res) => {
          console.log(res);
          if (res) {
            setVisible(false);
            router.push("/account/login");
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else if (!ranDom.includes(soBack)) {
      setErr("Mã nhập không hợp lệ");
    }
  };
  const header = (
    <div className="flex mt-4">
      <Link
        href={"/account/login"}
        className="w-[50%] flex justify-center font-[700] text-[#cacaca] text-[25px] border-right-1 border-bluegray-100 hover:text-[#000] transition-all"
      >
        Đăng nhập
      </Link>
      <Link
        href={"/account/register"}
        className="w-[50%] flex justify-center text-[#000] font-[700] text-[25px] border-left-1 border-bluegray-100 "
      >
        Đăng ký
      </Link>
    </div>
  );
  // console.log(typeof watch("tendangnhap").length);
  // if (watch("tendangnhap").length > 0) {
  //   // setIsTen(false);
  // }
  return (
    <div className="w-full">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div className="card flex justify-content-center">
            <Card header={header} className="w-[600px] mt-[80px] mb-[150px]">
              <form ref={form} onSubmit={handleSubmit(SubmitForm)}>
                <span className="p-float-label mt-1">
                  <InputText
                    type="text"
                    id="name"
                    {...register("name", {
                      required: "Vui lòng nhập vào trường này",
                    })}
                    className="w-full h-3rem border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff]"
                  />
                  <label htmlFor="name">Họ và tên</label>
                </span>
                {errors.name?.message && (
                  <p className="text-[red] font-[500] text-[15px]">
                    <i className="pi pi-exclamation-triangle"></i>{" "}
                    {errors.name?.message}
                  </p>
                )}
                <span className="p-float-label mt-4">
                  <InputText
                    type="text"
                    id="email"
                    {...register("email", {
                      required: "Vui lòng nhập vào trường này",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Trường email không hợp lệ",
                      },
                    })}
                    className="w-full h-3rem border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff]"
                  />
                  <label htmlFor="email">Email</label>
                </span>
                {errors.email?.message && (
                  <p className="text-[red] font-[500] text-[15px]">
                    <i className="pi pi-exclamation-triangle"></i>{" "}
                    {errors.email?.message}
                  </p>
                )}
                <span className="p-float-label mt-4">
                  <InputText
                    onFocus={() => setIsTen(false)}
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
                {isTen ? (
                  <p className=" text-[red] font-[500] text-[15px]">
                    {" "}
                    <i className="pi pi-exclamation-triangle mr-1"></i>Tên đăng
                    nhập đã tồn tại
                  </p>
                ) : (
                  <></>
                )}
                <span className="p-float-label mt-4">
                  <InputText
                    type="password"
                    id="matkhau"
                    {...register("matkhau", {
                      required: "Vui lòng nhập vào trường này",
                      minLength: {
                        value: 6,
                        message: "Mật khẩu tối thiểu phải 6 ký tự",
                      },
                    })}
                    className="w-full h-3rem border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff]"
                  />
                  <label htmlFor="matkhau">Password</label>
                </span>
                {errors.matkhau?.message && (
                  <p className="text-[red] font-[500] text-[15px]">
                    <i className="pi pi-exclamation-triangle"></i>{" "}
                    {errors.matkhau?.message}
                  </p>
                )}
                <input
                  type="hidden"
                  value="2"
                  // onChange={(e) => setRan(e.target.value)}
                  // name="id"
                  {...register("id")}
                />
                <p className="mt-2">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <span className="text-[#009dde]">Privacy Policy </span>
                  and <span className="text-[#009dde]">
                    Terms of Service
                  </span>{" "}
                  apply.
                </p>
                <div className="flex align-items-center mt-3">
                  <Button
                    type="submit"
                    label="Đăng ký"
                    className="mt-1 w-[40%] rounded-[15px] h-3rem bg-[#080808] text-[#fff]"
                  />
                  <div className="ml-3">
                    <p className="mt-1">
                      Bạn đã có tài khoản ?{" "}
                      <Link
                        href={"/account/login"}
                        className="text-[#009dde] cursor-pointer"
                      >
                        Đăng nhập ngay
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </Card>
          </div>
          <Dialog
            className="z-1"
            header="Nhập mã email"
            visible={visible}
            style={{ width: "20vw" }}
            onHide={() => {
              setVisible(false);
              setRanDom("");
              setErr("");
            }}
          >
            <form>
              {/* <Toast className="z-3" ref={toast} position="top-right" /> */}
              <InputText
                value={ranDom}
                onChange={(e: any) => setRanDom(e.target.value)}
                className="border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff] w-full"
              />
              <span className="text-[red] mt-1">{err}</span>
              <div className="mt-3 flex justify-around">
                <Button
                  label="Gửi"
                  onClick={handleSubmitData}
                  className="bg-[#000] w-[35%] text-[#fff]"
                />
                <Button
                  onClick={handleResetMa}
                  type="reset"
                  label="Nhận lại mã"
                  className="text-[#43C1DE]"
                />
              </div>
            </form>
          </Dialog>
        </>
      )}
    </div>
  );
};
export default Register;
