import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "@components/common/breadcrumb";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import InputField from "@components/common/input";
import useWindowWidth from "@components/hook/useWindowWidth";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { UpdateProfile } from "@type/types";
import api from "@api/axios";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@components/common/loader";
import BackIcon from "@components/svg/Back";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerField from "@components/common/input-date";
import { useBusinessProfile } from "@redux/useSelector";
import { useLoading } from "@components/hook/useLoading";

function EditProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const businessProfile = useBusinessProfile();
  const { isLoading, toggleLoading } = useLoading();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useForm<UpdateProfile>();

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (businessProfile) {
      setValue("name", businessProfile?.name ?? "");
      setValue("phone", businessProfile?.phone ?? "");
      setValue("email", businessProfile?.email ?? "");
      setValue("DOB", businessProfile?.DOB ?? "");
      setValue("business_address", businessProfile?.business_address ?? "");

      if (businessProfile?.DOB) {
        setSelectedDate(new Date(businessProfile.DOB));
      }
    }
  }, [businessProfile]);

  const handleUpdate = async (data: UpdateProfile) => {
    toggleLoading(true);
    try {
      const response = await api.post("/me/profile/update", data);
      if (response.status === 200) {
        toast.success(t("editProfile.messSuccess"));
        navigate("/profile");
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : t("login.messageError");
      toast.error(message);
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      clearErrors("DOB");
    }
  }, [selectedDate, clearErrors]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      setValue(
        "DOB",
        date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      );
      clearErrors("DOB");
    } else {
      setError("DOB", {
        type: "required",
        message: t("signup.requireDate"),
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      {windowWidth >= 480 ? (
        <div>
          <Breadcrumb
            primaryText={t("editProfile.account")}
            secondaryText={t("editProfile.editProfile")}
          />
          <div className="p-6 gap-20  bg-white rounded-md">
            <div className="flex flex-row items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
              <div className="text-slate-900 text-lg font-bold font-['Helvetica Neue'] leading-7">
                {t("editProfile.editProfile")}
              </div>
            </div>
            <div>
              <div className="flex gap-20">
                <div className="w-1/2 flex flex-col space-y-4">
                  <InputField
                    label={t("editProfile.name")}
                    register={register("name", {
                      required: t("signup.requireName"),
                    })}
                    error={errors.name}
                  />
                  <InputField
                    label={t("editProfile.phone")}
                    register={register("phone", {
                      required: t("signup.requirePhone"),
                    })}
                    error={errors.phone}
                  />
                  <InputField
                    label={t("editProfile.email")}
                    type="email"
                    register={register("email", {
                      required: t("signup.requireEmail"),
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: t("signup.messageEmail"),
                      },
                    })}
                    error={errors.email}
                  />
                </div>
                <div className="w-1/2 flex flex-col space-y-4">
                  <DatePickerField
                    label={t("editProfile.dateOfBirth")}
                    selected={selectedDate}
                    onChange={handleDateChange}
                    error={errors.DOB}
                    register={register("DOB", {
                      required: t("signup.requireDate"),
                    })}
                  />
                  <InputField
                    label={t("editProfile.address")}
                    register={register("business_address", {
                      required: t("signup.requireAddress"),
                    })}
                    error={errors.business_address}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <PrimarySubmitBtn type="submit" name="Update" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="!mt-0 sm:!mt-[60px] flex flex-row gap-8">
          <div className="w-screen sm:max-w-[480px]">
            <div className="flex flex-row items-center gap-3 px-6 py-7">
              <div
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <BackIcon color="#45556E" />
              </div>
              <div className="text-center text-slate-900 text-2xl font-bold font-['Helvetica Neue'] leading-loose">
                {t("editProfile.editProfile")}
              </div>
            </div>
            <div className=" mb-20 ">
              <div className="bg-white p-6 rounded-t-[24px] flex flex-col gap-8 ">
                <InputField
                  label={t("editProfile.name")}
                  register={register("name", {
                    required: t("signup.requireName"),
                  })}
                  error={errors.name}
                />
                <InputField
                  label={t("editProfile.phone")}
                  register={register("phone", {
                    required: t("signup.requirePhone"),
                  })}
                  error={errors.phone}
                />
                <InputField
                  label={t("editProfile.email")}
                  type="email"
                  register={register("email", {
                    required: t("signup.requireEmail"),
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: t("signup.messageEmail"),
                    },
                  })}
                  error={errors.email}
                />
                <DatePickerField
                  label={t("editProfile.dateOfBirth")}
                  selected={selectedDate}
                  onChange={(date: Date) => {
                    setSelectedDate(date);
                    setValue(
                      "DOB",
                      date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }),
                    );
                  }}
                  error={errors.DOB}
                />
                <InputField
                  label={t("editProfile.address")}
                  register={register("business_address", {
                    required: t("signup.requireAddress"),
                  })}
                  error={errors.business_address}
                />
                <div className="flex justify-center">
                  <PrimarySubmitBtn type="submit" name="Update" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default EditProfile;
