import { combineReducers, configureStore } from '@reduxjs/toolkit';
import questions from './questions';
import configs from './configs';
import url from './url';
import game from './game';

const reducer = combineReducers({ questions, configs, url, game });

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
