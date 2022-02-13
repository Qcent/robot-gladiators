import React from "react";
import '../../assets/css/pokeBattle.css';

import UIGame from "../../assets/js/game"

function Game() {

  return (
    <>  
      {UIGame.startGame()}
    </>
  );
}

export default Game;