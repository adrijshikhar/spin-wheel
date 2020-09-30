import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import $ from "jquery";

import Stopper from "../common/stopper";
import FullProgressArrow from "../common/fullProgressArrow";
import EmptyProgressArrow from "../common/emptyProgressArrow";

const Wheel = () => {
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [progressWidth, setProgressWidth] = useState(0);
  const [show, setShow] = useState(false);
  const INR_SYMBOL = "₹";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const refEl = useRef(null);
  const deltaAngle = (pR, cR) => {
    return pR - cR;
  };
  const spin = (progress) => {
    var degree = 1800;

    /*multiply the degree by number of clicks
	  generate random number between 1 - 360,
    then add to the new degree*/
    var newDegree = degree * progress;
    $(".wheel .sec").each(function () {
      // var t = $(this);

      // var c = 0;
      // var n = 700;
      // var interval = setInterval(function () {
      //   c++;
      //   if (c === n) {
      //     clearInterval(interval);
      //   }

      //   var aoY = t.offset().top;
      //   console.log(aoY);
      //   if (aoY < 300) {
      //     $("#spin").addClass("spin");
      //     setTimeout(function () {
      //       $("#spin").removeClass("spin");
      //     }, 100);
      //   }
      // }, 10);

      $(".inner-wheel").css({
        transform: "rotate(" + newDegree + "deg)",
      });
    });
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
      refEl.current.addEventListener("mouseup", (e) => {
        e.preventDefault();
        angle += rotation;
        if (dangle > 0 && progress > 82) {
          spin(progress / 100);
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
      <div className="stopper-container" id="spin">
        <Stopper />
      </div>
      <div className="wheel-container">
        <div className="wheel" ref={refEl}>
          <div className="inner-wheel" id="wheel-rotate">
            <div className="sec">
              <span className="sec-text">
                Better luck <br /> next time!
              </span>
            </div>
            <div className="sec">
              <span className="sec-text">{INR_SYMBOL} 50</span>
            </div>
            <div className="sec">
              <span className="sec-text">
                2X <br />
                <span className="sec-subtext">Savings</span>
              </span>
            </div>
            <div className="sec">
              <span className="sec-text">
                1.5X <br />
                <span className="sec-subtext">Savings</span>
              </span>
            </div>
            <div className="sec">
              <span className="sec-text">{INR_SYMBOL} 50</span>
            </div>
            <div className="sec">
              <span className="sec-text">{INR_SYMBOL} 20</span>
            </div>
            <div className="sec">
              <span className="sec-text">
                {INR_SYMBOL} 100
                <br />
                <span className="sec-subtext">Cashback</span>
              </span>
            </div>
            <div className="sec">
              <span className="sec-text">
                2X <br />
                <span className="sec-subtext">Savings</span>
              </span>
            </div>
          </div>
        </div>
        <div className="spin-container">
          <div className="spin-inner" />
        </div>
      </div>
      <div className="progress-container">
        <div className="vertical-seperator" />
        <FullProgressArrow progressWidth={progressWidth} />
        <EmptyProgressArrow />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Wheel;
