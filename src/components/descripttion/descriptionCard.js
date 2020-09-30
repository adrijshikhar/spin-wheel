import React from "react";

const DescriptionCard = () => {
  return (
    <>
      <div className="desc-container">
        <div className="desc-header">Spin the wheel now to get rewarded</div>
        <div className="desc-para">
          Tap on Spin or rotate the wheel anti-clockwise and release to start
          spinning{" "}
        </div>
      </div>
      <div className="help-container">
        Have a question? <span className="get-help">Get help</span>
      </div>
    </>
  );
};

export default DescriptionCard;
