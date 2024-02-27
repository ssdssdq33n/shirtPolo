"use client";

import { getProductId } from "@/app/admin/images-product/imageService";
import { getProduct, nodeService } from "@/app/admin/products/ProductService";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { InputNumber } from "primereact/inputnumber";
import "./page.css";
import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";
import { RadioButton } from "primereact/radiobutton";
import { postCartAndNumber } from "@/components/serviceCart/service";
import { mutate } from "swr";
import { ToastContainer, toast } from "react-toastify";

const ProductItem = ({ params }: { params: { id: string } }) => {
  let slug: number = Number.parseInt(params.id);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>();
  const [imageProduct, setImage] = useState<IImage[]>([]);
  const [dataSize, setSize] = useState<ISize[]>([]);
  const [value, setValue] = useState<number>(1);
  useEffect(() => {
    setSize(nodeService.getDataSize());
    setLoading(true);
    getProduct(slug)
      .then((res) => {
        if (res) {
          console.log(res.data);
          setProduct(res.data);
        }
      })
      .catch((err) => console.log(err));
    getProductId(slug)
      .then((res) => {
        console.log(res.data);
        setImage(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const [selectedSize, setSelectedSize] = useState<ISize>({
    key: "1",
    value: "S",
  });
  let size = dataSize.find((item) => item.key === product?.size);
  const itemTemplate = (item: IImage) => {
    return (
      <img
        src={`http://localhost:8080/images/imagesUpload/${item.imageProduct}`}
        style={{ width: "100%" }}
      />
    );
  };

  const thumbnailTemplate = (item: IImage) => {
    return (
      <img
        width={120}
        src={`http://localhost:8080/images/imagesUpload/${item.imageProduct}`}
      />
    );
  };
  const handleAddCart = () => {
    console.log(value);
    console.log(selectedSize);
    console.log(product);
    postCartAndNumber(selectedSize.value, product, value)
      .then((res) => {
        if (res) {
          mutate("http://localhost:8080/products");
          toast.success("Thêm giỏ hàng thành công !");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <ToastContainer />
          <p
            className="py-2 text-[13px] opacity-70 text-[#000]"
            style={{ wordSpacing: "5px !important" }}
          >
            Trang chủ / Danh mục sản phẩm - Merriman / Áo sơ mi caro nam ngắn
            tay Merriman
          </p>
          <div className="grid flex my-0 ">
            <div className="col-5 bg-[#fff]">
              <Galleria
                value={imageProduct}
                className="w-full"
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
              />
            </div>
            <div className="col-7 bg-[#fff]">
              <h2 className="text-[25px] font-[600] opacity-[0.8]">
                {product?.name}
              </h2>
              <div className="mt-2 w-full bg-[#FAFAFA] ">
                <div className="py-3 flex">
                  <h2 className="text-[20px] font-[500] ml-3 flex justify-start align-items-center w-[30%]">
                    {" "}
                    Giá:
                  </h2>
                  <p className="text-[red] text-[25px] font-[600] justify-center flex  align-items-center">
                    {product?.price}đ
                  </p>
                  <span className="ml-5 rounded-sm flex justify-center align-items-center w-5rem text-[red] font-[600] border-1 border-[red]">
                    -{product?.sale} %
                  </span>
                </div>
              </div>
              <div className="mt-4 flex">
                <h2 className="text-[20px] font-[500] ml-3 flex justify-start align-items-center w-[30%]">
                  {" "}
                  Kích thước:
                </h2>
                <div className="w-[60%] flex justify-between">
                  {dataSize.map((item, index) => {
                    return (
                      <div key={index} className="flex align-items-center">
                        <RadioButton
                          inputId={item.key}
                          name="size"
                          className="border-3 border-[#F0E68C] border-circle kichthuoc"
                          value={item}
                          onChange={(e) => setSelectedSize(e.value)}
                          checked={selectedSize?.key === item.key}
                        />
                        <label
                          htmlFor={item.key}
                          className="ml-2  cursor-pointer text-[20px] font-[600] opacity-[0.7]"
                        >
                          {item.value}
                        </label>
                      </div>
                      // <p
                      //   onClick={() => {
                      //     console.log(item.value);
                      //   }}
                      //   key={index}
                      //   className=" text-[#F0E68C] cursor-pointer text-[20px] font-[600] w-4rem flex justify-center align-items-center border-1 border-[#F0E68C] rounded-md"
                      // >
                      //   {item?.value}
                      // </p>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 flex">
                <h2 className="text-[20px] font-[500] ml-3 flex justify-start align-items-center w-[30%]">
                  {" "}
                  Số lượng:
                </h2>
                <InputNumber
                  value={value}
                  onValueChange={(e: any) => setValue(e.target.value)}
                  showButtons
                  buttonLayout="horizontal"
                  // style={{ width: "3rem" }}
                  className="border-2 rounded-md soluong"
                  decrementButtonClassName="p-button-secondary"
                  incrementButtonClassName="p-button-secondary"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                />
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  onClick={handleAddCart}
                  label="THÊM VÀO GIỎ HÀNG"
                  className="w-[47%] h-[3rem] border-1 border-[#FF0000] round-lg text-[#FF0000] text-[15px] font-[500]"
                />
                <Button
                  label="MUA NGAY"
                  className="w-[47%] h-[3rem] bg-[#FF0000] round-lg text-[#fff] text-[15px] font-[500]"
                />
              </div>
              <div className="mt-4 grid flex">
                <div className="col-4">
                  <div className="opacity-[0.7] flex">
                    <i className="pi pi-book mr-2"></i>
                    <p>Miễn phí chỉnh sửa</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="opacity-[0.7] flex">
                    <i className="pi pi-car mr-2"></i>
                    <p>Miễn phí ship đơn từ 1,000,000đ</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="opacity-[0.7] flex">
                    <i className="pi pi-phone mr-2"></i>
                    <p>Hỗ trợ 24/7</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="opacity-[0.7] flex">
                    <i className="pi pi-check-square mr-2 text-[#3B82F6]"></i>
                    <p>Mua hàng tích điểm</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="opacity-[0.7] flex">
                    <i className="pi pi-thumbs-up-fill mr-2 text-[#3B82F6]"></i>
                    <p>Mở hộp kiểm tra nhận hàng</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="opacity-[0.7] flex">
                    <i className="pi pi-directions-alt mr-2 text-[#3B82F6]"></i>
                    <p>Đổi trả nhanh chóng</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="border-bottom-2">
                  <h2 className="text-[20px] font-[600] flex justify-start align-items-center w-[30%]">
                    {" "}
                    MÔ TẢ SẢN PHẨM
                  </h2>
                </div>
                <div className="mt-3">
                  <p>{product?.decription}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default ProductItem;
