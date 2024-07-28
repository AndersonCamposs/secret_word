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
  console.log(words)
  return (
    <div className='App'>
    {gameStage === 'start' && <StartScreen/>}
    {gameStage === 'game' && <Game/>}
    {gameStage === 'end' && <GameOver/>}
    </div>
  )
}

export default App
