"use client";
import React, { useRef, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import logo from "./images/logo.webp";
import { Image } from "primereact/image";
import "./header.css";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { CascadeSelect } from "primereact/cascadeselect";
import { MegaMenu } from "primereact/megamenu";
import Link from "next/link";
import { Badge } from "primereact/badge";
import { getAllCart } from "../serviceCart/service";
import { mutate } from "swr";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const Header = () => {
  const op = useRef<any>(null);
  const op1 = useRef<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [dataCart, setCart] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    getAllCart(localStorage.getItem("username"))
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(dataCart);
  let total = dataCart?.reduce((tong: any, item: any) => {
    return tong + item.quantity;
  }, 0);
  let mess: string | null = localStorage.getItem("username");
  // localStorage.removeItem("access");
  console.log(mess);
  const handleCart = () => {
    if (dataCart.length === 0) {
      toast.error("Bạn chưa có sản phẩm nào trong giỏ hàng !");
    } else {
      router.push("/cart");
    }
  };
  const countries = [
    {
      name: "Miền Bắc",
      code: "AU",
      states: [
        { cname: "Hải Phòng", code: "A-SY" },
        { cname: "Hà Nội", code: "A-NE" },
        { cname: "Hải Dương", code: "A-WO" },
      ],
    },
    {
      name: "Miền Trung",
      code: "CA",
      states: [{ cname: "Thanh Hóa", code: "C-MO" }],
    },
    {
      name: "Miền Nam",
      code: "US",
      states: [
        { cname: "Hồ Chí Minh", code: "US-LA" },
        { cname: "Cần Thơ", code: "US-SD" },
      ],
    },
  ];

  const [selectedQH, setSelectedQH] = useState<any>(null);
  const countries1 = [
    {
      name: "Australia",
      code: "AU",
    },
    {
      name: "Canada",
      code: "CA",
    },
    {
      name: "United States",
      code: "US",
    },
  ];
  return (
    <>
      <ToastContainer />
      <div className="flex grid px-[9%] mx-0 headder">
        <div className="col-2 Anh">
          <Image src={logo.src} alt="Image" width="250px" />
        </div>
        <div className="col-5">
          <div className="p-inputgroup flex-1 timKiem">
            <InputText placeholder="Tìm kiếm sản phẩm" />
            <span className="p-inputgroup-addon spanMau">
              <i className="pi pi-search"></i>
            </span>
          </div>
        </div>
        <div className="col-2 px-5">
          <div className="card flex justify-content-center CachTren">
            <div
              className="p-inputgroup flex-1"
              onClick={(e) => op.current.toggle(e)}
            >
              <span className="p-inputgroup-addon  DiaChi">
                <i className="pi pi-map-marker icon1"></i>
                <p>
                  Giao hoặc đến lấy tại
                  <p>
                    36 Đường Ích Ôn....<i className="pi pi-angle-down"></i>
                  </p>
                </p>
              </span>
            </div>
            <OverlayPanel ref={op} className="KhuVuc">
              <h1 className="InDam">KHU VỰC MUA HÀNG</h1>
              <hr />
              <div className="flex grid tinhThanh">
                <div className="col-6">
                  <p className="InDam">Tỉnh/Thành</p>
                  <div className="card flex justify-content-center vien">
                    <CascadeSelect
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.value)}
                      options={countries}
                      optionLabel="cname"
                      optionGroupLabel="name"
                      className="w-full md:w-14rem text-sm border border-black"
                      optionGroupChildren={["states"]}
                      placeholder="Tỉnh Thành"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <p className="InDam">Quận/Huyện</p>
                  <div className="card flex justify-content-center vien">
                    <CascadeSelect
                      value={selectedQH}
                      onChange={(e) => setSelectedQH(e.value)}
                      options={countries1}
                      optionLabel="cname"
                      optionGroupLabel="name"
                      className="w-full md:w-14rem text-sm border border-black"
                      optionGroupChildren={["states"]}
                      placeholder="-Chọn Quận/Huyện-"
                    />
                  </div>
                </div>
              </div>

              <div className="chuCard">
                <p className="">
                  <p className="InDam">Giao hoặc đến lấy tại:</p>
                  <p>36 Ông Ích Đường, Phường Hòa Thọ Đông, Quận Cẩm</p>
                  <p>Lệ,Đà Nẵng, Phường Hòa Thọ Đông, Quận Cẩm Lệ</p>
                </p>
              </div>

              <div className="chuCard1">
                <p>Chọn cửa hàng gần bạn nhất để tối ưu chi phí giao hàng.</p>
                <p>Hoặc đến lấy hàng</p>
              </div>
              <hr />
              <div className="flex grid chuCard2">
                <div className="col-1">
                  {" "}
                  <i className="pi pi-arrows-alt"></i>
                </div>
                <div className="col-11">
                  <p className="m-0">
                    <p className="InDam">Tiêu đề mặc định</p>
                    <p>36 Ông Ích Đường, Phường Hòa Thọ Đông, Quận Cẩm</p>
                    <p>36 Ông Ích Đường, Phường Hòa Thọ Đông, Quận Cẩm</p>
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex grid">
                <div className="col-1">
                  {" "}
                  <i className="pi pi-arrows-alt"></i>
                </div>
                <div className="col-11">
                  <p className="m-0">
                    <p className="InDam">363 Điện Biên Phủ</p>
                    <p>363 Điện Biên Phủ, Phường Hòa Khê, Quận Thanh Khê</p>
                  </p>
                </div>
              </div>
            </OverlayPanel>
          </div>
        </div>
        <div className="col-2 px-3">
          <div
            className="flex justify-between cursor-pointer CachTren"
            onClick={(e) => op1.current.toggle(e)}
          >
            <div className="">
              <span className="p-inputgroup-addon DiaChi">
                <i className="pi pi-user icon1"></i>
                <p>
                  Đăng nhập / Đăng ký
                  <p>
                    Tài khoản của tôi <i className="pi pi-angle-down"></i>
                  </p>
                </p>
              </span>
            </div>
          </div>
          <OverlayPanel ref={op1}>
            <div className="grid w-[300px] DN">
              <h2 className="text-[18px] font-[500] pb-2 px-5 flex justify-center InDam">
                ĐĂNG NHẬP TÀI KHOẢN
              </h2>
              <hr />
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
        <div
          className="text-[#fff]"
          onClick={() => {
            // localStorage.removeItem("access");
            // localStorage.removeItem("username");
            // localStorage.removeItem("role");
            axios
              .get("http://localhost:8080/logout", {
                headers: {
                  // "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("access"),
                },
              })
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  localStorage.clear();
                  Cookies.remove("role-token");
                  Cookies.remove("access-token");
                  router.push("/account/login");
                }
              })
              .catch((err) => console.log(err));
            // localStorage.clear();
          }}
        >
          dang xuat
        </div>
        <div className="col-1 GioHang px-2">
          <div onClick={handleCart} className="p-inputgroup-addon  DiaChi">
            <i className="pi pi-shopping-cart p-overlay-badge icon1">
              <Badge value={total} severity="danger"></Badge>
            </i>
            <p>Giỏ Hàng</p>
          </div>
        </div>
      </div>
      <div className="mx-0 my-0 px-[9%] card flex flex-wrap align-items-center justify-content-center">
        <div className="flex TrangChu">
          <div>
            <nav>
              <ul>
                <li>
                  <Link href="/">Trang Chủ</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <nav>
              <ul>
                <li>
                  <Link href="/collections">Sản Phẩm</Link>
                  <ul className="Down">
                    <li>
                      <a href="#">Áo Nam</a>
                    </li>
                    <hr />
                    <li>
                      <a href="#">Quần Nam</a>
                    </li>
                    <hr />
                    <li>
                      <a href="#">Veston Nam</a>
                    </li>
                    <hr />
                    <li>
                      <a href="#">Phụ Kiện</a>
                    </li>
                    <hr />
                    <li>
                      <a href="#">Thời Trang Công Sở Nữ</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <nav>
              <ul>
                <li>
                  <Link href="#">Đồng Phục</Link>
                  <ul className="Down">
                    <li>
                      <a href="#">Đồng Phục Công Sở Nam</a>
                    </li>
                    <hr />
                    <li>
                      <a href="#">Đồng Phục Công Sở Nữ</a>
                    </li>
                    <hr />
                    <li>
                      <a href="#">Đồng Phục Y Tế</a>
                    </li>
                    <hr />
                    <li>
                      <a href="#">Thông Tin Về Đồng Phục</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <nav>
              <ul>
                <li>
                  {" "}
                  <Link href="/phieu-qua-tang">Phiếu Quà Tặng</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <nav>
              <ul>
                <li>
                  <Link href="/bai-viet">Bài Viết</Link>
                  <ul className="Down">
                    <li>
                      <a href="#">Tin Tức</a>
                    </li>
                    <hr />
                    <li>
                      <a href="#">Khuyến Mại</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <nav>
              <ul>
                <li>
                  <Link href="/he-thong-cua-hang">Hệ Thống Cửa Hàng</Link>
                  <ul className="Down">
                    <li>
                      <Link href="/he-thong-cua-hang">Xem Thêm Chi Tiết</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
