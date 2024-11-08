import { useState } from 'react'

function Hangman() {
    const [selectedKeys, setSelectedKeys] = useState([]);
    const handleKeyClick = (keyvalue) => {
        if (!selectedKeys.includes(keyvalue)) {
            setSelectedKeys([...selectedKeys, keyvalue])
        }
    }

    return (
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
    )
}

export default Hangman;