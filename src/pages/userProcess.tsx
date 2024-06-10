import UserProcessLayout from "@components/layout/UserProcessLayout";
import { Outlet } from "react-router-dom";

const UserProcess = () => {
  return (
    <UserProcessLayout>
      <Outlet />
    </UserProcessLayout>
  );
};

export default UserProcess;
