import PropTypes from 'prop-types';

import './Game.css';

const Game = ({ verifyLetter }) => {
  return (
    <div className='game'>
        <h1>Game</h1>
        <button onClick={verifyLetter}>Finalizar jogo</button>
    </div>
  )
}

Game.propTypes = {
    verifyLetter: PropTypes.func.isRequired,
}

export default Game