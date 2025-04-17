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

  const animateMovement = (targetRow: number, targetCol: number) => {
    const step = () => {
      setObjectPosition((prevPosition) => {
        const { row, col } = prevPosition;

        if (row === targetRow && col === targetCol) {
          return prevPosition; // Alvo alcançado, para a animação
        }

        let newRow = row;
        let newCol = col;

        if (row < targetRow) newRow++;
        else if (row > targetRow) newRow--;

        if (col < targetCol) newCol++;
        else if (col > targetCol) newCol--;

        return { row: newRow, col: newCol };
      });
    };

    const interval = setInterval(() => {
      setObjectPosition((prevPosition) => {
        if (prevPosition.row === targetRow && prevPosition.col === targetCol) {
          clearInterval(interval); // Para a animação quando o alvo for alcançado
        }
        return prevPosition;
      });
      step();
    }, 200); // Ajuste o tempo (200ms) para controlar a velocidade da animação
  };

  useImperativeHandle(ref, () => ({
    moveForward,
    moveRight: () => {
      setDirection('right');
      setObjectPosition((prevPosition) => ({
        ...prevPosition,
        col: Math.min(cols - 1, prevPosition.col + 1),
      }));
    },
    moveLeft: () => {
      setDirection('left');
      setObjectPosition((prevPosition) => ({
        ...prevPosition,
        col: Math.max(0, prevPosition.col - 1),
      }));
    },
    moveUp: () => {
      setDirection('up');
      setObjectPosition((prevPosition) => ({
        ...prevPosition,
        row: Math.max(0, prevPosition.row - 1),
      }));
    },
    moveDown: () => {
      setDirection('down');
      setObjectPosition((prevPosition) => ({
        ...prevPosition,
        row: Math.min(rows - 1, prevPosition.row + 1),
      }));
    },
    animateTo: (targetRow: number, targetCol: number) => {
      animateMovement(targetRow, targetCol);
    },
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
