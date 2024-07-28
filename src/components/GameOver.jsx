import PropTypes from 'prop-types';

import './GameOver.css';

const GameOver = ({ retry }) => {
  return (
    <div>
      <h1>Game over</h1>
      <button onClick={retry}>Jogar Novamente</button>
    </div>
  )
}

GameOver.propTypes = {
  retry: PropTypes.func.isRequired,
}

export default GameOver;