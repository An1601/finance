import UserProcessLayout from "@components/layout/UserProcessLayout";
import { AppDispatch } from "@redux/store";
import { fetchProcess } from "@redux/userThunks";
import { useProcess } from "@redux/useSelector";
import { Status, StatusProcess } from "@type/enum";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const UserProcess = () => {
  const check = useProcess();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const loanId = searchParams.get("loanId");
  const offerId = searchParams.get("offerId");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavigateProcess = () => {
    let navigatePath = "";
    switch (check.current_step) {
      case StatusProcess.BOOK_MEETING:
        if (check.status === Status.PENDING) {
          navigatePath = `/process/loan-detail?loanId=${loanId}&offerId=${offerId}`;
        } else {
          navigatePath = `/process/book-meeting/${check.idRecord}`;
        }
        break;
      case StatusProcess.ADMIN_CONSULTATION:
        navigatePath = `/process/book-meeting/${check.idRecord}`;
        break;
      case StatusProcess.LOAN_ASSIGN:
        if (check.status === Status.SUBMITED) {
          navigatePath = `/process/loan-submit/${check.idRecord}`;
        } else {
          navigatePath = `/process/book-meeting-success/${check.idRecord}`;
        }
        break;
      case StatusProcess.LOAN_SUBMIT:
        if (check.status === Status.PENDING) {
          navigatePath = `/process/loan-submit/${check.idRecord}`;
        } else {
          navigatePath = `/process/loan-review/${check.idRecord}`;
        }
        break;
      case StatusProcess.BANK_REVIEW:
        navigatePath = `/process/loan-review/${check.idRecord}`;
        break;
      case StatusProcess.ELIGIBILITY_ASSESSMENT:
        navigatePath = `/process/loan-review/${check.idRecord}`;
        break;
      case StatusProcess.APPROVAL_LOAN_APP:
        navigatePath = `/process/loan-review/${check.idRecord}`;
        break;
      default:
        break;
    }
    if (
      (navigatePath !== window.location.pathname &&
        !window.location.pathname.includes("confirm")) ||
      (window.location.pathname.includes("confirm") &&
        navigatePath.includes("review"))
    ) {
      navigate(navigatePath);
    }
  };

  useEffect(() => {
    const handleTimeout = async () => {
      if (check.idRecord) {
        await dispatch(fetchProcess(check.idRecord));
      }
      timeoutRef.current = setTimeout(handleTimeout, 7000);
    };

    timeoutRef.current = setTimeout(handleTimeout, 7000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [check.idRecord]);

  useEffect(() => {
    handleNavigateProcess();
  }, []);
  useEffect(() => {
    handleNavigateProcess();
  }, [check.current_step, check.status, window.location.pathname]);

  return (
    <UserProcessLayout>
      <Outlet />
    </UserProcessLayout>
  );
};

export default UserProcess;
