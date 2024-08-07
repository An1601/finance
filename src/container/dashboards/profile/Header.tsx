import { useState } from "react";
import { toast } from "react-toastify";
import defaultProfileImage from "@assets/images/profile/avatar.jpeg";
import BackIcon from "@components/svg/Back";
import { useTranslation } from "react-i18next";
import ImageIcon from "@assets/icon/ImageIcon.svg";
interface PropHeaderItem {
  className?: string;
  showIconImage?: boolean;
  userName?: string;
  email?: string;
  onClick?: () => void;
  showBack?: boolean;
}
const HeaderItem = ({
  className,
  showIconImage,
  userName,
  email,
  onClick,
  showBack,
}: PropHeaderItem) => {
  const { t } = useTranslation();
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || defaultProfileImage,
  );
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const maxFileSize = 2 * 1024 * 1024;
    if (file) {
      if (file.size > maxFileSize) {
        toast.error("Size is too large");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        if (typeof imageUrl === "string") {
          setProfileImage(imageUrl);
          localStorage.setItem("profileImage", imageUrl);
        } else {
          console.error("Failed to read file as a string.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#01D2B4]">
      {showBack && (
        <div className="flex flex-row items-center gap-3 px-6 pt-7">
          <div onClick={onClick}>
            <BackIcon color="white" />
          </div>
          <div className="text-center text-white text-2xl font-bold font-['Helvetica Neue'] leading-loose">
            {t("profile.editProfile")}
          </div>
        </div>
      )}
      <div
        className={`flex flex-col items-center justify-center   ${className}`}
      >
        <div className="relative">
          <img
            className="w-[110px] h-[110px] rounded-full border-4 border-white"
            src={profileImage}
            alt="logo"
          />
          <input
            type="file"
            id="imageUpload"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
          {showIconImage && (
            <img
              className="absolute bottom-0 right-0 cursor-pointer"
              onClick={() => document.getElementById("imageUpload")!.click()}
              src={ImageIcon}
            />
          )}
        </div>
        <div className="text-center text-white text-2xl font-bold tracking-wide pt-2">
          {userName}
        </div>
        <div className="text-center text-white text-sm ">{email}</div>
      </div>
    </div>
  );
};

export default HeaderItem;
