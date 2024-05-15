const EmailHeader = (props: any) => (
  <svg
    width={49}
    height={49}
    viewBox="0 0 49 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_13_320)">
      <circle cx={24} cy={22} r={18} fill="white" />
    </g>
    <path
      d="M14 17C14 16.337 14.2634 15.7011 14.7322 15.2322C15.2011 14.7634 15.837 14.5 16.5 14.5H31.5C32.163 14.5 32.7989 14.7634 33.2678 15.2322C33.7366 15.7011 34 16.337 34 17V27C34 27.663 33.7366 28.2989 33.2678 28.7678C32.7989 29.2366 32.163 29.5 31.5 29.5H16.5C15.837 29.5 15.2011 29.2366 14.7322 28.7678C14.2634 28.2989 14 27.663 14 27V17ZM16.5 15.75C16.1685 15.75 15.8505 15.8817 15.6161 16.1161C15.3817 16.3505 15.25 16.6685 15.25 17V17.2713L24 22.5212L32.75 17.2713V17C32.75 16.6685 32.6183 16.3505 32.3839 16.1161C32.1495 15.8817 31.8315 15.75 31.5 15.75H16.5ZM32.75 18.7287L26.865 22.26L32.75 25.8812V18.7287ZM32.7075 27.3237L25.6575 22.985L24 23.9788L22.3425 22.985L15.2925 27.3225C15.3635 27.5885 15.5204 27.8236 15.7387 27.9913C15.9571 28.159 16.2247 28.25 16.5 28.25H31.5C31.7752 28.25 32.0426 28.1593 32.261 27.9918C32.4793 27.8243 32.6362 27.5895 32.7075 27.3237ZM15.25 25.8812L21.135 22.26L15.25 18.7287V25.8812Z"
      fill="#45556E"
    />
    <defs>
      <filter
        id="filter0_d_13_320"
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
          result="effect1_dropShadow_13_320"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_13_320"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default EmailHeader;
