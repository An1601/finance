import api from "@api/axios";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import Loader from "@components/common/loader";
import { useLoading } from "@components/hook/useLoading";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface DataRequestDoc {
  note: string;
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

  useEffect(() => {
    fetchDataRequest();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="mt-10 mx-6 flex flex-col gap-1 drop-shadow-[0_4px_4px_rgba(196,203,214,0.15)]">
      <div className="w-full bg-white p-4 rounded-md border-[1px] border-stroke mt-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-danger rounded-sm" />
          <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
            {t("process.loanSubmit.requestDoc")}
          </div>
        </div>
        {dataRequest.map((item, index) => (
          <div
            className="w-full border border-[#C8D0DD] text-[16px] p-3 rounded-sm my-3 font-medium dot-before"
            key={index}
          >
            {item.note}
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
          <PrimarySubmitBtn
            name={t("processBank.close")}
            type="submit"
            customClass="bg-red max-w-[150px]"
            styleText="text-white"
            handleSubmit={() => {
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
