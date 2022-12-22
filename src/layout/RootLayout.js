import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="container-fluid p-3">
        <div className="content">
          {location.pathname === "/" ? <Navigate to="products" /> : <Outlet />}
        </div>
      </div>
    </>
  );
};

export default RootLayout;
