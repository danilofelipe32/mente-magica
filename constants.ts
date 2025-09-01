import { Level, Puzzle, Operation } from './types';

export const PUZZLES: Record<Level, Puzzle[]> = {
  [Level.EASY]: [
    // Addition
    {
      id: 'e1_add',
      grid: [[8, null, 6], [null, 5, null], [4, null, 2]],
      targetSum: 15,
      operation: Operation.ADD,
    },
    {
      id: 'e2_add',
      grid: [[null, 7, 2], [1, 5, null], [null, 3, null]],
      targetSum: 15,
      operation: Operation.ADD,
    },
    // Subtraction (Addition with negative numbers)
    {
      id: 'e1_sub',
      grid: [[10, null, -2], [null, 1, null], [-5, null, 8]],
      targetSum: 5,
      operation: Operation.SUBTRACT,
    },
    // Multiplication
    {
      id: 'e1_mul',
      grid: [[null, 1, 6], [10, null, null], [null, 4, null]],
      targetSum: 60,
      operation: Operation.MULTIPLY,
    },
    // Division (Multiplication with fractions)
     {
      id: 'e1_div',
      grid: [[20, null, 2], [null, 1, null], [0.5, null, 4]],
      targetSum: 20,
      operation: Operation.DIVIDE,
    },
  ],
  [Level.MEDIUM]: [
    // Addition
    {
      id: 'm1_add',
      grid: [[null, 18, null], [14, 12, null], [15, null, 17]],
      targetSum: 42,
      operation: Operation.ADD,
    },
    {
      id: 'm2_add',
      grid: [[17, null, 11], [null, 14, null], [null, 10, null]],
      targetSum: 42,
      operation: Operation.ADD,
    },
    // Subtraction (Addition with negative numbers)
    {
      id: 'm1_sub',
      grid: [[25, -10, null], [null, 0, null], [5, null, -15]],
      targetSum: 10,
      operation: Operation.SUBTRACT,
    },
    // Multiplication
    {
      id: 'm1_mul',
      grid: [[2, 10, null], [null, 3, 20], [25, null, null]],
      targetSum: 300,
      operation: Operation.MULTIPLY,
    },
  ],
  [Level.HARD]: [
    // Addition
    {
      id: 'h1_add',
      grid: [[16, null, null, 13], [null, 10, 11, null], [null, 6, 7, 12], [4, null, 14, null]],
      targetSum: 34,
      operation: Operation.ADD,
    },
    // Multiplication
    {
      id: 'h1_mul',
      grid: [[1, null, 7, null], [null, 8, 3, null], [12, 2, null, 4], [null, 6, 5, null]],
      targetSum: 1680,
      operation: Operation.MULTIPLY,
    },
    // Subtraction (Addition with negative numbers)
     {
      id: 'h1_sub',
      grid: [[-5, null, 15, null], [20, 10, null, -10], [null, 0, -20, null], [5, null, null, 25]],
      targetSum: 30,
      operation: Operation.SUBTRACT,
    },
    // Division (Multiplication with fractions)
    {
      id: 'h1_div',
      grid: [[10, null, 0.2, null], [null, 0.25, 4, null], [0.5, 5, null, 2], [null, 1, 20, null]],
      targetSum: 10,
      operation: Operation.DIVIDE,
    }
  ],
};