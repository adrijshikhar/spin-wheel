import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import $ from "jquery";
import { useDispatch } from "react-redux";

import Stopper from "../common/stopper";
import FullProgressArrow from "../common/fullProgressArrow";
import EmptyProgressArrow from "../common/emptyProgressArrow";
import { addDetails } from "../../actions/sheetActions";
import { Link } from "react-router-dom";
const Wheel = () => {
  const INR_SYMBOL = "₹";

  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [progressWidth, setProgressWidth] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winIndex, setWinIndex] = useState(0);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const refEl = useRef(null);

  const addSheetData = () => {
    const data = [
      {
        timestamp: Date.now(),
        web_client: "web-pwa",
        spin_result_index: winIndex,
      },
    ];
    dispatch(addDetails(data));
  };

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  const handleShow = () => setShow(true);

  const deltaAngle = (pR, cR) => {
    return pR - cR;
  };

  const spin = (progress) => {
    var degree = 1800;

    var newDegree = degree * progress;
    $(".wheel .sec").each(function () {
      $(".inner-wheel").css({
        transform: "rotate(" + newDegree + "deg)",
      });
    });
  };

  const clickSpin = () => {
    if (!spinning) {
      var degree = 1800,
        clicks = 1;

      var newDegree = degree * clicks;
      var extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1,
        totalDegree = newDegree + extraDegree;

      $(".wheel .sec").each(function () {
        $(".inner-wheel").css({
          transform: "rotate(" + totalDegree + "deg)",
        });
      });
    }
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
  },[]);

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
      $(".inner-wheel").on(
        "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function (event) {
          event.preventDefault();

          const c = event.target.style.transform,
            rd = c.split("(")[1].split(")")[0],
            ra = parseInt(rd.substring(0, rd.length - 3)),
            rm = ra % 360;
          let i = 0;
          switch (true) {
            case 337.5 <= rm && rm < 22.5:
              i = 1;
              break;
            case 22.5 <= rm && rm < 67.5:
              i = 2;
              break;
            case 67.5 <= rm && rm < 112.5:
              i = 3;
              break;
            case 112.5 <= rm && rm < 157.5:
              i = 4;
              break;
            case 157.5 <= rm && rm < 202.5:
              i = 5;
              break;
            case 202.5 <= rm && rm < 247.5:
              i = 6;
              break;
            case 247.5 <= rm && rm < 292.5:
              i = 7;
              break;
            case 292.5 <= rm && rm < 337.5:
              i = 8;
              break;
            default:
              i = 0;
          }
          setWinIndex(i);
        }
      );

      refEl.current.addEventListener("mouseup", (e) => {
        e.preventDefault();
        angle += rotation;
        if (dangle > 0 && progress > 80) {
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
        if (Math.abs(dangle) > 10) {
          rotation -= 360;
          dangle += 360;
        }
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

  useEffect(() => {
    if (winIndex !== 0) {
      addSheetData();
      handleShow();
      setSpinning(false);
    }
  }, [winIndex]);

  return (
    <div className="fortune-container unselectable">
      <div className="stopper-container" id="spin">
        <Stopper />
      </div>
      <div className="wheel-container">
        <div className="wheel" ref={refEl}>
          <div className="inner-wheel">
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
        <div
          className="spin-container"
          onClick={() => {
            setSpinning(true);
            clickSpin();
          }}
        >
          <div className="spin-inner">Spin</div>
        </div>
      </div>
      <div className="progress-container">
        <div className="vertical-seperator" />
        <FullProgressArrow progressWidth={progressWidth} />
        <EmptyProgressArrow />
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Game over</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you wanna play again?</Modal.Body>
        <Modal.Footer>
          <Link to="/">
            <Button variant="secondary">No</Button>
          </Link>
          <Button variant="primary" onClick={handleClose}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Wheel;
