import BankProcessLayout from "@components/layout/BankProcessLayout";
import { Outlet } from "react-router-dom";

const BankProcess = () => {
  return (
    <BankProcessLayout>
      <Outlet />
    </BankProcessLayout>
  );
};

export default BankProcess;
