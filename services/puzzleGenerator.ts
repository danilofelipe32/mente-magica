import { GoogleGenAI, Type } from "@google/genai";
import { Level, Operation, Puzzle } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const puzzleSchema = {
  type: Type.OBJECT,
  properties: {
    solved_grid: {
      type: Type.ARRAY,
      description: "The fully solved grid as a 2D array of numbers. Should not contain nulls.",
      items: {
        type: Type.ARRAY,
        items: { type: Type.NUMBER },
      },
    },
    target_value: {
      type: Type.NUMBER,
      description: "The target value for each row and column.",
    },
  },
  required: ['solved_grid', 'target_value'],
};

const createPrompt = (level: Level, operation: Operation, size: number): string => {
  const opDescription = {
    [Operation.ADD]: 'sum',
    [Operation.SUBTRACT]: 'sum (may involve negative numbers)',
    [Operation.MULTIPLY]: 'product',
    [Operation.DIVIDE]: 'product (may involve fractional numbers)',
  }[operation];

  const difficultyDescription = {
    [Level.EASY]: 'simple, with small integer values.',
    [Level.MEDIUM]: 'of moderate complexity, with slightly larger or more varied numbers.',
    [Level.HARD]: 'challenging, with a wider range of numbers, possibly including negatives or fractions depending on the operation.',
  }[level];

  return `Generate a new "Mente Mágica" (Magic Mind) math puzzle.
It's a magic square-style grid. The goal is to fill the grid so that each row and column results in a specific target value using a given mathematical operation.

Please generate a single, complete, solved ${size}x${size} grid where the ${opDescription} of each row and each column equals the same target value.

Specifications:
- Operation: ${operation}
- Difficulty: ${level} (${difficultyDescription})
- Grid Size: ${size}x${size}

The numbers in the grid should be interesting and appropriate for the difficulty. For Subtraction, use a mix of positive and negative numbers. For Division, use numbers that result in a clean product, potentially including fractions like 0.5, 0.25, etc.

Provide the solved grid and the target value in JSON format according to the schema.`;
};

export const generatePuzzleFromAI = async (level: Level, operation: Operation): Promise<Puzzle> => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing.");
    throw new Error("API Key for puzzle generation is not configured.");
  }
  
  const size = level === Level.HARD ? 4 : 3;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: createPrompt(level, operation, size),
        config: {
            responseMimeType: "application/json",
            responseSchema: puzzleSchema,
        },
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString);

    const { solved_grid, target_value } = parsed;

    if (!solved_grid || typeof target_value === 'undefined') {
        throw new Error("Invalid puzzle format received from AI.");
    }
    
    const grid: (number | null)[][] = JSON.parse(JSON.stringify(solved_grid));
    const bankNumbers: number[] = [];
    
    const emptiesTarget = {
        [Level.EASY]: size === 3 ? 4 : 6,
        [Level.MEDIUM]: size === 3 ? 5 : 7,
        [Level.HARD]: 7,
    }[level];

    let empties = 0;
    const maxAttempts = size * size * 2;
    let count = 0;
    while (empties < emptiesTarget && count < maxAttempts) {
        const r = Math.floor(Math.random() * size);
        const c = Math.floor(Math.random() * size);
        if (grid[r] && grid[r][c] !== null) {
            bankNumbers.push(grid[r][c]!);
            grid[r][c] = null;
            empties++;
        }
        count++;
    }

    return {
        id: `ai_${Date.now()}`,
        grid,
        targetSum: target_value,
        operation,
        bankNumbers
    };

  } catch (error) {
    console.error("Error generating puzzle from AI:", error);
    throw new Error("Failed to generate a new puzzle. Please try again later.");
  }
};