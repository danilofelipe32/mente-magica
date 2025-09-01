import { Level, Puzzle, Operation } from './types';

export const PUZZLES: Record<Level, Puzzle[]> = {
  [Level.EASY]: [
    // Addition
    {
      id: 'e1_add',
      grid: [[8, null, 6], [null, 5, null], [4, null, 2]],
      targetSum: 15,
      operation: Operation.ADD,
      bankNumbers: [1, 3, 7, 9],
    },
    {
      id: 'e2_add',
      grid: [[null, 7, 2], [1, 5, null], [null, 3, null]],
      targetSum: 15,
      operation: Operation.ADD,
      bankNumbers: [4, 6, 8, 9],
    },
    // Subtraction (Addition with negative numbers)
    {
      id: 'e1_sub',
      grid: [[10, null, -2], [null, 1, null], [-5, null, 8]],
      targetSum: 5,
      operation: Operation.SUBTRACT,
      bankNumbers: [-3, 0, 4, 6],
    },
    // Multiplication
    {
      id: 'e1_mul',
      grid: [[null, 1, 6], [10, null, null], [null, 4, null]],
      targetSum: 60,
      operation: Operation.MULTIPLY,
      bankNumbers: [2, 3, 5],
    },
    // Division (Multiplication with fractions)
     {
      id: 'e1_div',
      grid: [[20, null, 2], [null, 1, null], [0.5, null, 4]],
      targetSum: 20,
      operation: Operation.DIVIDE,
      bankNumbers: [0.5, 5, 10],
    },
  ],
  [Level.MEDIUM]: [
    // Addition
    {
      id: 'm1_add',
      grid: [[null, 18, null], [14, 12, null], [15, null, 17]],
      targetSum: 42,
      operation: Operation.ADD,
      bankNumbers: [10, 11, 13, 16],
    },
    {
      id: 'm2_add',
      grid: [[17, null, 11], [null, 14, null], [null, 10, null]],
      targetSum: 42,
      operation: Operation.ADD,
      bankNumbers: [12, 13, 15, 16, 18],
    },
    // Subtraction (Addition with negative numbers)
    {
      id: 'm1_sub',
      grid: [[25, -10, null], [null, 0, null], [5, null, -15]],
      targetSum: 10,
      operation: Operation.SUBTRACT,
      bankNumbers: [-20, -5, 15, 20],
    },
    // Multiplication
    {
      id: 'm1_mul',
      grid: [[2, 10, null], [null, 3, 20], [25, null, null]],
      targetSum: 300,
      operation: Operation.MULTIPLY,
      bankNumbers: [1, 4, 5, 6],
    },
  ],
  [Level.HARD]: [
    // Addition
    {
      id: 'h1_add',
      grid: [[16, null, null, 13], [null, 10, 11, null], [null, 6, 7, 12], [4, null, 14, null]],
      targetSum: 34,
      operation: Operation.ADD,
      bankNumbers: [1, 2, 3, 5, 8, 9, 15],
    },
    // Multiplication
    {
      id: 'h1_mul',
      grid: [[1, null, 7, null], [null, 8, 3, null], [12, 2, null, 4], [null, 6, 5, null]],
      targetSum: 1680,
      operation: Operation.MULTIPLY,
      bankNumbers: [1, 2, 4, 6, 7, 9, 10],
    },
    // Subtraction (Addition with negative numbers)
     {
      id: 'h1_sub',
      grid: [[-5, null, 15, null], [20, 10, null, -10], [null, 0, -20, null], [5, null, null, 25]],
      targetSum: 30,
      operation: Operation.SUBTRACT,
      bankNumbers: [-25, -15, 10, 30],
    },
    // Division (Multiplication with fractions)
    {
      id: 'h1_div',
      grid: [[10, null, 0.2, null], [null, 0.25, 4, null], [0.5, 5, null, 2], [null, 1, 20, null]],
      targetSum: 10,
      operation: Operation.DIVIDE,
      bankNumbers: [0.1, 0.4, 1.25, 8],
    }
  ],
};