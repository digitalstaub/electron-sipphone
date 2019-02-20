// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import { persistReducer } from 'redux-persist';
import createElectronStorage from 'redux-persist-electron-storage';
import counter from './counter';

const storage = createElectronStorage();

const persistConfig = {
  key: 'root',
  storage
};

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    form: persistReducer(persistConfig, formReducer)
  });
}
