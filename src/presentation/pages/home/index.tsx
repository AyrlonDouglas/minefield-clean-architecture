import RestartIcon from "@presentation/components/icons/Restart";
import { useRef, useState } from "react";
import "./style.css";
import AppBoard, { AppBoardProps } from "@presentation/components/Board";

type levelType = 0 | 1 | 2;

const settingsTemplate: AppBoardProps[] = [
  { numberOfMines: 3, sizeOnXAxis: 5, sizeOnYAxis: 5 },
  { numberOfMines: 10, sizeOnXAxis: 8, sizeOnYAxis: 8 },
  { numberOfMines: 20, sizeOnXAxis: 10, sizeOnYAxis: 10 },
];

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [settingsBoard, setSettingsBoard] = useState<AppBoardProps>();
  const boardRef = useRef(null);

  const chooseLevel = (level: levelType) => {
    configBoard(level);
    setGameStarted(true);
  };

  const configBoard = (level: levelType) => {
    setSettingsBoard(settingsTemplate[level]);
  };

  const restartGame = () => {
    setGameStarted(false);
  };

  return (
    <>
      <h1>Minefield The Game!</h1>
      {!gameStarted ? (
        <>
          <h4>Are you ready?</h4>
          <p>To start the game, choice a level</p>
        </>
      ) : null}
      <div className="wrapper-buttons-level">
        <button disabled={gameStarted} onClick={() => chooseLevel(0)}>
          Initial
        </button>
        <button disabled={gameStarted} onClick={() => chooseLevel(1)}>
          Midlle
        </button>
        <button disabled={gameStarted} onClick={() => chooseLevel(2)}>
          Hard
        </button>
        {gameStarted && (
          <button onClick={() => restartGame()}>
            <RestartIcon width={24} height={24} fill="white" />
          </button>
        )}
      </div>
      {settingsBoard && gameStarted && (
        <AppBoard props={settingsBoard} ref={boardRef} />
      )}
    </>
  );
}
