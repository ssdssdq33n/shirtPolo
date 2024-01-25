"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { deleteUser, getAllUser } from "./adminService";
import { Button } from "primereact/button";
import { mutate } from "swr";
import { ToastContainer, toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import Loading from "./loading";
const Admin = () => {
  const [products, setProduct] = useState<IUser[]>([]);
  const [renderData, setRenderData] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<IUser>();
  useEffect(() => {
    setLoading(true);
    getAllUser()
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    // mutate("http://localhost:8080/accounts");
  }, [renderData]);
  const handleDelete = () => {
    setLoading(true);
    deleteUser(data?.userId)
      .then((res) => {
        if ((res.data = "thanh cong")) {
          setVisible(false);
          mutate("http://localhost:8080/accounts");
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
  const deleteBodyTemplate = (rowData: IUser) => {
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
  return (
    <div className="h-full">
      <ToastContainer />
      {isLoading && <Loading />}
      {!isLoading && (
        <DataTable
          value={products}
          tableStyle={{ minWidth: "50rem" }}
          paginator
          currentPageReportTemplate={
            "Hiển thị {first} đến {last} trong số {totalRecords} bản ghi"
          }
          rows={5}
          rowsPerPageOptions={[2, 3, 5]}
          className="datatable-responsive "
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        >
          <Column field="name" header="Họ và tên"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="tendangnhap" header="Username"></Column>
          <Column className="w-[100px]" body={deleteBodyTemplate}></Column>
        </DataTable>
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
    </div>
  );
};
export default Admin;
