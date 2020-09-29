import React from "react";

const Wheel = () => {
  console.log(document.getElementById("wheel-rotate"));
  return (
    <div className="wheel-container">
      <div className="wheel">
        <div className="inner-wheel" id="wheel-rotate">
          <div className="sec">
            <span className="fa fa-bell-o"></span>
          </div>
          <div className="sec">
            <span className="fa fa-comment-o"></span>
          </div>
          <div className="sec">
            <span className="fa fa-smile-o"></span>
          </div>
          <div className="sec">
            <span className="fa fa-heart-o"></span>
          </div>
          <div className="sec">
            <span className="fa fa-star-o"></span>
          </div>
          <div className="sec">
            <span className="fa fa-lightbulb-o"></span>
          </div>
          <div className="sec">
            <span className="fa fa-lightbulb-o"></span>
          </div>
          <div className="sec">
            <span className="fa fa-lightbulb-o"></span>
          </div>
        </div>
        <div className="spin-container" id="spin">
          <div className="spin-inner" />
        </div>
      </div>
    </div>
  );
};

export default Wheel;
