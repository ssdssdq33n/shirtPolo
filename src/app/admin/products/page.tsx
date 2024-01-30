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
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  nodeService,
  updateProduct,
} from "./ProductService";
import { useEffect, useState } from "react";
import ProductThaoTac from "./saveOrEdit";
import { getAllCategories } from "../categories/categoryService";
import { Image } from "primereact/image";

const Products = () => {
  const [products, setProduct] = useState<IProduct[]>([]);
  const [renderData, setRenderData] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [dataSize, setSize] = useState<ISize[]>([]);
  const [dataCate, setCate] = useState<ICategory[]>([]);
  // const [filebase64, setFileBase64] = useState<string>("");
  const [productDialog, setProductDialog] = useState<
    AddOrUpdate<Partial<IProduct>>
  >({ visible: false, header: "", defaultValues: {} });
  const [data, setData] = useState<IProduct>();
  const [giatri, setGiatri] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  useEffect(() => {
    setLoading(true);
    getAllProduct()
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
    getAllCategories()
      .then((res) => setCate(res.data))
      .catch((err) => console.log(err));
    setLoading(false);
    setSize(nodeService.getDataSize());
  }, [renderData]);
  const handleDelete = () => {
    setLoading(true);
    deleteProduct(data?.productId)
      .then((res) => {
        if ((res.data = "thanh cong")) {
          setVisible(false);
          mutate("http://localhost:8080/products");
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
  const sizeBody = (rowData: IProduct) => {
    let data = dataSize.find((item) => item.key === rowData.size);
    return <p>{data?.value}</p>;
  };
  const cateBody = (rowData: IProduct) => {
    let data = dataCate.find((item) => item.categoryId === rowData.categoryId);
    return <p>{data?.name}</p>;
  };
  const saleBody = (rowData: IProduct) => {
    return <p>{rowData?.sale} %</p>;
  };
  const priceBody = (rowData: IProduct) => {
    return <p>{rowData?.price} đ</p>;
  };
  const deleteBodyTemplate = (rowData: IProduct) => {
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
  const updateBodyTemplate = (rowData: IProduct) => {
    return (
      <>
        <Button
          label="Chỉnh sửa"
          onClick={() => {
            setProductDialog({
              header: "Chỉnh sửa sản phẩm",
              visible: true,
              defaultValues: { ...rowData },
            });
          }}
          className="bg-[#06B6D4] text-[#fff] w-[100%]"
        />
      </>
    );
  };
  const callbackEditProduct = (data: IProduct) => {
    console.log(data);
    setLoading(true);
    updateProduct(data.productId, data).then((res) => {
      if (res) {
        setRenderData(!renderData);
        setProduct([...products]);
        setProductDialog({
          header: "",
          visible: false,
          defaultValues: {},
        });
        setLoading(false);
        mutate("http://localhost:8080/products");
        toast.success("Chỉnh sửa sản phẩm thành công !");
      } else {
        toast.error("Không thành công !");
      }
    });
  };
  const handleCallbackAddData = (data: IProduct) => {
    console.log(data);
    setLoading(true);
    createProduct(data).then((res) => {
      if (res) {
        setRenderData(!renderData);
        setProduct([...products]);
        setProductDialog({
          header: "",
          visible: false,
          defaultValues: {},
        });
        setLoading(false);
        mutate("http://localhost:8080/products");
        toast.success("Thêm mới sản phẩm thành công !");
      } else {
        toast.error("Không thành công !");
      }
    });
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
                setProductDialog({
                  header: "Thêm mới sản phẩm",
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
              field="name"
              style={{ minWidth: "9rem" }}
              header="Tên sản phẩm"
            ></Column>
            {/* <Column
              style={{ minWidth: "6rem" }}
              field="size"
              header="Kích cỡ"
              body={sizeBody}
            ></Column> */}
            <Column
              style={{ minWidth: "9rem" }}
              field="sale"
              header="Giá giảm (%)"
              body={saleBody}
            ></Column>
            <Column
              style={{ minWidth: "13rem" }}
              field="price"
              header="Giá sản phẩm (VND)"
              body={priceBody}
            ></Column>
            <Column
              style={{ minWidth: "11rem" }}
              field="categoryId"
              body={cateBody}
              header="Loại sản phẩm"
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
      <ProductThaoTac
        dataCate={dataCate}
        dataSize={dataSize}
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
          productDialog.header === "Chỉnh sửa sản phẩm"
            ? callbackEditProduct
            : handleCallbackAddData
        }
      />
    </div>
  );
};
export default Products;
