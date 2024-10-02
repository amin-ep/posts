import Header from "../ui/Header/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
