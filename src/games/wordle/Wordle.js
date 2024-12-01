import { useState } from 'react'
import './Wordle.css'

function Wordle() {
    const [grid, /* setGrid */] = useState(Array(6).fill('').map(() => Array(5).fill('')))
    const [currentRow, /* setCurrenRow */] = useState(0)
    /* const words = useMemo(() => ['shade', 'haunt', 'audio', 'plane', 'canoe', 'raise', 'dream', 'title', 'panic'], []) */
    /* const [randomWord, setRandomWord] = useState(() => words[Math.floor(Math.random() * words.length)]) */
    /* const [gameOver, setGameOver] = useState(false) */
    /* const [isWinner, setIsWinner] = useState(false) */

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

        </div>
    )
}

export default Wordle;