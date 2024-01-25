
interface IUser{
    userId:number
    matkhau:string
    email: string
    name: string
    tendangnhap: string
}
interface ICategory{
    categoryId:number
    name:string
}
interface ISize{
    key:string;
    value:string
}
interface IProduct{
    productId:number;
    name:string;
    decription:string;
    size:string;
    sale:number;
    price:number;
    categoryId:number
}
interface AddOrUpdate<T> {
    visible: boolean;
    header?: string;
    defaultValues: T;
  }

interface IImage{
    imageId?:number
    imageProduct1?:string
    imageProduct2?:string
    imageProduct3?:string
    imageProduct4?:string
    file1:File
    file2:File
    file3:File
    file4:File
    productId:number
}