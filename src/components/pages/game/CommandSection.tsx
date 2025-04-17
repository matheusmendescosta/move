import React, { useState } from 'react';

const CommandSection = ({
  onCommand,
}: {
  onCommand: (command: string) => void;
}) => {
  const [command, setCommand] = useState('');

  const handleCommandSubmit = () => {
    if (command.trim()) {
      const commands = command
        .trim()
        .split(/;\s*|\n/) // Divide os comandos por ponto e vírgula ou nova linha
        .filter((cmd) => cmd.trim()); // Remove comandos vazios

      let buffer = ''; // Buffer para comandos complexos como "para"
      commands.forEach((cmd) => {
        if (cmd.startsWith('para(')) {
          buffer = cmd; // Inicia o buffer para o comando "para"
        } else if (buffer) {
          buffer += `;${cmd}`; // Continua adicionando ao buffer
          if (cmd.endsWith('}')) {
            interpretForCommand(buffer); // Interpreta o comando "para" completo
            buffer = ''; // Limpa o buffer
          }
        } else {
          onCommand(cmd); // Comandos simples
        }
      });

      // Caso o buffer não tenha sido processado (comando "para" incompleto)
      if (buffer) {
        alert('Comando "para" incompleto ou inválido.');
      }

      setCommand('');
    }
  };

  const interpretForCommand = (command: string) => {
    const forRegex =
      /para\s*\(\s*move\s*=\s*(\d+);\s*move\s*<\s*(\d+);\s*move\s*\+\+\s*\)\s*\{(.+?)\}/;
    const match = command.match(forRegex);

    if (match) {
      const start = parseInt(match[1], 10);
      const end = parseInt(match[2], 10);
      const innerCommand = match[3].trim();

      for (let move = start; move < end; move++) {
        onCommand(innerCommand);
      }
    } else {
      alert('Comando "para" inválido.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <textarea
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Type your command here..."
        style={{
          flex: 1,
          width: '100%',
          resize: 'none',
          fontFamily: 'monospace',
          fontSize: '16px',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxSizing: 'border-box',
        }}
      />
      <button
        onClick={handleCommandSubmit}
        style={{
          marginTop: '8px',
          padding: '10px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Send Command
      </button>
    </div>
  );
};

export default CommandSection;
