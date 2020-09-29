/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
///////////////////////////////
// ------- drag rotate  -------- //
///////////////////////////////

(function () {
  let init;
  let rotate;
  let start;
  let stop;
  let active = false;
  let angle = 0;
  let rotation = 0;
  let startAngle = 0;
  let center = {
    x: 0,
    y: 0,
  };
  let R2D = 180 / Math.PI;
  let rot = document.getElementById("wheel-rotate");

  init = function () {
    $("#wheel-rotate").removeClass("inner-wheel")
    rot.addEventListener("mousedown", start, false);
    $(document).bind("mousemove", (event) => {
      if (active === true) {
        event.preventDefault();
        rotate(event);
      }
    });
    $(document).bind("mouseup", (event) => {
      event.preventDefault();
      stop(event);
    });
  };

  start = function (e) {
    e.preventDefault();
    let bb = this.getBoundingClientRect();
    let t = bb.top;
    let l = bb.left;
    let h = bb.height;
    let w = bb.width;
    let x;
    let y;
    center = {
      x: l + w / 2,
      y: t + h / 2,
    };
    x = e.clientX - center.x;
    y = e.clientY - center.y;
    startAngle = R2D * Math.atan2(y, x);
    return (active = true);
  };

  rotate = function (e) {
    e.preventDefault();
    let x = e.clientX - center.x;
    let y = e.clientY - center.y;
    let d = R2D * Math.atan2(y, x);
    rotation = d - startAngle;
    return (rot.style.webkitTransform = `rotate(${angle + rotation}deg)`);
  };

  stop = function () {
    angle += rotation;
    return (active = false);
  };

  init();
}.call(this));
