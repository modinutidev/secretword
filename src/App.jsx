import { useEffect, useState } from "react";
import "./App.css";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import StartScreen from "./components/StartScreen";

import { wordsList } from "./data/words.jsx";

const App = () => {
  const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "gameover" },
  ];
  const guessesQty = 5;

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [latters, setLatters] = useState([]);

  const [guessedLatters, setGuessedLatters] = useState([]); // letras adivinhadas
  const [wrongLetters, setWrongLetters] = useState([]); // letras erradas
  const [guesses, setGuesses] = useState(guessesQty); // tentativas
  const [score, setScore] = useState(0); // pontos

  const pickWordAndCategory = () => {
    // pick category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    // pick word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { category, word };
  };

  // start the game
  const startGame = () => {
    // clear all latters
    clearLatterStates();

    setGuesses(guessesQty);
    setScore(0);

    // pick word and pick category
    const { category, word } = pickWordAndCategory();

    // create an array of latters
    let wordLatters = word.toLowerCase().split("");

    // fill states
    setPickedCategory(category);
    setPickedWord(word);
    setLatters(wordLatters);

    // Muda estado do jogo
    setGameStage(stages[1].name);
  };

  // process letter input
  const verifyLetter = (latter) => {
    const normalizedLatter = latter.toLowerCase();

    if (
      guessedLatters.includes(normalizedLatter) ||
      wrongLetters.includes(normalizedLatter)
    ) {
      return;
    }

    if (latters.includes(normalizedLatter)) {
      setGuessedLatters((prevGuessed) => [...prevGuessed, normalizedLatter]);
    } else {
      setWrongLetters((prevWrong) => [...prevWrong, normalizedLatter]);
      setGuesses((prevGuesses) => prevGuesses - 1);
    }
  };

  const clearLatterStates = () => {
    setGuessedLatters([]);
    setWrongLetters([]);
  };

  // check guesses
  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLatterStates();

      // game over
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // check win condicional
  useEffect(() => {
    // unique latters
    const uniqueLatters = [...new Set(latters)];

    if (uniqueLatters.length > 0) {
      if (uniqueLatters.length === guessedLatters.length) {
        // add score
        setScore((prevScore) => (prevScore += 100));

        // restart game with new word
        startGame();
      }
    }
  }, [guessedLatters, latters, startGame]);

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          guessedLatters={guessedLatters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          pickedCategory={pickedCategory}
          pickedWord={pickedWord}
          latters={latters}
        />
      )}
      {gameStage === "gameover" && <GameOver retry={startGame} score={score} />}
    </div>
  );
};

export default App;
