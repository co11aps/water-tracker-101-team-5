import { Suspense } from "react";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";

const Layout = ({
  children,
  openSettingModal,
  closeSettingModal,
  isSettingModalOpen,
}) => {
  return (
    <div>
      <Header
        openSettingModal={openSettingModal}
        closeSettingModal={closeSettingModal}
        isSettingModalOpen={isSettingModalOpen}
      />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
