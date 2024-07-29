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
  const [wrongLetters, setWrongLetters] = useState(['a', 'b']);
  const [guesses, setGuesses] = useState(5);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    // pick a random category
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    
    return { category, word };
  }

  //starts game
  const startGame = () => {
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
  }

  //process letter input
  const verifyLetter = (letter) => {
    letter = letter.toUpperCase();
    // verify if letter has already been utilized
    if (guessedLetters.includes(letter) 
      || wrongLetters.includes(letter)) return;

    // push guessed letter or remove a guess
    if (guessedLetters.includes(letter)) {
      setGuessedLetters((prevGuessedLetters) => {
        [...prevGuessedLetters, letter]
      })
    } else {
      setWrongLetters((prevWrongLetters) => {
        [...prevWrongLetters, letter]
      })
    }

    console.log(guessedLetters);
    console.log(wrongLetters);
  }

  // restart game
  const retry = () => {
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
    {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  )
}

export default App
