import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

function RootLayout() {
  return (
    <>
      <div className="relative min-h-screen bg-[length:32px_32px] bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)]">
        {/* content here */}
        <Navbar />
        <main className="px-5 lg:px-20 pt-5 border-t">
          <Outlet />
        </main>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default RootLayout;
