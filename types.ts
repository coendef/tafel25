
export enum TableMode {
  TWO = 'TWO',
  FIVE = 'FIVE',
  MIXED = 'MIXED'
}

export interface Question {
  id: number;
  multiplier: number;
  table: number;
  answer: number;
}

export interface QuizResult {
  score: number;
  total: number;
  timeSpent: number;
  mode: TableMode;
}
