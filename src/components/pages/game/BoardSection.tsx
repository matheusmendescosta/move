'use client';
import React, { useState, forwardRef, useImperativeHandle } from 'react';

const BoardSection = forwardRef((_, ref) => {
  const rows = 21;
  const cols = 18;

  const [objectPosition, setObjectPosition] = useState({ row: 0, col: 0 });
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>(
    'right'
  );

  const board = () => {
    const boardArray = Array.from({ length: rows }, () =>
      Array(cols).fill(null)
    );
    boardArray[objectPosition.row][objectPosition.col] = 'O';
    return boardArray;
  };

  const moveForward = () => {
    setObjectPosition((prevPosition) => {
      let { row, col } = prevPosition;

      switch (direction) {
        case 'up':
          row = Math.max(0, row - 1);
          break;
        case 'down':
          row = Math.min(rows - 1, row + 1);
          break;
        case 'left':
          col = Math.max(0, col - 1);
          break;
        case 'right':
          col = Math.min(cols - 1, col + 1);
          break;
        default:
          break;
      }

      return { row, col };
    });
  };


  useImperativeHandle(ref, () => ({
    moveForward,
  }));
  return (
    <div>
      {board().map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  objectPosition.row === rowIndex &&
                  objectPosition.col === colIndex
                    ? 'lightblue'
                    : 'white',
              }}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});

BoardSection.displayName = 'BoardSection';

export default BoardSection;
