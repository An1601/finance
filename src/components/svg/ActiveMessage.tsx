import React from "react";

type CheckMessageProps = {
  color: string;
  [key: string]: any;
};

const ActiveMessage: React.FC<CheckMessageProps> = ({ props, color }) => (
  <svg
    width={10}
    height={10}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      id="Ellipse 47"
      cx={5}
      cy={5}
      r={4.25}
      fill={color}
      stroke="white"
      strokeWidth={1.5}
    />
  </svg>
);
export default ActiveMessage;
