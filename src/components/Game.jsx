import React, { useState } from 'react';
import { calculateWinner } from 'utils';
import Board from './Board';

const tempSize = parseInt(prompt('Nhập kích thước bàn cờ: '));
const size = tempSize >= 5 ? tempSize : 5;

function Game() {
    const [history, setHistory] = useState([
        {
            squares: Array(size * size).fill(null),
            location: {
                x: null,
                y: null,
            },
            isX: false,
        },
    ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [isXNext, setIsXNext] = useState(true);
    const [isReverse, setIsReverse] = useState(false);

    const changeReverse = isReverse => {
        setIsReverse(!isReverse);
    };

    const handleClick = i => {
        const _history = history.slice(0, stepNumber + 1);
        const current = _history[_history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(current, size) || squares[i]) {
            return;
        }

        squares[i] = isXNext ? 'X' : 'O';

        setHistory([
            ..._history,
            {
                squares: squares,
                location: {
                    x: i % size,
                    y: Math.floor(i / size),
                },
                isX: isXNext,
            },
        ]);

        setStepNumber(_history.length);
        setIsXNext(!isXNext);
    };

    const handleJumpTo = step => {
        setStepNumber(step);
        setIsXNext(step % 2 === 0);
    };

    const current = history[stepNumber];
    const winner = calculateWinner(current, size);

    const moves = history.map((step, move) => {
        const desc = move
            ? `Go to move #${move} ${step.isX ? 'X' : 'O'} (${
                  step.location.x
              }, ${step.location.y})`
            : 'Go to game start';
        return (
            <li key={move}>
                <button
                    style={{
                        fontWeight: stepNumber === move ? 'bold' : 'normal',
                    }}
                    onClick={() => handleJumpTo(move)}
                >
                    {desc}
                </button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = 'Winner: ' + winner.winnerPlayer;
    } else if(stepNumber === size*size) {
        status = "No one win";
    } else {
        status = 'Next player: ' + (isXNext ? 'X' : 'O');
    }

    return (
        <div>
            {/* <input placeholder='Nhập kích thước bàn cờ Caro: ' name="size"/> */}
            <div className="game">
                <div className="game-board">
                    <Board
                        size={size}
                        squares={current.squares}
                        winner={winner}
                        onClick={(i) => handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{!isReverse ? moves : moves.reverse()}</ol>
                </div>
                <div style={{ marginLeft: '20px' }}>
                    <button onClick={() => changeReverse(isReverse)}>
                        Reverse list
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Game;
