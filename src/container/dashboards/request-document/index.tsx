import api from "@api/axios";
import { useLoading } from "@components/hook/useLoading";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface RequestDocProps {
  note: string;
  id: number;
  loan_business_list_id: number;
}

const ViewDocument = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toggleLoading } = useLoading();
  const { loanId } = useParams();
  const [documents, setDocuments] = useState<RequestDocProps[]>([]);
  const [files, setFiles] = useState<{ [key: number]: File[] }>({});

  const fetchDataDocument = async () => {
    toggleLoading(true);
    try {
      const response = await api.get(
        `/application-form/view/request-document/${loanId}`,
      );
      if (response.status === 200) {
        setDocuments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      toggleLoading(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    docId: number,
  ) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => {
        const updatedFiles = {
          ...prevFiles,
          [docId]: [...(prevFiles[docId] || []), ...newFiles],
        };
        return updatedFiles;
      });
    }
  };

  const handleFileDelete = (docId: number, fileIndex: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles[docId].filter((_, i) => i !== fileIndex);
      return {
        ...prevFiles,
        [docId]: updatedFiles,
      };
    });
  };

  const handleSubmitFile = async (docId: number) => {
    toggleLoading(true);
    try {
      const formData = new FormData();
      files[docId].forEach((file, index) => {
        formData.append(`file_name[${index}]`, file);
      });
      const document = documents.find((doc) => doc.id === docId);
      if (document) {
        formData.append(
          "loan_business_list_id",
          document.loan_business_list_id.toString(),
        );
        formData.append("request_document_id", document.id.toString());
      }
      const response = await api.post(
        "/application-form/upload-document",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status === 200) {
        toast.success("Files uploaded successfully");
        if (loanId) {
          fetchDataDocument();
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload files");
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    fetchDataDocument();
  }, [loanId]);

  return (
    <div className="mt-10 mx-6 flex flex-col gap-1 drop-shadow-[0_4px_4px_rgba(196,203,214,0.15)]">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center md:hidden">
          <i
            className="fa-solid fa-arrow-left fa-xl text-light_finance-textbody"
            onClick={() => {
              navigate(`/process/loan-review/${loanId}`);
            }}
          ></i>
          <div className="text-center text-light_finance-textbody text-2xl font-bold font-HelveticaNeue leading-8">
            {t("process.title")}
          </div>
        </div>
        <div className="hidden gap-3 items-center md:flex">
          <div className="md:block hidden w-1 h-5 bg-danger rounded-sm" />
          <div className="flex gap-2 items-center">
            <span className="text-center text-light_finance-textbody text-xl font-bold font-HelveticaNeue leading-8">
              {t("home.packageLoansList")}
            </span>
            <i className="fa-solid fa-angles-right fa-lg"></i>
            <span className="text-sm text-light_finance-textsub font-normal font-HelveticaNeue">
              {t("process.title")}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full bg-white p-4 rounded-md border-[1px] border-stroke mt-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-danger rounded-sm" />
          <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
            {t("processBank.viewDoc")}
          </div>
        </div>
        {documents.map((item) => (
          <div key={item.id} className="w-full">
            <div className="w-full border border-[#C8D0DD] text-[16px] p-3 rounded-sm my-3 font-medium dot-before">
              {item.note}
              <input
                id={`fileInput-${item.id}`}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, item.id)}
                multiple
              />
              <div className="w-full flex flex-col gap-4">
                <div>
                  {(files[item.id] || []).map((file, index) => (
                    <div
                      key={index}
                      className="text-[15px] text-light_finance-textbody flex items-center gap-2"
                    >
                      {file.name}
                      <i
                        onClick={() => handleFileDelete(item.id, index)}
                        className="fa-solid fa-trash fa-[24px] text-red cursor-pointer"
                      ></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-2 bg-gray-600 rounded-lg justify-center items-center gap-1 inline-flex">
              <div
                className="text-center text-white text-sm font-medium font-['Helvetica Neue'] leading-tight cursor-pointer"
                onClick={() =>
                  document.getElementById(`fileInput-${item.id}`)?.click()
                }
              >
                {t("processBank.chosseFile")}
              </div>
            </div>

            <div className="flex justify-end">
              <div className="px-6 py-2 bg-light_finance-primary rounded-lg justify-center items-center gap-1 inline-flex">
                <div
                  className="text-center text-light_finance-textbody text-sm font-medium font-['Helvetica Neue'] leading-tight cursor-pointer"
                  onClick={() => handleSubmitFile(item.id)}
                >
                  {t("processBank.add")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDocument;
