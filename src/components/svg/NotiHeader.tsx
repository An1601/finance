const NotiHeader = (props: any) => (
  <svg
    width={49}
    height={49}
    viewBox="0 0 49 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_13_313)">
      <circle cx={24} cy={22} r={18} fill="white" />
    </g>
    <g clipPath="url(#clip0_13_313)">
      <path
        d="M23 32C23.663 32 24.2989 31.7366 24.7678 31.2678C25.2366 30.7989 25.5 30.163 25.5 29.5H20.5C20.5 30.163 20.7634 30.7989 21.2322 31.2678C21.7011 31.7366 22.337 32 23 32ZM23 14.3975L22.0037 14.5987C20.8735 14.8286 19.8574 15.4421 19.1278 16.3353C18.3981 17.2286 17.9997 18.3466 18 19.5C18 20.285 17.8325 22.2462 17.4262 24.1775C17.2262 25.1362 16.9562 26.135 16.5975 27H29.4025C29.0437 26.135 28.775 25.1375 28.5737 24.1775C28.1675 22.2462 28 20.285 28 19.5C28.0001 18.3468 27.6015 17.2291 26.8719 16.3361C26.1422 15.4431 25.1263 14.8298 23.9963 14.6L23 14.3975ZM30.775 27C31.0538 27.5587 31.3762 28.0012 31.75 28.25H14.25C14.6238 28.0012 14.9462 27.5587 15.225 27C16.35 24.75 16.75 20.6 16.75 19.5C16.75 16.475 18.9 13.95 21.7563 13.3737C21.7388 13.1999 21.758 13.0244 21.8125 12.8585C21.8671 12.6925 21.9558 12.5399 22.073 12.4103C22.1902 12.2808 22.3333 12.1772 22.4929 12.1064C22.6526 12.0355 22.8253 11.9989 23 11.9989C23.1747 11.9989 23.3474 12.0355 23.5071 12.1064C23.6667 12.1772 23.8098 12.2808 23.927 12.4103C24.0442 12.5399 24.1329 12.6925 24.1875 12.8585C24.242 13.0244 24.2612 13.1999 24.2437 13.3737C25.6568 13.6607 26.9272 14.4274 27.8396 15.5439C28.752 16.6604 29.2503 18.0581 29.25 19.5C29.25 20.6 29.65 24.75 30.775 27Z"
        fill="#45556E"
      />
    </g>
    <circle cx={30} cy={16} r={4.5} fill="#E63950" stroke="white" />
    <defs>
      <filter
        id="filter0_d_13_313"
        x={0.615385}
        y={0.153846}
        width={48.3077}
        height={48.3077}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={0.769231} dy={2.30769} />
        <feGaussianBlur stdDeviation={3.07692} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_13_313"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_13_313"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_13_313">
        <rect
          width={20}
          height={20}
          fill="white"
          transform="translate(13 12)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default NotiHeader;
