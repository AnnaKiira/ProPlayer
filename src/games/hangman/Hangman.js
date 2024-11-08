import { useState } from 'react'

function Hangman() {
    const [selectedKeys, setSelectedKeys] = useState([])
    const handleKeyClick = (keyvalue) => {
        if (!selectedKeys.includes(keyvalue)) {
            setSelectedKeys([...selectedKeys, keyvalue])
            guessCheck(keyvalue) // calling guessCheck to validate the guess
        }
    }

    const words = ['school', 'monkey', 'bottle', 'weather', 'flower']
    const [randomWord, setRandomWord] = useState(() => words[Math.floor(Math.random() * words.length)])
    
    const maxGuesses = 10;

    const [correctGuesses, setCorrectGuesses] = useState([])

    const guessCheck = (keyvalue) => {
        if (randomWord.includes(keyvalue)) {
            setCorrectGuesses([...correctGuesses, keyvalue])
        } else {
            // if incorrect, trigger visual feedback and Hangman drawing
            // track incorrect guesses
        }
    }


    return (
        <div>
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

        <div className='word-display'>
            {randomWord.split('').map((letter, index) => (
                <span key={index} className='letter'>
                    {correctGuesses.includes(letter) ? letter : '_'}
                </span>
            ))}
        </div>
        </div>
    )
}

export default Hangman;