import React from 'react';

function Square({ value, isLocationWin, onClick }) {
    return (
        <button
            key={value}
            style={{
                color: isLocationWin ? 'yellow' : value === 'X' ? 'blue' : 'red',
                backgroundColor:  isLocationWin ? '#d3d3d3' : 'white',
            }}
            className="square"
            onClick={onClick}
        >
            {value}
        </button>
    );
}

export default Square;
