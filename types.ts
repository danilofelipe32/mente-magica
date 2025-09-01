export type CellValue = number | null;

export interface Cell {
  value: CellValue;
  isFixed: boolean;
}

export enum Level {
  EASY = 'Fácil',
  MEDIUM = 'Médio',
  HARD = 'Difícil',
}

export enum Operation {
  ADD = 'Soma',
  SUBTRACT = 'Subtração',
  MULTIPLY = 'Multiplicação',
  DIVIDE = 'Divisão',
}

export interface Puzzle {
  id: string;
  grid: (number | null)[][];
  targetSum: number;
  operation: Operation;
  bankNumbers: number[];
}