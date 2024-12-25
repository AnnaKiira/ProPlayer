import { useEffect, useState, useCallback, useMemo } from 'react'
import './Hangman.css'
import hangman0 from './hangmanImg/hangman-0.svg'
import hangman1 from './hangmanImg/hangman-1.svg'
import hangman2 from './hangmanImg/hangman-2.svg'
import hangman3 from './hangmanImg/hangman-3.svg'
import hangman4 from './hangmanImg/hangman-4.svg'
import hangman5 from './hangmanImg/hangman-5.svg'
import hangman6 from './hangmanImg/hangman-6.svg'
import winAudioFile from '../../audio/youWin.mp3'
import loseAudioFile from '../../audio/youLose.mp3'

const hangmanImg = [hangman0, hangman1, hangman2, hangman3, hangman4, hangman5, hangman6]

function Hangman({registerResetHandler}) {
    const [correctGuesses, setCorrectGuesses] = useState([])
    const [incorrectGuesses, setIncorrectGuesses] = useState(0)
    const [selectedKeys, setSelectedKeys] = useState([])
    const words = useMemo(() => ['school', 'monkey', 'bottle', 'weather', 'flower'], [])
    const [randomWord, setRandomWord] = useState(() => words[Math.floor(Math.random() * words.length)])
    const maxGuesses = 6
    const [gameOver, setGameOver] = useState(false)
    const [isWinner, setIsWinner] = useState(false)

    const handleKeyClick = (keyvalue) => {
        if (selectedKeys.includes(keyvalue) || gameOver) return;
        if (!selectedKeys.includes(keyvalue)) {
            setSelectedKeys([...selectedKeys, keyvalue])
            guessCheck(keyvalue)
        }
    }

    const guessCheck = (keyvalue) => {
        if (randomWord.includes(keyvalue)) {
            const updatedCorrectGuesses = [...correctGuesses, keyvalue]
            setCorrectGuesses(updatedCorrectGuesses)

            if (randomWord.split('').every((letter) => updatedCorrectGuesses.includes(letter))) {
                setIsWinner(true)
                setGameOver(true)
                const winAudio = new Audio(winAudioFile)
                winAudio.play()
            }

        } else {
            setIncorrectGuesses(incorrectGuesses + 1)

            if (incorrectGuesses + 1 >= maxGuesses) {
                console.log('Game over! The correct word was:', randomWord)
                setGameOver(true)
                const loseAudio = new Audio(loseAudioFile)
                loseAudio.play()
            }
        }
    }

    const resetHangman = useCallback(() => {
        setRandomWord(words[Math.floor(Math.random() * words.length)])
        setCorrectGuesses([])
        setIncorrectGuesses(0)
        setSelectedKeys([])
        setGameOver(false)
        setIsWinner(false)
    }, [words])

    useEffect(() => {
        registerResetHandler(resetHangman)
    }, [registerResetHandler, resetHangman])


    return (
        <div className='hangmanGame'>

            <h1>HANGMAN</h1>
            
            <div className='hangmanContainer'>

                <div className='hangmanDrawing'>
                    <img src={hangmanImg[incorrectGuesses]} alt={`Hangman guess ${incorrectGuesses}`} />
                </div>

                <div className='wordDisplay'>
                    {randomWord.split('').map((letter, index,) => (
                        <span key={index} className='letter'>
                            {correctGuesses.includes(letter) ? letter : '_'}
                        </span>
                    ))}
                </div>

            </div>

            {gameOver && !isWinner && (
                <div className='gameOverHangman'>
                    <h2>Game Over!</h2>
                    <h3>Correct word was "{randomWord}"</h3>
                </div>
            )}

            {isWinner && (
                <div className='winnerHangman'>
                    <h2>Congratulations!</h2>
                    <h3>You guessed the correct word "{randomWord}"</h3>
                </div>
            )}

            <div className="hangmanKeyboard">
                {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'].map((keyvalue) => (
                    <div
                        key={keyvalue}
                        className={`key ${selectedKeys.includes(keyvalue) ? 'disabled' : ''}`}
                        onClick={() => handleKeyClick(keyvalue)}
                        style={{ pointerEvents: selectedKeys.includes(keyvalue) ? 'none' : 'auto' }}
                    >
                        {keyvalue.toUpperCase()}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Hangman;