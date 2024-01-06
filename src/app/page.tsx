"use client";

import Logo from "@/components/header/logo";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import logo from "../components/header/images/logo.jpg";
export default function Home() {
  return (
    <div>
      <h2>Content</h2>
      <Image src={logo.src} />
    </div>
  );
}
