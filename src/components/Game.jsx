import { useRef, useState } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  guessedLatters,
  wrongLetters,
  guesses,
  score,
  pickedCategory,
  pickedWord,
  latters,
}) => {
  const [latter, setLatter] = useState("");
  const latterInpurRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(latter);
    setLatter("");
    latterInpurRef.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      <div className="wordContainer">
        {latters.map((latter, i) =>
          guessedLatters.includes(latter) ? (
            <span key={i} className="latter">
              {latter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
        {/* <span className="latter"></span>
        <span className="blankSquare"></span> */}
      </div>
      <div className="latterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="latter"
            maxLength="1"
            required
            onChange={(e) => setLatter(e.target.value)}
            value={latter}
            ref={latterInpurRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLatterContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((latter, i) => (
          <span key={i}>{latter}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
