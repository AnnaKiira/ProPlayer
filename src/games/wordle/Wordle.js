import { useEffect, useState, useMemo, useCallback } from 'react'
import './Wordle.css'

function Wordle({registerResetHandler}) {
    const [grid, setGrid] = useState(Array(6).fill('').map(() => Array(5).fill({ letter: '', color: '' })))
    const [currentRow, setCurrentRow] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const words = useMemo(() => ['shade', 'haunt', 'audio', 'plane', 'canoe', 'raise', 'dream', 'title', 'panic'], [])
    const [randomWord, setRandomWord] = useState(() => words[Math.floor(Math.random() * words.length)])
    const [gameOver, setGameOver] = useState(false)
    const [isWinner, setIsWinner] = useState(false)


    const handleKeyClick = (keyvalue) => {
        if (gameOver) return

        if (keyvalue.length === 1 && currentGuess.length < 5) {
            const updatedGuess = currentGuess + keyvalue
            setCurrentGuess(updatedGuess)

            const updatedGrid = [...grid]
            updatedGrid[currentRow][currentGuess.length] = { letter: keyvalue, color: '' }
            setGrid(updatedGrid)
        }

        if (keyvalue === 'DELETE') {
            if (currentGuess.length > 0) {
                const updatedGuess = currentGuess.slice(0, -1)
                setCurrentGuess(updatedGuess)

                const updatedGrid = [...grid]
                updatedGrid[currentRow][currentGuess.length - 1] = { letter: '', color: '' }
                setGrid(updatedGrid)
            }
        }
    }

    const handleSubmitGuess = () => {
        if (currentGuess.length < 5) {
            alert('Not enough letters')
            return
        }

        const updatedGrid = [...grid]
        const randomWordArray = randomWord.split('')
        const guessArray = currentGuess.split('')
        const feedback = Array(5).fill('')

        guessArray.forEach((letter, index) => {
            if (letter === randomWordArray[index]) {
                feedback[index] = 'green'
                randomWordArray[index] = null
            }
        })

        guessArray.forEach((letter, index) => {
            if (!feedback[index] && randomWordArray.includes(letter)) {
                feedback[index] = 'yellow'
                randomWordArray[randomWordArray.indexOf(letter)] = null
            }
        })

        feedback.forEach((color, index) => {
            if (!color) {
                feedback[index] = 'grey'
            }
        })

        /* Applying feedback to the grid */
        updatedGrid[currentRow] = guessArray.map((letter, index) => ({
            letter,
            color: feedback[index],
        }))

        setGrid(updatedGrid)

        if (currentGuess === randomWord) {
            setGameOver(true)
            setIsWinner(true)
        } else if (currentRow === 5) {
            setGameOver(true)
        } else {
            setCurrentRow(currentRow + 1)
            setCurrentGuess('')
        }
    }

    const resetWordle = useCallback(() => {
        setRandomWord(words[Math.floor(Math.random() * words.length)])
        setGrid(Array(6).fill('').map(() => Array(5).fill({letter:'', color:''})))
        setCurrentRow(0)
        setCurrentGuess('')
        setGameOver(false)
        setIsWinner(false)
    }, [words])

    useEffect(() => {
        registerResetHandler(resetWordle)
    }, [registerResetHandler, resetWordle])

    return (
        <div className='wordleGame'>
            <h1>WORDLE</h1>

            <div className="wordleGrid">

                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, columnIndex) => (
                            <div
                                key={columnIndex}
                                className={`cell ${cell.color} ${rowIndex === currentRow ? 'active' : ''}`}
                            >
                                {cell.letter}
                            </div>
                        ))}
                    </div>
                ))}

            </div>

            {gameOver && !isWinner && (
                <div className='gameOverMessage'>
                    <h2>Game Over!</h2>
                    <h3>Correct word was "{randomWord}"</h3>
                </div>
            )}

            {gameOver && isWinner && (
                <div className='winnerMessage'>
                    <h2>Congratulations!</h2>
                    <h3>You guessed the correct word "{randomWord}"</h3>
                </div>
            )}

            <div className='keyboard'>

                {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'DELETE', 'SUBMIT'].map((keyvalue) => (
                    <div
                        key={keyvalue}
                        className={`key ${keyvalue === 'DELETE' || keyvalue === 'SUBMIT' ? 'special' : ''}`}
                        onClick={() => {
                            if (keyvalue === 'SUBMIT') {
                                handleSubmitGuess()
                            } else {
                                handleKeyClick(keyvalue)
                            }
                        }}
                    >
                        {keyvalue.toUpperCase()}
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Wordle;