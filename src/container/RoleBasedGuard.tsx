import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@redux/useSelector";
import { UserRole } from "@type/enum";

interface RoleBasedGuardProps {
  roles: UserRole[];
  children: ReactNode;
}

const RoleBasedGuard: React.FC<RoleBasedGuardProps> = ({ roles, children }) => {
  const user = useUser();

  if (!user.access_token) {
    if (roles.includes(UserRole.BANK) || roles.includes(UserRole.BUSINESS)) {
      return <Navigate to="/signin" />;
    }
  } else if (!roles.includes(user.role)) {
    return user.role === UserRole.BANK ? (
      <Navigate to="/bank" />
    ) : (
      <Navigate to="/dashboard" />
    );
  }
  return <>{children}</>;
};

export default RoleBasedGuard;
