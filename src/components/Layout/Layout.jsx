// import { Suspense } from "react";
// import Loader from "../Loader/Loader";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
