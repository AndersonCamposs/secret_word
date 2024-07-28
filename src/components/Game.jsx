import PropTypes from 'prop-types';

import './Game.css';

const Game = ({ verifyLetter, pickedCategory, pickedWord, letters}) => {
  return (
    <div className='game'>
        <p className='score'>
          <span>Pontuação: 000</span>
        </p>
        <h1>Descubra a palavra:</h1>
        <h3 className='tip'>
          <span>Dica: ...</span>
        </h3>
        <h3>Você ainda tem xxx tentativa(s).</h3>
        <div className="word-container">
          <span className="letter">A</span>
          <span className="blank-square"></span>
        </div>
        <div className="letter-container">
          <p>Tente adivinhar uma letra:</p>
          <form>
            <input type="text" name='letter' maxLength={1} required/>
            <button>Jogar!</button>
          </form>
        </div>
        <div className="wrong-letters-container">
          <p>Letras já utilizadas:</p>
          <span>a,</span>
          <span>b,</span>
        </div>
    </div>
  )
}

Game.propTypes = {
    verifyLetter: PropTypes.func.isRequired,
    pickedCategory: PropTypes.string.isRequired,
    pickedWord: PropTypes.string.isRequired,
    letters: PropTypes.array.isRequired,
}

export default Game