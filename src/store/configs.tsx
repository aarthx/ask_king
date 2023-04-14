import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'configs',
  initialState: {
    categories: [''],
    difficulty: '',
    questionsNumber: 5,
    time: 10,
  },
  reducers: {
    setConfigs(state, action) {
      state.categories = action.payload.categories;
      state.difficulty = action.payload.difficulty;
      state.questionsNumber = action.payload.questions;
      state.time = action.payload.time;
    },
    setAllCategories(state) {
      state.categories = [
        'arts_and_literature',
        'history',
        'music',
        'science',
        'society_and_culture',
        'sport_and_leisure',
        'geography',
        'general_knowledge',
        'food_and_drink',
        'film_and_tv',
      ];
    },
  },
});

export const { setConfigs, setAllCategories } = slice.actions;

export default slice.reducer;
