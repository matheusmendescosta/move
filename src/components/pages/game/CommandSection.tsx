import React, { useState } from 'react';

const CommandSection = ({
  onCommand,
}: {
  onCommand: (command: string) => void;
}) => {
  const [command, setCommand] = useState('');

  const handleCommandSubmit = () => {
    if (command.trim()) {
      onCommand(command.trim());
      setCommand('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="you command"
        style={{ marginRight: '8px' }}
      />
      <button onClick={handleCommandSubmit}>send command</button>
    </div>
  );
};

export default CommandSection;
