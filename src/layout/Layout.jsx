import Sidebar from "../ui/Sidebar";
import Header from "../ui/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Layout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState("linear-background");
  const location = useLocation();

  useEffect(() => {
    if (window.screen.availWidth < 1024) {
      setOpenSidebar(false);
    } else {
      setOpenSidebar(true);
    }
    window.addEventListener("resize", function () {
      if (this.screen.availWidth < 1024) {
        setOpenSidebar(false);
      } else {
        setOpenSidebar(true);
      }
    });
  }, []);

  useEffect(() => {
    switch (location.pathname.split("/")[1]) {
      case "dashboard":
        {
          setBackgroundStyle("bg-gray-100");
        }
        break;

      default: {
        setBackgroundStyle("linear-background");
      }
    }
  }, [location.pathname]);

  return (
    <div
      className={`grid ${
        openSidebar ? "grid-cols-[22rem_1fr]" : ""
      } grid-rows-[auto_1fr] h-dvh relative`}
    >
      <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <main
        className={`p-5 flex ${backgroundStyle} justify-center overflow-auto relative`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
