import React from "react";

const EmptyProgressArrow = () => {
  return (
    <div className="empty-progress-bar">
      <svg
        width="250"
        height="61"
        viewBox="0 0 161 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M130.5 8.5C66.5 30.5 17.3333 12.3333 0 2.5C26 35.7 101.5 32.8333 136 23L140.5 31L161 2.5L126 0L130.5 8.5Z"
          fill="#BBBBBB"
        />
      </svg>
    </div>
  );
};

export default EmptyProgressArrow;
