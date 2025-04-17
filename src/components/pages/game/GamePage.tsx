'use client';
import React, { useRef } from 'react';
import BoardSection from './BoardSection';
import CommandSection from './CommandSection';

const GamePage = () => {
  const boardRef = useRef<{
    moveForward: () => void;
    moveRight: () => void;
    moveLeft: () => void;
    moveUp: () => void;
    moveDown: () => void;
    animateTo: (x: number, y: number) => void;
  }>(null);

  const handleCommand = (command: string) => {
    if (boardRef.current) {
      switch (command) {
        case 'mover_para_direita':
          boardRef.current.moveRight();
          break;
        case 'mover_para_esquerda':
          boardRef.current.moveLeft();
          break;
        case 'mover_para_cima':
          boardRef.current.moveUp();
          break;
        case 'mover_para_baixo':
          boardRef.current.moveDown();
          break;
        case 'mover_frente':
          boardRef.current.moveForward();
          break;
        case 'animar_para':
          boardRef.current.animateTo(10, 10);
          break;
        default:
          console.warn(`Comando desconhecido: ${command}`);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <BoardSection ref={boardRef} />
      <CommandSection onCommand={handleCommand} />
    </div>
  );
};

export default GamePage;
