import {useState} from 'react'
import Hangman from './games/hangman/Hangman'
import Wordle from './games/wordle/Wordle'
import NumberGuesser from './games/number-guesser/NumberGuesser'

function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div>
      <h1>Games</h1>
      <button onClick={() => setSelectedGame('Hangman')}>Play Hangman</button>
      <button onClick={() => setSelectedGame('Wordle')}>Play Wordle</button>
      <button onClick={() => setSelectedGame('NumberGuesser')}>Play Number Guesser</button>

      {selectedGame === 'Hangman' && <Hangman />}
      {selectedGame === 'Wordle' && <Wordle />}
      {selectedGame === 'NumberGuesser' && <NumberGuesser />}
    </div>
  )
}

export default App;