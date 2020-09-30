import React from "react";

const FullProgressArrow = ({ progressWidth }) => {
  return (
    <div className="full-progress-bar" style={{ width: progressWidth }}>
      <svg
        width="250"
        height="61"
        viewBox="0 0 161 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <linearGradient id="gradient">
          <stop className="main-stop" offset="-5.9%" />
          <stop className="mid-stop" offset="44.49%" />
          <stop className="alt-stop" offset="100%" />
        </linearGradient>
        <path
          d="M130.5 8.5C66.5 30.5 17.3333 12.3333 0 2.5C26 35.7 101.5 32.8333 136 23L140.5 31L161 2.5L126 0L130.5 8.5Z"
          fill="url(#gradient)"
        />
      </svg>
    </div>
  );
};

export default FullProgressArrow;
