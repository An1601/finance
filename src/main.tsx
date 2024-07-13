import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { persistor, store } from "./redux/store.ts";
import i18n from "@i18n/index.tsx";
import Login from "@container/auth/Login.tsx";
import SignUp from "@container/auth/SignUp.tsx";
import ForgotPassword from "@container/auth/ForgotPassword.tsx";
import VerifyOTP from "@container/auth/VerifyOTP.tsx";
import ResetPassword from "@container/auth/ResetPassword.tsx";
import Home from "@container/dashboards/home/Index.tsx";
import PackageLoanIndex from "@container/dashboards/package-loan";
import Account from "@container/dashboards/profile";
import MeetingIndex from "@container/dashboards/consulting-meeting";
import EditProfile from "@container/dashboards/edit-profile";
import ChangePassword from "@container/dashboards/change-password";
import TermsConditions from "@container/dashboards/terms-conditions";
import Message from "@container/dashboards/Message/index.tsx";
import SurveyIndex from "@container/survey";
import LoanDetail from "@container/dashboards/process/loan-detail";
import LoanAppSubmit from "@container/dashboards/process/loan-app-submit";
import Projects from "@container/dashboards/project/index.tsx";
import NotificationIndex from "@container/dashboards/Notification/index.tsx";
import SearchMobile from "@container/dashboards/search/index.tsx";
import FAQ from "@container/dashboards/FAQ/index.tsx";
import BankLoanDetail from "@container/bank/record/package-loan/BankLoanDetail.tsx";
import Auth from "@pages/auth.tsx";
import Survey from "@pages/survey.tsx";
import Dashboard from "@pages/dashboard.tsx";
import UserProcess from "@pages/userProcess.tsx";
import LoadingProvider from "@components/hook/useLoading.tsx";
import RoleBasedGuard from "@container/RoleBasedGuard.tsx";
import { UserRole } from "@type/enum.ts";
import Meeting from "@container/dashboards/process/bookMeeting/index.tsx";
import LoanReview from "@container/dashboards/process/loan-review/index.tsx";
import LoanSubmitConfirm from "@container/dashboards/process/loan-comfirm-submit/index.tsx";
import RecordIndex from "@container/dashboards/Record/Index.tsx";
import SurveyBankIndex from "@container/bank/record/survey-list/index.tsx";
import BankSurveyDetail from "@container/bank/record/survey-list/survey-detail/index.tsx";
import BankRecordManagement from "@container/bank/record/record-management/index.tsx";
import BankLoanList from "@container/bank/record/package-loan/index.tsx";
import BankProcess from "@pages/bankProcess.tsx";
import LoanFormBank from "@container/bank/record/process/loan-form-submit/index.tsx";
import BankHome from "@container/bank/home/index.tsx";
import BankApplicationForms from "@container/bank/record/application-forms/index.tsx";
import UserMainProcess from "@container/dashboards/process/index.tsx";
import CreateLoan from "@container/bank/record/package-loan/create-loan-list/index.tsx";
import CreateLoanForm from "@container/bank/record/application-forms/create-form/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RoleBasedGuard roles={[]}>
        <Auth />
      </RoleBasedGuard>
    ),
    children: [
      { path: "", element: <Login /> },
      { path: "signin", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verify-code", element: <VerifyOTP /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "/",
    element: (
      <RoleBasedGuard roles={[UserRole.BUSINESS]}>
        <Survey />
      </RoleBasedGuard>
    ),
    children: [{ path: "survey", element: <SurveyIndex /> }],
  },
  {
    path: "/",
    element: (
      <RoleBasedGuard roles={[UserRole.BUSINESS, UserRole.BANK]}>
        <Dashboard />
      </RoleBasedGuard>
    ),
    children: [
      { path: "profile", element: <Account /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "change-password", element: <ChangePassword /> },
      { path: "terms-conditions", element: <TermsConditions /> },
      { path: "message", element: <Message /> },
    ],
  },
  {
    path: "/",
    element: (
      <RoleBasedGuard roles={[UserRole.BUSINESS]}>
        <Dashboard />
      </RoleBasedGuard>
    ),
    children: [
      { path: "dashboard", element: <Home /> },
      { path: "notification", element: <NotificationIndex /> },
      { path: "faq", element: <FAQ /> },
      { path: "search", element: <SearchMobile /> },
      { path: "loan-list", element: <PackageLoanIndex /> },
      { path: "loan-list/:projectId", element: <PackageLoanIndex /> },
      { path: "records", element: <RecordIndex /> },
      { path: "meeting", element: <MeetingIndex /> },
      { path: "meeting/:loanId", element: <MeetingIndex /> },
      { path: "projects", element: <Projects /> },
      {
        path: "/process/",
        element: <UserProcess />,
        children: [
          { path: "", element: <UserMainProcess /> },
          { path: "loan-detail", element: <LoanDetail /> },
          { path: "book-meeting/:loanId", element: <Meeting /> },
          { path: "loan-submit/:loanId", element: <LoanAppSubmit /> },
          {
            path: "loan-submit-confirm/:loanId",
            element: <LoanSubmitConfirm />,
          },
          { path: "loan-review/:loanId", element: <LoanReview /> },
        ],
      },
    ],
  },
  {
    path: "/bank/",
    element: (
      <RoleBasedGuard roles={[UserRole.BANK]}>
        <Dashboard />
      </RoleBasedGuard>
    ),
    children: [
      { path: "", element: <BankHome /> },
      { path: "loan-create", element: <CreateLoan /> },
      { path: "loan/:loanId", element: <CreateLoan /> },
      { path: "loan-detail", element: <BankLoanDetail /> },
      { path: "survey-list", element: <SurveyBankIndex /> },
      { path: "survey-detail/:id", element: <BankSurveyDetail /> },
      { path: "records", element: <BankRecordManagement /> },
      { path: "loan-list", element: <BankLoanList /> },
      { path: "form-list", element: <BankApplicationForms /> },
      { path: "form/:formId", element: <CreateLoanForm /> },
      { path: "form-create", element: <CreateLoanForm /> },
      {
        path: "process",
        element: <BankProcess />,
        children: [{ path: "loan-form-submit", element: <LoanFormBank /> }],
      },
    ],
  },
]);

const NestedApp = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <LoadingProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer
            position={"top-right"}
            autoClose={5000}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
          />
          <I18nextProvider i18n={i18n}>
            <NestedApp />
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </LoadingProvider>
  </React.Fragment>,
);
