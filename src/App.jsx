//Component imports
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'
//Hooks imports 
import {useCallback, useEffect, useState} from 'react';
//Data imports
import { wordsList } from './data/words';
//Style imports
import './App.css'

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);
  
  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    // pick a random category
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    
    return { category, word };
  }, [words]);

  //starts game
  const startGame = useCallback(() => {
    // clear all letters states
    clearLetterStates();
    // pick word and category
    const { category, word } = pickWordAndCategory();
    // create an array the picked word
    let arrayLetters = word.split('');
    // convert all letters to uppercase
    arrayLetters = arrayLetters.map((l) => l.toUpperCase());
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(arrayLetters);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //process letter input
  const verifyLetter = (letter) => {
    letter = letter.toUpperCase();
    // verify if letter has already been utilized
    if (guessedLetters.includes(letter) 
      || wrongLetters.includes(letter)) return;

    // push guessed letter or remove a guess
    if (letters.includes(letter)) {
      setGuessedLetters((prevGuessedLetters) => [
        ...prevGuessedLetters, letter
      ])
    } else {
      setWrongLetters((prevWrongLetters) => [
        ...prevWrongLetters, letter
      ])
      setGuesses((prevGuesses) => prevGuesses - 1)
    } 
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  // check defeat condition
  useEffect(() => {
    if (guesses <= 0) { 
      // reset all states
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses])
  
  // check win condition
  useEffect(() => {
    /* impede que por algum motivo ainda desconhecido, assim como
    estava ocorrendo esta função caia na  linha 97 
    antes do usuário jogar o jogo  01/08/2024 - 23:35 */
    if (letters.length == 0) return;
    const uniqueLetters = [... new Set(letters)];
    // win condition
    if (guessedLetters.length === uniqueLetters.length) {
      console.log('ok')
      setScore((prevScore) => prevScore += 150);
      startGame();
    }
  }, [guessedLetters, letters, startGame])

  // restart game
  const retry = () => {
    setScore(0);
    setGuesses(5);
    setGameStage(stages[0].name);
  }

  return (
    <div className='App'>
    {gameStage === 'start' && <StartScreen startGame={startGame}/>}
    {gameStage === 'game' && 
    <Game 
    verifyLetter={verifyLetter} 
    pickedCategory={pickedCategory} 
    pickedWord={pickedWord} 
    letters={letters}
    guessedLetters={guessedLetters}
    wrongLetters={wrongLetters}
    guesses={guesses}
    score={score}/>}
    {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  )
}

export default App
