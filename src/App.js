import {useState} from 'react'
import './App.css'
import Hangman from './games/hangman/Hangman'
import Wordle from './games/wordle/Wordle'
import NumberGuesser from './games/number-guesser/NumberGuesser'

function App() {
  const [selectedGame, setSelectedGame] = useState(null)
  const [resetHandler, setResetHandler] = useState(null)

  const registerResetHandler = (handler) => {
    setResetHandler(() => handler) 
  }


  const startNewGame = () => {
    if (resetHandler) resetHandler() 
  }

  return (
    <div className='gamescontainer'>

      <h1>ProPlayer</h1>

      {selectedGame && (
        <div className='actionBtn'>
          <button className='backBtn' onClick={() => setSelectedGame(null)}>Back</button>
          <button className='resetGameBtn' onClick={startNewGame}>Restart Game</button>
        </div>
      )}

      {!selectedGame && (
        <div className='gamesBtn'>
      <button className='hangmanBtn' onClick={() => setSelectedGame('Hangman')}>Play Hangman</button>
      <button className='wordleBtn' onClick={() => setSelectedGame('Wordle')}>Play Wordle</button>
      <button className='numberGuesserBtn' onClick={() => setSelectedGame('NumberGuesser')}>Play Number Guesser</button>
      </div>
      )}

      {selectedGame === 'Hangman' && <Hangman registerResetHandler={registerResetHandler} />}
      {selectedGame === 'Wordle' && <Wordle registerResetHandler={registerResetHandler} />}
      {selectedGame === 'NumberGuesser' && <NumberGuesser registerResetHandler={registerResetHandler} />}

      

    </div>
  )
}

export default App;