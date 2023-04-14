import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './configureStore';
import { useAppSelector } from './helper/hooks';

interface tagsConfigImport {
  categories: string[];
  questionsNumber: number;
  difficulty: string;
}

export interface tagsConfig {
  tagCategories: string;
  tagLimit: string;
  tagDifficulty: string;
  finalUrl: string;
}

const initialState: tagsConfig = {
  tagCategories: 'categories=arts_and_literature',
  tagLimit: 'limit=5',
  tagDifficulty: '',
  finalUrl:
    'https://the-trivia-api.com/api/questions?categories=art_and_literature&limit=5',
};

const slice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    updateTags(state, action: PayloadAction<tagsConfigImport>) {
      if (action.payload.categories.length) {
        state.tagCategories = `categories=${action.payload.categories.join()}&`;
      } else {
        state.tagCategories = ``;
      }
      state.tagLimit = `limit=${action.payload.questionsNumber}`;
      if (action.payload.difficulty) {
        state.tagDifficulty = `difficulty=${action.payload.difficulty}&`;
      } else {
        state.tagDifficulty = ``;
      }
      state.finalUrl = `https://the-trivia-api.com/api/questions?${state.tagCategories}${state.tagDifficulty}${state.tagLimit}`;
    },
  },
});

export const { updateTags } = slice.actions;

export const selectUrl = (state: RootState) => state.url;

export default slice.reducer;
