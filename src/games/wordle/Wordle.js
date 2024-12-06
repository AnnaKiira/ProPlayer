import { useEffect, useState, useMemo, useCallback } from 'react'
import './Wordle.css'

function Wordle({registerResetHandler}) {
    const [grid, setGrid] = useState(Array(6).fill('').map(() => Array(5).fill('')))
    const [currentRow, setCurrenRow] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const words = useMemo(() => ['shade', 'haunt', 'audio', 'plane', 'canoe', 'raise', 'dream', 'title', 'panic'], [])
    const [randomWord, setRandomWord] = useState(() => words[Math.floor(Math.random() * words.length)])
    const [gameOver, setGameOver] = useState(false)
    const [isWinner, setIsWinner] = useState(false)


    const handleKeyClick = (keyvalue) => {
        if (gameOver) return

        if (currentGuess.length < 5) {
            const updatedGuess = currentGuess + keyvalue
            setCurrentGuess(updatedGuess)

            const updatedGrid = [...grid]
            updatedGrid[currentRow][currentGuess.length] = keyvalue
            setGrid(updatedGrid)
        }
    }

    const resetWordle = useCallback(() => {
        setRandomWord(words[Math.floor(Math.random() * words.length)])
        setGrid(Array(6).fill('').map(() => Array(5).fill('')))
        setCurrenRow(0)
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
                                className={`cell ${rowIndex === currentRow ? 'active' : ''}`}
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}

            </div>

            <div className='keyboard'>

                {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'].map((keyvalue) => (
                    <div
                        key={keyvalue}
                        className={`key ${gameOver ? 'disabled' : ''}`}
                        onClick={() => handleKeyClick(keyvalue)}
                    >
                        {keyvalue.toUpperCase()}
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Wordle;