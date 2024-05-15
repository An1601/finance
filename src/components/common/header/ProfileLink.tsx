import React from "react";
import { Link } from "react-router-dom";
interface ProfileLinkProps {
  to: string;
  icon: string;
  label: string;
  badge?: string;
}
const ProfileLink: React.FC<ProfileLinkProps> = ({
  to,
  icon,
  label,
  badge,
}) => (
  <li>
    <Link
      className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex"
      to={to}
    >
      <i className={`ti ${icon} text-[1.125rem] me-2 opacity-[0.7]`}></i>
      {label}
      {badge && (
        <span className="!py-1 !px-[0.45rem] !font-semibold !rounded-sm text-success text-[0.75em] bg-success/10 ms-auto">
          {badge}
        </span>
      )}
    </Link>
  </li>
);
export default ProfileLink;
