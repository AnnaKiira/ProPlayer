import { useState } from 'react'
import './Hangman.css'
import hangman0 from './hangmanImg/hangman-0.svg'
import hangman1 from './hangmanImg/hangman-1.svg'
import hangman2 from './hangmanImg/hangman-2.svg'
import hangman3 from './hangmanImg/hangman-3.svg'
import hangman4 from './hangmanImg/hangman-4.svg'
import hangman5 from './hangmanImg/hangman-5.svg'
import hangman6 from './hangmanImg/hangman-6.svg'

const hangmanImg = [hangman0, hangman1, hangman2, hangman3, hangman4, hangman5, hangman6]

function Hangman() {
    const [correctGuesses, setCorrectGuesses] = useState([])
    const [incorrectGuesses, setIncorrectGuesses] = useState(0)
    const [selectedKeys, setSelectedKeys] = useState([])
    const words = ['school', 'monkey', 'bottle', 'weather', 'flower']
    const [randomWord, setRandomWord] = useState(() => words[Math.floor(Math.random() * words.length)])
    const maxGuesses = 6;

    const handleKeyClick = (keyvalue) => {
        if (!selectedKeys.includes(keyvalue)) {
            setSelectedKeys([...selectedKeys, keyvalue])
            guessCheck(keyvalue)
        }
    }

    const guessCheck = (keyvalue) => {
        if (randomWord.includes(keyvalue)) {
            setCorrectGuesses([...correctGuesses, keyvalue])
        } else {
            setIncorrectGuesses(incorrectGuesses + 1)

            if (incorrectGuesses + 1 >= maxGuesses) {
                console.log('Game over! The correct word was:', randomWord)
            }
        }
    }

    const startNewGame = () => {
        setRandomWord(words[Math.floor(Math.random() * words.length)])
        setCorrectGuesses([])
        setIncorrectGuesses(0)
        setSelectedKeys([])
    }


    return (
        <div>

            <div className='hangman-drawing'>
                <img src={hangmanImg[incorrectGuesses]} alt={`Hangman guess ${incorrectGuesses}`} />
            </div>

            <div className='word-display'>
                {randomWord.split('').map((letter, index) => (
                    <span key={index} className='letter'>
                        {correctGuesses.includes(letter) ? letter : '_'}
                    </span>
                ))}
            </div>

            <div>
                <button onClick={startNewGame}>New Game</button>
            </div>

            <div>
                <h1>Keyboard</h1>

                <div className="keyboard">
                    {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map((keyvalue) => (
                        <div
                            key={keyvalue}
                            className={`key ${selectedKeys.includes(keyvalue) ? 'selected' : ''}`}
                            onClick={() => handleKeyClick(keyvalue)}
                        >
                            {keyvalue.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Hangman;