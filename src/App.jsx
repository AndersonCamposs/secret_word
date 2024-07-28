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
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

  // restart game
  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (
    <div className='App'>
    {gameStage === 'start' && <StartScreen startGame={startGame}/>}
    {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
    {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  )
}

export default App
