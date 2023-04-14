import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'game',
  initialState: {
    page: 0,
    correct: 0,
    mute: true,
    timer: 0,
  },
  reducers: {
    nextPage(state) {
      if (state.page >= 0) state.page++;
    },
    correctAnswer(state) {
      if (state.page >= 0) state.correct++;
    },
    setTimer(state, action) {
      state.timer = action.payload;
    },
    decTimer(state) {
      state.timer--;
    },
    resetGame(state) {
      if (state.page >= 0) {
        state.page = 0;
        state.correct = 0;
      }
    },
    toggleMute(state) {
      state.mute = !state.mute;
    },
  },
});

export const {
  nextPage,
  resetGame,
  correctAnswer,
  toggleMute,
  setTimer,
  decTimer,
} = slice.actions;

export default slice.reducer;
