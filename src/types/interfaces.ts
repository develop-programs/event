export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  category?: string;
}

export interface Round {
  id: number;
  name: string;
  questions: Question[];
  isEnabled: boolean;
}

export interface SelectedAnswers {
  [key: number]: string;
}
