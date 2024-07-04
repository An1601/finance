import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@redux/useSelector";
import { UserRole } from "@type/enum";

interface RoleBaseGuardProps {
  role?: UserRole;
  children: ReactNode;
}

const RoleBaseGuard: React.FC<RoleBaseGuardProps> = ({ role, children }) => {
  const user = useUser();

  if (!user.access_token) {
    if (role === UserRole.BANK || role === UserRole.BUSINESS) {
      return <Navigate to="/signin" />;
    }
  } else if (user.role !== role) {
    return user.role === UserRole.BANK ? (
      <Navigate to="/bank" />
    ) : (
      <Navigate to="/dashboard" />
    );
  }
  return <>{children}</>;
};

export default RoleBaseGuard;
