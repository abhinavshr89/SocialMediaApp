import React from "react";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSideBar";
import { Outlet } from "react-router-dom";
import BottomBar from "@/components/shared/BottomBar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex ">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  );
};

export default RootLayout;
