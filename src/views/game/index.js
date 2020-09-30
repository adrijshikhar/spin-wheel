import React from "react";

import Wheel from "../../components/wheel/wheel";
import DescriptionCard from "../../components/descripttion/descriptionCard";

const Game = () => {
  return (
    <div className="game-container">
      <Wheel />
      <DescriptionCard />
    </div>
  );
};

export default Game;
