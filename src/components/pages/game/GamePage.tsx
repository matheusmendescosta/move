'use client';
import React, { useRef } from 'react';
import BoardSection from './BoardSection';
import CommandSection from './CommandSection';

const GamePage = () => {
  const boardRef = useRef<{ moveForward: () => void }>(null);

  const handleCommand = (command: string) => {
    if (command === 'mover_frente' && boardRef.current) {
      boardRef.current.moveForward();
    } else {
      console.warn(`Comando desconhecido: ${command}`);
    }
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
      <BoardSection ref={boardRef} />
      <CommandSection onCommand={handleCommand} />
    </div>
  );
};

export default GamePage;
