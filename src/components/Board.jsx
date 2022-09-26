import React from 'react';
import Square from './Square';

function Board({ size, squares, winner, onClick }) {
    const renderSquare = i => {
        return (
            <Square
                key={i}
                isLocationWin={winner?.winnerLocation.includes(i)}
                value={squares[i]}
                onClick={() => onClick(i)}
            />
        );
    };

    return (
        <div>
            {Array(size)
                .fill(null)
                .map((e, i) => (
                    <div key={i} className="board-row">
                        {Array(size)
                            .fill(null)
                            .map((e, j) => renderSquare(i * size + j))}
                    </div>
                ))}
        </div>
    );
}

export default Board;
