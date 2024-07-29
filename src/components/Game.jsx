import PropTypes from 'prop-types';

import './Game.css';

const Game = ({ 
  verifyLetter, pickedCategory, pickedWord, letters, 
  guessedLetters, wrongLetters, guesses, score}) => {
  return (
    <div className='game'>
        <p className='score'>
          <span>Pontuação: {score}</span>
        </p>
        <h1>Descubra a palavra:</h1>
        <h3 className='tip'>
          Dica: <span>{pickedCategory}</span>
        </h3>
        <h3>Você ainda tem {guesses} tentativa(s).</h3>
        <div className="word-container">
          {letters.map((letter, index) => (
            guessedLetters.includes(letter) ? (
              <span key={index} className="letter">{ letter }</span>
            ) : (
              <span key={index} className="blank-square"></span>
            )
          ))}
        </div>
        <div className='letter-container'>
          <p>Tente adivinhar uma letra:</p>
          <form>
            <input type='text' name='letter' maxLength={1} required/>
            <button>Jogar!</button>
          </form>
        </div>
        <div className='wrong-letters-container'>
          <p>Letras já utilizadas:</p>
          {wrongLetters.map((letter, index) => (
            <span key={index}>{letter}, </span>
          ))}
        </div>
    </div>
  )
}

Game.propTypes = {
    verifyLetter: PropTypes.func.isRequired,
    pickedCategory: PropTypes.string.isRequired,
    pickedWord: PropTypes.string.isRequired,
    letters: PropTypes.array.isRequired,
    guessedLetters: PropTypes.array.isRequired,
    wrongLetters: PropTypes.array.isRequired,
    guesses: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
}

export default Game