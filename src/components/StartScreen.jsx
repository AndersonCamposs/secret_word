import PropTypes from 'prop-types'

import './StartScreen.css';

const StartScreen = ({ startGame }) => {
  return (
    <div className='start-screen'>
        <h1>Secret Word</h1>
        <p>Clique no botão para iniciar o jogo.</p>
        <button onClick={startGame}>Iniciar o jogo</button>
    </div>
  )
}

StartScreen.propTypes = {
    startGame: PropTypes.func.isRequired,
}

export default StartScreen