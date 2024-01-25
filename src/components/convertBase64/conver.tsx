import { Buffer } from "buffer";

export const fileToBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// export const BlobToBase64 = (blob: any) =>
//   new Buffer(blob, "base64").toString("binary");
export function convertFile(files: File | null, setFileBase64: any) {
  if (files) {
    // const fileRef = files[0] || "";
    const fileType: string = files.type || "";
    console.log("This file upload is of type:", fileType);
    const reader = new FileReader();
    reader.readAsBinaryString(files);
    reader.onload = (ev: any) => {
      // convert it to base64
      setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`);
    };
  }
}

// function convertFile(files: FileList | null) {
//   if (files) {
//     const fileRef = files[0] || "";
//     const fileType: string = fileRef.type || "";
//     console.log("This file upload is of type:", fileType);
//     const reader = new FileReader();
//     reader.readAsBinaryString(fileRef);
//     reader.onload = (ev: any) => {
//       // convert it to base64
//       setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`);
//     };
//   }
// }
