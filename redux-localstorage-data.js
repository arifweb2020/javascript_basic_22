
// https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f

import { createStore, combineReducers } from 'redux';
import listReducer from '../features/list/reducer';

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const rootReducer = combineReducers({
  list: listReducer
});

const persistedStore = loadFromLocalStorage();

const store = configureStore(rootReducer, persistedStore);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
