// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { guess, startGame, restart } from "./axios";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");

  const handleGuess = async () => {
    // console.log(number, typeof number);
    const response = await guess(number);
    // console.log(response);

    if (response === "Equal") setHasWon(true);
    else {
      setStatus(response);
      setNumber("");
    }
  };
  const startMenu = (
    <div>
      <button
        onClick={async () => {
          const game = await startGame();
          setHasStarted(true);
          console.log(game);
        }}
      >
        Start game
      </button>
    </div>
  );

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        onChange={(e) => {
          setNumber(e.target.value);
        }}
        value={number}
      ></input>
      <button onClick={handleGuess} disabled={!number}>
        Guess!
      </button>
      <p>{status}</p>
    </>
  );

  const winningMode = (
    <>
      <p>You won! The number was {number}.</p>
      <button
        onClick={async () => {
          const game = await restart();
          setHasStarted(true);
          setHasWon(false);
          setNumber("");
          setStatus("");
          console.log(game);
        }}
      >
        Restart
      </button>
    </>
  );

  const game = <div>{hasWon ? winningMode : gameMode}</div>;

  return <div className="App">{hasStarted ? game : startMenu}</div>;
}

export default App;
