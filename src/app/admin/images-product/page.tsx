"use client";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import Loading from "./loading";
import { ToastContainer, toast } from "react-toastify";
import { mutate } from "swr";
// import { BlobToBase64 } from "@/components/convertBase64/conver";
import { getAllProduct } from "../products/ProductService";
import { useEffect, useState } from "react";
import ImageProductThaoTac from "./saveOrEdit";
import { Image } from "primereact/image";
import {
  createImageProduct,
  deleteImageProduct,
  getAllImageProduct,
  updateImageProduct,
} from "./imageService";

const ImageProduct = () => {
  const [products, setProduct] = useState<IImage[]>([]);
  const [renderData, setRenderData] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [dataProduct, setDataProduct] = useState<IProduct[]>([]);
  const [filebase64, setFileBase64] = useState<string>("");
  const [filebase642, setFileBase642] = useState<string>("");
  const [filebase643, setFileBase643] = useState<string>("");
  const [filebase644, setFileBase644] = useState<string>("");
  const [productDialog, setProductDialog] = useState<
    AddOrUpdate<Partial<IImage>>
  >({ visible: false, header: "", defaultValues: {} });
  const [data, setData] = useState<IImage>();
  const [giatri, setGiatri] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  useEffect(() => {
    setLoading(true);
    getAllImageProduct()
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
    getAllProduct()
      .then((res) => setDataProduct(res.data))
      .catch((err) => console.log(err));
    setLoading(false);
  }, [renderData]);
  const handleDelete = () => {
    setLoading(true);
    deleteImageProduct(data?.imageId)
      .then((res) => {
        if ((res.data = "thanh cong")) {
          setVisible(false);
          mutate("http://localhost:8080/images");
          setRenderData(!renderData);
          setProduct([...products]);
          toast.success("Xóa thành công");
        } else {
          toast.error("Xóa không thành công");
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteBodyTemplate = (rowData: IImage) => {
    return (
      <>
        <Button
          label="Xóa"
          onClick={() => {
            setVisible(true);
            setData(rowData);
          }}
          className="bg-[#DC2626] text-[#fff] w-[100%]"
        />
      </>
    );
  };
  const updateBodyTemplate = (rowData: IImage) => {
    return (
      <>
        <Button
          label="Chỉnh sửa"
          onClick={() => {
            setProductDialog({
              header: "Chỉnh sửa ảnh sản phẩm",
              visible: true,
              defaultValues: { ...rowData },
            });
          }}
          className="bg-[#06B6D4] text-[#fff] w-[100%]"
        />
      </>
    );
  };
  const productBody = (rowData: IImage) => {
    let product: IProduct | undefined = dataProduct.find(
      (item) => item.productId === rowData.productId
    );
    return <p>{product?.name}</p>;
  };
  const imageBody = (rowData: IImage) => {
    return (
      <>
        <Image src={rowData.imageProduct1} alt="image-product" />
      </>
    );
  };
  const imageBody2 = (rowData: IImage) => {
    return (
      <>
        <Image src={rowData.imageProduct2} alt="image-product" />
      </>
    );
  };
  const imageBody3 = (rowData: IImage) => {
    return (
      <>
        <Image src={rowData.imageProduct3} alt="image-product" />
      </>
    );
  };
  const callbackEditProduct = (data: IImage) => {
    console.log(data);
    // setLoading(true);
    // updateImageProduct(data.imageId, data).then((res) => {
    //   if (res) {
    //     setRenderData(!renderData);
    //     setProduct([...products]);
    //     setProductDialog({
    //       header: "",
    //       visible: false,
    //       defaultValues: {},
    //     });
    //     setFileBase64("");
    //     mutate("http://localhost:8080/images");
    //     toast.success("Chỉnh sửa ảnh sản phẩm thành công !");
    //   } else {
    //     toast.error("Không thành công !");
    //   }
    // });
  };
  const handleCallbackAddData = (data: any) => {
    // console.log(data["file1"]["0"]);
    let dataCreated: IImage = {
      file1: data["file1"]["0"],
      file2: data["file2"]["0"],
      file3: data["file3"]["0"],
      file4: data["file4"]["0"],
      productId: data["productId"],
    };
    console.log(dataCreated);
    if (dataCreated) {
      setLoading(true);
      createImageProduct(dataCreated).then((res) => {
        if (res) {
          setRenderData(!renderData);
          setProduct([...products]);
          setProductDialog({
            header: "",
            visible: false,
            defaultValues: {},
          });
          mutate("http://localhost:8080/images");
          toast.success("Thêm mới ảnh sản phẩm thành công !");
        } else {
          toast.error("Không thành công !");
        }
      });
    }
  };
  return (
    <div className="h-full">
      <ToastContainer />
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div className="flex justify-between">
            <span className="p-input-icon-right w-[30%]">
              <i className="pi pi-spin pi-spinner" />
              <InputText
                onChange={(e) =>
                  setGiatri({
                    ...giatri,
                    global: {
                      value: e.target.value,
                      matchMode: FilterMatchMode.CONTAINS,
                    },
                  })
                }
                id="name"
                placeholder=""
                className="w-full h-full border-1"
              />
            </span>
            <Button
              label="Thêm mới"
              className="w-[130px] h-[40px] text-[#fff] bg-[#475569]"
              onClick={() => {
                setFileBase64("");
                setProductDialog({
                  header: "Thêm mới ảnh sản phẩm",
                  visible: true,
                  defaultValues: {},
                });
              }}
            />
          </div>
          <DataTable
            filters={giatri}
            value={products}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            currentPageReportTemplate={
              "Hiển thị {first} đến {last} trong số {totalRecords} bản ghi"
            }
            rows={4}
            rowsPerPageOptions={[2, 4, 5]}
            className="datatable-responsive mt-2"
            responsiveLayout="scroll"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          >
            <Column
              field="productId"
              style={{ minWidth: "9rem" }}
              header="Tên sản phẩm"
              body={productBody}
            ></Column>
            <Column
              style={{ minWidth: "11rem" }}
              header="Ảnh sản phẩm 1"
              body={imageBody}
            ></Column>
            <Column
              style={{ minWidth: "11rem" }}
              header="Ảnh sản phẩm 2"
              body={imageBody2}
            ></Column>
            <Column
              style={{ minWidth: "11rem" }}
              header="Ảnh sản phẩm 3"
              body={imageBody3}
            ></Column>
            <Column
              style={{ minWidth: "6rem" }}
              body={deleteBodyTemplate}
            ></Column>
            <Column
              style={{ minWidth: "9rem" }}
              body={updateBodyTemplate}
            ></Column>
          </DataTable>
        </>
      )}
      <Dialog
        header="Bạn có chắc chắn muốn xóa"
        visible={visible}
        style={{ width: "27vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="flex justify-around">
          <Button
            className="text-[#fff] bg-[#0891B2] w-[25%]"
            onClick={handleDelete}
            label="Có"
          />
          <Button
            className=" text-[#fff] bg-[#475569] w-[25%]"
            onClick={() => setVisible(false)}
            label="Không"
          />
        </div>
      </Dialog>
      <ImageProductThaoTac
        filebase64={filebase64}
        setFileBase64={setFileBase64}
        filebase642={filebase642}
        setFileBase642={setFileBase642}
        filebase643={filebase643}
        setFileBase643={setFileBase643}
        filebase644={filebase644}
        setFileBase644={setFileBase644}
        dataProduct={dataProduct}
        visible={productDialog.visible}
        header={productDialog.header}
        defaultValues={productDialog.defaultValues}
        close={() =>
          setProductDialog({
            ...productDialog,
            visible: false,
            defaultValues: {},
          })
        }
        onSubmit={
          productDialog.header === "Chỉnh sửa ảnh sản phẩm"
            ? callbackEditProduct
            : handleCallbackAddData
        }
      />
    </div>
  );
};
export default ImageProduct;