import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Wheel = () => {
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [animateAngle, setAnimateAngle] = useState(0);
  const [duration, setDuration] = useState(0.001);
  const refEl = useRef(null);

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
    if (center.x !== 0) {
      let active = false;
      let R2D = 180 / Math.PI;
      let startAngle = 0;
      let angle = 0;
      let rotation = 0;
      refEl.current.addEventListener("mouseup", (e) => {
        e.preventDefault();
        angle += rotation;
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
        console.log(rotation);
        return (refEl.current.style.webkitTransform = `rotate(${
          angle + rotation
        }deg)`);
      });
    }
  }, [center]);
  return (
    <div className="wheel-container">
      <div className="wheel" ref={refEl}>
        <motion.div
          animate={{ rotate: animateAngle }}
          transition={{ duration }}
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
  );
};

export default Wheel;
