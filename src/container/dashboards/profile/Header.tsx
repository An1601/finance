import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ImageIcon from "../../../components/svg/Image";
import defaultProfileImage from "../../../assets/images/profile/avatar.jpeg";

const HeaderItem = () => {
  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

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
    <div className="flex flex-col items-center justify-center pt-[70px] pb-7 bg-[#01D2B4]">
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
        <ImageIcon
          className="absolute bottom-0 right-0 cursor-pointer"
          onClick={() => document.getElementById("imageUpload")!.click()}
        />
      </div>
      <div className="text-center text-white text-2xl font-bold tracking-wide">
        Angela
      </div>
      <div className="text-center text-white text-sm ">
        angela.redial@gmail.com
      </div>
    </div>
  );
};

export default HeaderItem;
