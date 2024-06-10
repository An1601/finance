const LoanList = ({
  isFocus,
  isActive,
}: {
  isFocus: boolean;
  isActive: boolean;
}) => (
  <svg
    className={`!rounded-none ${isFocus ? "fill-light_finance-primary" : "fill-light_finance-texttitle"} ${isActive && "group-hover:fill-light_finance-primary"}`}
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke={`${isActive ? "" : "white"}`}
      d="M12.2605 19.6439C11.3931 20.4541 9.46785 20.9997 7.35667 20.9997C4.19945 20.9997 2.00012 19.8464 2.00012 18.8123V16.7511C3.10575 17.6351 5.06918 18.2118 7.35667 18.2118C8.74108 18.2118 10.0612 17.9973 11.1406 17.6065C11.386 18.3571 11.7696 19.0458 12.2605 19.6439Z"
    />
    <path
      stroke={`${isActive ? "" : "white"}`}
      d="M10.826 15.6434C10.826 15.9937 10.857 16.3392 10.9118 16.6752C9.92057 17.0517 8.67675 17.259 7.35667 17.259C4.19945 17.259 2.00012 16.1056 2.00012 15.0715V13.0127C3.10575 13.8944 5.06918 14.471 7.35667 14.471C8.71964 14.471 10.0135 14.2613 11.0762 13.8872C10.9142 14.4448 10.826 15.0334 10.826 15.6434Z"
    />
    <path
      stroke={`${isActive ? "" : "white"}`}
      d="M12.6918 11.1683C12.2605 11.5972 11.8912 12.0857 11.5981 12.6219C10.5639 13.1842 8.99366 13.5178 7.35667 13.5178C4.19945 13.5178 2.00012 12.3645 2.00012 11.3304C2.00012 10.2938 4.19945 9.1405 7.35667 9.1405C10.3495 9.1405 12.4797 10.177 12.6918 11.1683Z"
    />
    <path
      stroke={`${isActive ? "" : "white"}`}
      d="M19.8536 5.18747C19.8536 6.22164 17.6543 7.37493 14.497 7.37493C11.3422 7.37493 9.14287 6.22402 9.1405 5.18985V5.18747C9.1405 4.67039 9.69332 4.12233 10.6369 3.70533C11.5805 3.28833 12.9196 3 14.497 3C17.6543 3 19.8536 4.15331 19.8536 5.18747Z"
    />
    <path
      stroke={`${isActive ? "" : "white"}`}
      d="M19.8536 6.89331V8.92827C19.8536 9.25472 19.6392 9.54067 19.4056 9.7575C18.7003 9.48348 17.9354 9.33336 17.1372 9.33336C15.7695 9.33336 14.5042 9.7718 13.4701 10.5129C12.9244 9.42629 11.2993 8.59943 9.1405 8.30635V6.89331C10.2366 7.7702 12.1833 8.32778 14.497 8.32778C16.8108 8.32778 18.7575 7.7702 19.8536 6.89331Z"
    />
    <path
      stroke={`${isActive ? "" : "white"}`}
      d="M17.1366 10.2866C14.1819 10.2866 11.78 12.6886 11.78 15.6433C11.78 18.5981 14.1819 21 17.1366 21C20.0913 21 22.4931 18.5981 22.4931 15.6433C22.4931 12.6886 20.0913 10.2866 17.1366 10.2866ZM17.8729 18.8649C17.7847 18.8792 17.6989 18.8888 17.6132 18.8983V19.5274C17.6132 19.7895 17.3987 20.0039 17.1366 20.0039C16.8745 20.0039 16.66 19.7895 16.66 19.5274V18.8745C16.5742 18.8602 16.4861 18.8482 16.4027 18.8292C15.8022 18.6791 15.3209 18.212 15.1517 17.6092C15.0802 17.3566 15.228 17.0921 15.4829 17.0206C15.7355 16.9515 16 17.0992 16.0691 17.3518C16.1477 17.6258 16.3622 17.8355 16.6314 17.9022C16.965 17.9857 17.3201 17.9928 17.7085 17.9237C18.1183 17.8546 18.4138 17.5067 18.4138 17.0992C18.4138 16.7108 18.1493 16.3772 17.7728 16.2867L16.2764 15.9269C15.471 15.7338 14.9063 15.019 14.9063 14.1874C14.9063 13.3152 15.5353 12.5718 16.4003 12.4217C16.4885 12.4074 16.5742 12.4002 16.66 12.3907V11.7592C16.66 11.4971 16.8745 11.2827 17.1366 11.2827C17.3987 11.2827 17.6132 11.4971 17.6132 11.7592V12.4097C17.6989 12.424 17.7871 12.4383 17.8705 12.4574C18.471 12.6075 18.9523 13.0746 19.1215 13.6774C19.1906 13.93 19.0428 14.1945 18.7903 14.2636C18.5353 14.3351 18.2732 14.1874 18.2017 13.9348C18.1254 13.6607 17.911 13.4511 17.6417 13.3843C17.3081 13.3009 16.9555 13.2938 16.5623 13.3605C16.1549 13.432 15.8594 13.7799 15.8594 14.1874C15.8594 14.5758 16.1239 14.9094 16.5004 14.9999L17.9944 15.3597C18.8022 15.5527 19.3669 16.2676 19.3669 17.0992C19.3669 17.9714 18.7378 18.7148 17.8729 18.8649Z"
    />
  </svg>
);
export default LoanList;
