import Footer from "../ui/Footer/Footer";
import Header from "../ui/Header/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col bg-transparent h-dvh">
      <Header />
      <main className="w-full bg-transparent">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
