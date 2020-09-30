import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SpinningWheel from "../../components/common/spinningWheel";
const Home = () => {
  return (
    <div className="home-container">
      <SpinningWheel />
      <div className="home-header">Spin the Wheel</div>
      <Link to="/game" className="mt-4">
        <Button variant="primary">Play!</Button>
      </Link>
    </div>
  );
};

export default Home;
