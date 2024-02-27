"use client";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import Loading from "./loading";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "./categoryService";
import { mutate } from "swr";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { useRouter } from "next/navigation";
import CategoryThaoTac from "./saveOrEdit";

const Categories = () => {
  const [products, setProduct] = useState<ICategory[]>([]);
  const [renderData, setRenderData] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();
  const [productDialog, setProductDialog] = useState<
    AddOrUpdate<Partial<ICategory>>
  >({ visible: false, header: "", defaultValues: {} });
  const [data, setData] = useState<ICategory>();
  const [giatri, setGiatri] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  useEffect(() => {
    // if (localStorage.getItem("access") === null) {
    //   return router.push("/account/login");
    // }
    // if (localStorage.getItem("role") !== "ADMIN") {
    //   return router.push("/errors");
    // }
    setLoading(true);
    getAllCategories()
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [renderData]);
  const handleDelete = () => {
    setLoading(true);
    deleteCategory(data?.categoryId)
      .then((res) => {
        if ((res.data = "thanh cong")) {
          setVisible(false);
          mutate("http://localhost:8080/categories");
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
  const deleteBodyTemplate = (rowData: ICategory) => {
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
  const updateBodyTemplate = (rowData: ICategory) => {
    return (
      <>
        <Button
          label="Chỉnh sửa"
          onClick={() => {
            setProductDialog({
              header: "Chỉnh sửa loại sản phẩm",
              visible: true,
              defaultValues: { ...rowData },
            });
          }}
          className="bg-[#06B6D4] text-[#fff] w-[100%]"
        />
      </>
    );
  };
  const callbackEditProduct = (data: ICategory) => {
    setLoading(true);
    updateCategory(data.categoryId, data).then((res) => {
      if (res) {
        setRenderData(!renderData);
        setProduct([...products]);
        setProductDialog({
          header: "",
          visible: false,
          defaultValues: {},
        });
        mutate("http://localhost:8080/categories");
        toast.success("Chỉnh sửa loại sản phẩm thành công !");
      } else {
        toast.error("Không thành công !");
      }
    });
  };
  const handleCallbackAddData = (data: ICategory) => {
    // console.log(data);
    setLoading(true);
    createCategory(data).then((res) => {
      if (res) {
        setRenderData(!renderData);
        setProduct([...products]);
        setProductDialog({
          header: "",
          visible: false,
          defaultValues: {},
        });
        mutate("http://localhost:8080/categories");
        toast.success("Thêm mới loại sản phẩm thành công !");
      } else {
        toast.error("Không thành công !");
      }
    });
  };
  return (
    <div className="h-full">
      <ToastContainer />
      {/* {!isLoading && (
        <> */}
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
            placeholder="...name"
            className="w-full h-full border-1"
          />
        </span>
        <Button
          label="Thêm mới"
          className="w-[130px] h-[40px] text-[#fff] bg-[#475569]"
          onClick={() => {
            setProductDialog({
              header: "Thêm mới loại sản phẩm",
              visible: true,
              defaultValues: {},
            });
          }}
        />
      </div>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
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
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          >
            <Column field="name" header="Name"></Column>
            <Column className="w-[110px]" body={deleteBodyTemplate}></Column>
            <Column className="w-[145px]" body={updateBodyTemplate}></Column>
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
      <CategoryThaoTac
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
          productDialog.header === "Chỉnh sửa loại sản phẩm"
            ? callbackEditProduct
            : handleCallbackAddData
        }
      />
    </div>
  );
};
export default Categories;
