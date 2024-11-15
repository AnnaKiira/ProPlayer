import {useState} from 'react'
import './App.css'
import Hangman from './games/hangman/Hangman'
import Wordle from './games/wordle/Wordle'
import NumberGuesser from './games/number-guesser/NumberGuesser'

function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className='gamescontainer'>

      <h1>ProPlayer</h1>

      {selectedGame && (
        <div className='actionBtn'>
          <button className='backBtn' onClick={() => setSelectedGame(null)}>Back</button>
        </div>
      )}

      {!selectedGame && (
        <div className='gamesBtn'>
      <button onClick={() => setSelectedGame('Hangman')}>Play Hangman</button>
      <button onClick={() => setSelectedGame('Wordle')}>Play Wordle</button>
      <button onClick={() => setSelectedGame('NumberGuesser')}>Play Number Guesser</button>
      </div>
      )}

      {selectedGame === 'Hangman' && <Hangman />}
      {selectedGame === 'Wordle' && <Wordle />}
      {selectedGame === 'NumberGuesser' && <NumberGuesser />}

      

    </div>
  )
}

export default App;