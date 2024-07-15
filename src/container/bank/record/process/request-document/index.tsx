import api from "@api/axios";
import CancelBtn from "@components/common/button/cancel-btn";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import Loader from "@components/common/loader";
import { useLoading } from "@components/hook/useLoading";
import { useEffect, useState } from "react";
import { FileIcon } from "react-file-icon";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface DataRequestDoc {
  note: string;
  documents: [{ file_name: string; path: string }];
}
const RequestDocument = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, toggleLoading } = useLoading();
  const searchParams = new URLSearchParams(location.search);
  const loanId = searchParams.get("loanId");
  const recordId = searchParams.get("recordId");
  const formdId = searchParams.get("formId");
  const [note, setNote] = useState("");
  const [dataRequest, setDataRequest] = useState<DataRequestDoc[]>([]);

  const handleSendRequest = async () => {
    if (!note.trim()) {
      toast.warning(t("processBank.sendWarn"));
      return;
    }
    toggleLoading(true);
    try {
      const response = await api.post(`/bank/request-document`, {
        record_id: recordId,
        note: note,
      });
      if (response.status === 200) {
        toast.success(t("processBank.sendSuc"));
        setNote("");
        if (recordId) {
          fetchDataRequest();
        }
      }
    } catch (error) {
    } finally {
      toggleLoading(false);
    }
  };

  const fetchDataRequest = async () => {
    toggleLoading(true);
    try {
      const response = await api.get(
        `bank/records/${recordId}/request-documents`,
      );
      if (response.status === 200) {
        setDataRequest(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      toggleLoading(false);
    }
  };

  const fetchDataViewFileDoc = async (path: string) => {
    toggleLoading(true);
    try {
      const response = await api.get(`/signed-url/${path}`);
      if (response.status === 200) {
        const url = response.data.url;
        window.open(url, "_blank");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    fetchDataRequest();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="mt-10 mx-6 flex flex-col gap-1 drop-shadow-[0_4px_4px_rgba(196,203,214,0.15)]">
      <div className="w-full bg-white p-4 rounded-md border-[1px] border-stroke mt-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-danger rounded-sm" />
          <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
            {t("process.loanSubmit.requestDoc")}
          </div>
        </div>
        {dataRequest.map((data, index) => (
          <div
            className="flex flex-col gap-1 border border-[#C8D0DD] rounded-sm px-3 py-2"
            key={index}
          >
            <div className=" text-light_finance-textbody text-[17px] font-bold ">
              {t("processBank.note")}
            </div>
            <div className="text-[16px] font-semibold dot-before">
              {data.note}
            </div>
            <div className=" text-light_finance-textbody text-[17px] font-bold ">
              {t("processBank.document")}
            </div>
            {data.documents.map((item, index) => (
              <div className="flex justify-between items-center" key={index}>
                <div className="w-6">
                  <FileIcon
                    extension={item?.file_name?.toString().split(".").pop()}
                    color="#D14423"
                    labelColor="#D14423"
                    labelUppercase
                    type="presentation"
                    glyphColor="rgba(255,255,255,0.4)"
                  />
                </div>
                <div className="w-full text-[16px] my-1 font-medium ml-1">
                  {item.file_name}
                </div>
                <a
                  className="font-medium text-[14px] md:text-[16px] leading-5 tracking-tight py-2 text-light_finance-primary cursor-pointer underline"
                  onClick={() => fetchDataViewFileDoc(item.path)}
                >
                  {" "}
                  {t("process.loanSubmit.link")}
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="px-4 py-2 bg-white rounded-t-lg">
          <textarea
            id="comment"
            className="w-full px-3 text-[16px] text-gray-900 bg-white border-0 focus:ring-0 rounded-sm"
            placeholder={t("processBank.writeNote")}
            required
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end px-3 py-2 border-t gap-4">
          <CancelBtn
            label={t("processBank.close")}
            type="submit"
            customClass="max-w-[150px]"
            handleOnClick={() => {
              navigate(
                `/bank/process/loan-form-submit?loanId=${loanId}&recordId=${recordId}&formId=${formdId}`,
              );
            }}
          />
          <PrimarySubmitBtn
            name={t("processBank.add")}
            type="submit"
            customClass="max-w-[150px]"
            handleSubmit={() => {
              handleSendRequest();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestDocument;
