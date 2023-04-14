import createAsyncSlice, { startState } from './helper/createAsyncSlice';

export interface triviaAPIObject {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  tags: string[];
  type: string;
  difficulty: string;
  regions: any;
  isNiche: boolean;
}

const questions = createAsyncSlice({
  name: 'questions',

  fetchConfig: (url: string) => ({
    url,
    options: {},
  }),
});

export const fetchQuestions = questions.asyncAction;

export default questions.reducer;
