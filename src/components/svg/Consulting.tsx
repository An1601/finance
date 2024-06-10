const Consulting = ({
  isFocus,
  isActive,
}: {
  isFocus: boolean;
  isActive: boolean;
}) => (
  <svg
    className={`!rounded-none ${isFocus ? "fill-light_finance-primary" : "fill-light_finance-texttitle"} ${isActive && "group-hover:fill-light_finance-primary"}`}
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_13_87)">
      <path d="M13.75 8.125C13.75 7.95924 13.8158 7.80027 13.9331 7.68306C14.0503 7.56585 14.2092 7.5 14.375 7.5H15.625C15.7908 7.5 15.9497 7.56585 16.0669 7.68306C16.1842 7.80027 16.25 7.95924 16.25 8.125V9.375C16.25 9.54076 16.1842 9.69973 16.0669 9.81694C15.9497 9.93415 15.7908 10 15.625 10H14.375C14.2092 10 14.0503 9.93415 13.9331 9.81694C13.8158 9.69973 13.75 9.54076 13.75 9.375V8.125ZM10 8.125C10 7.95924 10.0658 7.80027 10.1831 7.68306C10.3003 7.56585 10.4592 7.5 10.625 7.5H11.875C12.0408 7.5 12.1997 7.56585 12.3169 7.68306C12.4342 7.80027 12.5 7.95924 12.5 8.125V9.375C12.5 9.54076 12.4342 9.69973 12.3169 9.81694C12.1997 9.93415 12.0408 10 11.875 10H10.625C10.4592 10 10.3003 9.93415 10.1831 9.81694C10.0658 9.69973 10 9.54076 10 9.375V8.125ZM3.75 11.875C3.75 11.7092 3.81585 11.5503 3.93306 11.4331C4.05027 11.3158 4.20924 11.25 4.375 11.25H5.625C5.79076 11.25 5.94973 11.3158 6.06694 11.4331C6.18415 11.5503 6.25 11.7092 6.25 11.875V13.125C6.25 13.2908 6.18415 13.4497 6.06694 13.5669C5.94973 13.6842 5.79076 13.75 5.625 13.75H4.375C4.20924 13.75 4.05027 13.6842 3.93306 13.5669C3.81585 13.4497 3.75 13.2908 3.75 13.125V11.875ZM7.5 11.875C7.5 11.7092 7.56585 11.5503 7.68306 11.4331C7.80027 11.3158 7.95924 11.25 8.125 11.25H9.375C9.54076 11.25 9.69973 11.3158 9.81694 11.4331C9.93415 11.5503 10 11.7092 10 11.875V13.125C10 13.2908 9.93415 13.4497 9.81694 13.5669C9.69973 13.6842 9.54076 13.75 9.375 13.75H8.125C7.95924 13.75 7.80027 13.6842 7.68306 13.5669C7.56585 13.4497 7.5 13.2908 7.5 13.125V11.875Z" />
      <path
        stroke={isActive ? "" : "white"}
        d="M4.375 0C4.54076 0 4.69973 0.065848 4.81694 0.183058C4.93415 0.300269 5 0.45924 5 0.625V1.25H15V0.625C15 0.45924 15.0658 0.300269 15.1831 0.183058C15.3003 0.065848 15.4592 0 15.625 0C15.7908 0 15.9497 0.065848 16.0669 0.183058C16.1842 0.300269 16.25 0.45924 16.25 0.625V1.25H17.5C18.163 1.25 18.7989 1.51339 19.2678 1.98223C19.7366 2.45107 20 3.08696 20 3.75V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V3.75C0 3.08696 0.263392 2.45107 0.732233 1.98223C1.20107 1.51339 1.83696 1.25 2.5 1.25H3.75V0.625C3.75 0.45924 3.81585 0.300269 3.93306 0.183058C4.05027 0.065848 4.20924 0 4.375 0ZM1.25 5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V5H1.25Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_13_87">
        <rect width={20} height={20} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default Consulting;
