"use client";
import "./home.css";
import { Image } from "primereact/image";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import logo from "./imgs/logo.jpg";
import img1 from "./imgs/img1.jpg";
import img2 from "./imgs/img2.jpg";
import img3 from "./imgs/img3.jpg";
import img4 from "./imgs/img4.jpg";
import img5 from "./imgs/img5.jpg";
import img_1 from "./imgs/img_1.webp";
import img_2 from "./imgs/img_2.webp";
import img_3 from "./imgs/img_3.webp";
import img_4 from "./imgs/img_4.webp";
import img_5 from "./imgs/img_5.webp";
import img_6 from "./imgs/img_6.webp";
import img_7 from "./imgs/img_7.webp";
import img_8 from "./imgs/img_8.webp";
import img_9 from "./imgs/img_9.webp";
import { Button } from "primereact/button";
import { nodeHome } from "./nodeHome";
const HomePage = () => {
  const arr: any = [
    img_1,
    img_2,
    img_3,
    img_4,
    img_5,
    img_6,
    img_7,
    img_8,
    img_9,
  ];
  const [data, setData] = useState<ILuxury[]>([]);
  useEffect(() => {
    setData(nodeHome.getLuxury());
  }, []);
  console.log(data);
  const header = (srcs: string) => {
    return (
      <Image src={srcs} className="w-full image cursor-pointer" alt="Image" />
    );
  };
  return (
    <>
      <div>
        <Image src={logo.src} className="w-full" alt="Image" />
        <div className="mt-3 grid flex">
          <div className="col-3 relative cursor-pointer">
            <Image src={img1.src} className="w-full image" alt="Image" />
            <p className="absolute bottom-[12%] left-[50%] -translate-x-[50%] flex justify-center align-items-center bg-[#fff] text-[15px] h-[25px] w-[55%] font-[600]">
              Áo sơ mi công sở
            </p>
          </div>
          <div className="col-3 relative cursor-pointer">
            <Image src={img2.src} className="w-full image" alt="Image" />
            <p className="absolute bottom-[12%] left-[50%] -translate-x-[50%] flex justify-center align-items-center bg-[#fff] text-[15px] h-[25px] w-[55%] font-[600]">
              Áo sơ mi casual
            </p>
          </div>
          <div className="col-3 relative cursor-pointer">
            <Image src={img3.src} className="w-full image" alt="Image" />
            <p className="absolute bottom-[12%] left-[50%] -translate-x-[50%] flex justify-center align-items-center bg-[#fff] text-[15px] h-[25px] w-[55%] font-[600]">
              Áo poplo
            </p>
          </div>
          <div className="col-3 relative cursor-pointer">
            <Image src={img4.src} className="w-full image" alt="Image" />
            <p className="absolute bottom-[12%] left-[50%] -translate-x-[50%] flex justify-center align-items-center bg-[#fff] text-[15px] h-[25px] w-[55%] font-[600]">
              Vest nam
            </p>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-[17px] font-[600]">Mã ưu đãi cho bạn</h2>
          <div className="mt-1 flex grid mx-0">
            <div className="col-3 h-6rem border-2  border-[red]">
              <div className="flex justify-between">
                <div>
                  <p className="text-[13px] font-[600]">
                    ƯU ĐÃI 10%, tối đa 300k
                  </p>
                  <p className="text-[12px]">Áp dụng cho VEST BỘ NAM</p>
                </div>
                <i className="pi pi-exclamation-circle text-[16px]"></i>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <p className="text-[12px]">
                    Mã: <span className="text-[13px] font-[600]">BOVEST</span>
                  </p>
                  <p className="text-[12px]">HSD: 20/01/2024</p>
                </div>
                <Button
                  label="Sao chép mã"
                  className=" w-[40%] rounded-[10px] h-2rem bg-[#080808] text-[#fff] text-[12px]"
                />
              </div>
            </div>
            <div className="col-3 h-6rem border-2  border-[red] ml-3">
              <div className="flex justify-between">
                <div>
                  <p className="text-[13px] font-[600]">
                    ƯU ĐÃI 20%, tối đa 600k
                  </p>
                  <p className="text-[12px]">Khi mua từ 02 sản phẩm</p>
                </div>
                <i className="pi pi-exclamation-circle text-[16px]"></i>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <p className="text-[12px]">
                    Mã: <span className="text-[13px] font-[600]">VC20</span>
                  </p>
                  <p className="text-[12px]">HSD: 20/01/2024</p>
                </div>
                <Button
                  label="Sao chép mã"
                  className=" w-[40%] rounded-[10px] h-2rem bg-[#080808] text-[#fff] text-[12px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="font-[600] text-[25px]">BỘ SƯU TẬP MỚI</h2>
          <div className="mt-2 grid flex">
            <div className="col-2">
              <Image
                src={img5.src}
                className="w-full image cursor-pointer"
                alt="Image"
              />
            </div>
            <div className="col-9"></div>
          </div>
        </div>
        <div className="mt-5 bg-[#fff] grid flex mx-0">
          <div className="col-8 ">
            <h2 className="text-[22px] font-[600] text-[#333333] mt-3 ml-3">
              SƠ MI LUXYRY - KHOÁC LÊN VẺ ĐẲNG CẤP
            </h2>
            <div className="grid flex mt-3 mx-[4%]">
              {data.map((item, index) => {
                return (
                  <div className="col-4 flex justify-between border-bottom-1 border-bluegray-400 cursor-pointer">
                    <Image
                      src={arr[index].src}
                      className="w-full mr-2"
                      alt="Image"
                    />
                    <div>
                      <p className="text-[13px]">{item?.description}</p>
                      <div className="flex justify-between mt-1 w-[140px]">
                        <p className="text-[red] text-[12px] font-[600]">
                          {item?.price}
                        </p>
                        <del className="text-[#3333] text-[12px]">
                          {item?.sale}
                        </del>
                        <span className="text-[red] text-[12px] flex align-items-center">
                          <i className="pi pi-minus text-[9px]"></i>
                          10%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-4 px-0 py-0">
            <Image
              src="https://theme.hstatic.net/1000102419/1001070932/14/home_collection_3_banner.jpg?v=603"
              className="w-full image"
              alt="Image"
            />
          </div>
        </div>
        <div className="mt-5">
          <h2 className="font-[600] text-[25px]">Bài Viết Mới Nhất</h2>
          <div className="mt-2 grid flex">
            <div className="col-3">
              <Card
                header={header(
                  "https://file.hstatic.net/1000102419/article/cac-kieu-ao-len-nam-dep-1_a879a2a16f214e889f9f5757bc614541_large.jpg"
                )}
                className="w-full"
              >
                <h2 className="font-[600] text-[15px]">
                  Gợi ý bạn kiểu áo len nam đẹp khi mùa đông về
                </h2>
                <p className="text-[14px]">
                  Trang phục len không chỉ có thể giữ ấm cho cơ thể mà còn làm
                  rất tốt nhiệm vụ...
                </p>
                <div className="mt-3 flex justify-between border-top-1 border-bluegray-400">
                  <p className="flex text-[12px] mt-2 opacity-7">
                    <i className="pi pi-calendar"></i>18 tháng 12, 2023
                  </p>
                  <p className="flex text-[12px] mt-2 opacity-7">
                    Xem thêm <i className="pi pi-angle-double-right"></i>
                  </p>
                </div>
              </Card>
            </div>
            <div className="col-3">
              <Card
                header={header(
                  "https://file.hstatic.net/1000102419/article/1207x740_519b81e4df2042ae841af8b57a214297_large.jpg"
                )}
                className="w-full"
              >
                <h2 className="font-[600] text-[15px]">
                  Mừng khai trương showroom merriman quảng ngãi
                </h2>
                <p className="text-[14px]">
                  Tiếp nối sự thành công của chuỗi showroom merriman trải khắp
                  Bắc-Trung-Nam
                </p>
                <div className="mt-3 flex justify-between border-top-1 border-bluegray-400">
                  <p className="flex text-[12px] mt-2 opacity-7">
                    <i className="pi pi-calendar"></i>14 tháng 12, 2023
                  </p>
                  <p className="flex text-[12px] mt-2 opacity-7">
                    Xem thêm <i className="pi pi-angle-double-right"></i>
                  </p>
                </div>
              </Card>
            </div>
            <div className="col-3">
              <Card
                header={header(
                  "https://file.hstatic.net/1000102419/article/quan-kaki-nam-ong-suong-1_7505aa42aad04473b429a4b0e88c03eb_large.jpg"
                )}
                className="w-full"
              >
                <h2 className="font-[600] text-[15px]">
                  Đổi gió phong cách công sở cùng quần Kaki nam
                </h2>
                <p className="text-[14px]">
                  Một trong những items luôn đứng top sản phẩm bán chạy nhất tại
                  Merriman chắc ...
                </p>
                <div className="mt-3 flex justify-between border-top-1 border-bluegray-400">
                  <p className="flex text-[12px] mt-2 opacity-7">
                    <i className="pi pi-calendar"></i>21 tháng 10, 2023
                  </p>
                  <p className="flex text-[12px] mt-2 opacity-7">
                    Xem thêm <i className="pi pi-angle-double-right"></i>
                  </p>
                </div>
              </Card>
            </div>
            <div className="col-3">
              <Card
                header={header(
                  "https://file.hstatic.net/1000102419/article/phong-cach-thoi-trang-cua-quy-ong-thanh-dat-1_c5aaa686432346809af0c58320a1eaf6_large.jpg"
                )}
                className="w-full"
              >
                <h2 className="font-[600] text-[15px]">
                  Khám phá phong cách thời trang của quý ông
                </h2>
                <p className="text-[14px]">
                  Ngày nay, đâu chỉ riêng phụ nữ mà đến cả các quý ông hiện đại
                  cũng rất để ý...
                </p>
                <div className="mt-3 flex justify-between border-top-1 border-bluegray-400">
                  <p className="flex text-[12px] mt-2 opacity-7">
                    <i className="pi pi-calendar"></i>12 tháng 11, 2023
                  </p>
                  <p className="flex text-[12px] mt-2 opacity-7">
                    Xem thêm <i className="pi pi-angle-double-right"></i>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
