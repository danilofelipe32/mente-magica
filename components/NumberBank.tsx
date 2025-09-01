import React from 'react';
import { DraggableNumber } from './DraggableNumber';

interface NumberBankProps {
  numbers: number[];
  isBoardFull: boolean;
}

export const NumberBank: React.FC<NumberBankProps> = ({ numbers, isBoardFull }) => {
  return (
    <div className="p-4 w-full bg-slate-900/70 rounded-lg">
      <h3 className="text-lg font-bold text-center text-cyan-400 mb-4">Números</h3>
      {numbers.length > 0 ? (
        <div className="flex flex-row flex-wrap justify-center gap-3">
          {numbers.sort((a,b) => a-b).map(num => (
            <DraggableNumber key={num} number={num} />
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-400 flex items-center justify-center h-16 sm:h-20">
          <p>{isBoardFull ? 'Tudo preenchido!' : 'Nenhum número restante.'}</p>
        </div>
      )}
    </div>
  );
};