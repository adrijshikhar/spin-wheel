import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import FullProgressArrow from "../../common/fullProgressArrow";
import EmptyProgressArrow from "../../common/emptyProgressArrow";

const Wheel = () => {
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [animateAngle, setAnimateAngle] = useState(0);
  const [duration, setDuration] = useState(1);
  const [progressWidth, setProgressWidth] = useState(0);
  const [charge, setCharge] = useState(0);

  const refEl = useRef(null);
  const fullProgressArrowRef = useRef(null);
  const deltaAngle = (pR, cR) => {
    return pR - cR;
  };
  useEffect(() => {
    if (center.x === 0) {
      const {
        offsetHeight,
        offsetTop,
        offsetWidth,
        offsetLeft,
      } = refEl.current;
      setCenter({
        x: offsetWidth / 2 + offsetLeft,
        y: offsetHeight / 2 + offsetTop,
      });
    }
  });
  useEffect(() => {
    if (animateAngle !== 0) {
      console.log(animateAngle);
      setTimeout(() => {
        setAnimateAngle(0);
      }, 1000);
    }
  }, [animateAngle]);
  useEffect(() => {
    if (center.x !== 0) {
      let active = false,
        R2D = 180 / Math.PI,
        startAngle = 0,
        angle = 0,
        rotation = 0,
        pR = 0,
        progress = 0,
        dangle;

      const dprogress = 1;
      console.log(fullProgressArrowRef);
      refEl.current.addEventListener("mouseup", (e) => {
        e.preventDefault();
        angle += rotation;
        if (dangle > 0 && progress > 82) {
          console.log(progress);
          setAnimateAngle(progress * 10);
          progress = 0;
          setProgressWidth(0);
        }
        return (active = false);
      });
      refEl.current.addEventListener(
        "mousedown",
        function (e) {
          e.preventDefault();
          const x = e.clientX - center.x;
          const y = e.clientY - center.y;
          startAngle = R2D * Math.atan2(y, x);
          return (active = true);
        },
        false
      );

      refEl.current.addEventListener("mousemove", (e) => {
        if (!active) return;
        e.preventDefault();
        let x = e.clientX - center.x;
        let y = e.clientY - center.y;
        let d = R2D * Math.atan2(y, x);
        rotation = d - startAngle;
        dangle = deltaAngle(pR, rotation);
        if (dangle > 0) {
          if (progress < 250) {
            progress += dprogress;
          }
        } else {
          if (progress > 0) {
            progress -= dprogress;
          }
        }

        setProgressWidth(progress);
        pR = rotation;
        return (refEl.current.style.webkitTransform = `rotate(${
          angle + rotation
        }deg)`);
      });
    }
  }, [center]);
  return (
    <div className="fortune-container">
      <div className="wheel-container">
        <div className="wheel" ref={refEl}>
          <motion.div
            animate={{ rotate: animateAngle }}
            transition={{ duration:0 }}
            className="inner-wheel"
            id="wheel-rotate"
          >
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
          </motion.div>
        </div>
        <div className="spin-container" id="spin">
          <div className="spin-inner" />
        </div>
      </div>
      <div className="progress-container">
        <div className="vertical-seperator" />
        <FullProgressArrow progressWidth={progressWidth} />
        <EmptyProgressArrow />
      </div>
    </div>
  );
};

export default Wheel;
