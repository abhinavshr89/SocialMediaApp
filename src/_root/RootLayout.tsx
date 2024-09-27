
import Topbar from "@/components/shared/Topbar";
import LeftSideBar from "@/components/shared/LeftSidebar";
import { Outlet } from "react-router-dom";
import BottomBar from "@/components/shared/Bottombar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex ">
      <Topbar />
      <LeftSideBar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  );
};

export default RootLayout;
