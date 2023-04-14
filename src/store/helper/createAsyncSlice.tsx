// importa o createSlice
import { Action, AnyAction, Dispatch, createSlice } from '@reduxjs/toolkit';
import { tagsConfig } from '../url';

/**
 * Cria um slice com uma função assíncrona
 * @param {Object} config
 * @param {String} config.name
 * @param {Object} config.initialState
 * @param {Object} config.reducers
 * @param {Function} config.fetchConfig
 */

interface Configure {
  name: string;
  initialState?: startState;
  reducers?: object;
  fetchConfig: Function;
}

export interface startState {
  loading?: boolean;
  data?: any;
  error?: null | Error;
  page?: number;
}

interface acao {
  type: string;
  payload: any;
}

const createAsyncSlice = (config: Configure) => {
  // cria um slice
  const slice = createSlice({
    // define um nome específico para o slice
    name: config.name,
    // o estado inicial possui propriedades específicas
    // mas podemos adicionar novas / escrever por cima das existentes
    initialState: {
      loading: false,
      data: null,
      error: null,
      ...config.initialState,
    },
    // lista de reducers padrões
    reducers: {
      fetchStarted(state: startState) {
        state.loading = true;
      },
      fetchSuccess(state: startState, action: acao) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      fetchError(state: startState, action: acao) {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      },
      // novos reducers caso necessário
      ...config.reducers,
    },
  });

  // desestruturação das ações
  const { fetchStarted, fetchSuccess, fetchError } = slice.actions;
  // ação assíncrona (thunk), recebe um payload
  const asyncAction: any = (payload: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(fetchStarted());
      // config.fetchConfig é um método que retorna
      // o url e as opções do fetch
      const { url, options } = config.fetchConfig(payload);
      const response = await fetch(url, options);
      const data = await response.json();
      return dispatch(fetchSuccess(data));
    } catch (error: any) {
      return dispatch(fetchError(error.message));
    }
  };

  // a função retorna as propriedades de slice e a ação assíncrona
  return { ...slice, asyncAction };
};

export default createAsyncSlice;
