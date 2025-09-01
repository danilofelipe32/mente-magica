import React from 'react';
import { soundService } from '../services/sound';

interface DraggableNumberProps {
  number: number;
}

const colors = [
  'bg-rose-500',
  'bg-indigo-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-sky-500',
  'bg-fuchsia-500',
  'bg-lime-500',
  'bg-pink-500',
  'bg-teal-500'
];

export const DraggableNumber: React.FC<DraggableNumberProps> = ({ number }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    soundService.userInteraction();
    e.dataTransfer.setData('text/plain', number.toString());
    e.currentTarget.classList.add('opacity-40', 'scale-75');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-40', 'scale-75');
  };

  const colorClass = colors[Math.abs(Math.floor(number)) % colors.length];

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`aspect-square w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-3xl sm:text-4xl font-extrabold text-white rounded-md cursor-grab active:cursor-grabbing hover:scale-110 transition-all duration-200 shadow-md hover:shadow-xl ${colorClass}`}
    >
      {number}
    </div>
  );
};