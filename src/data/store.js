import {
  createStore,
  combineReducers,
  applyMiddleware,
  Middleware,
  AnyAction,
} from "redux";
import { persistStore, persistReducer, PersistState } from "redux-persist";
import { localStorage, syncStorage } from 'redux-persist-webextension-storage'
import ReduxThunk, { ThunkMiddleware } from "redux-thunk";

import accountsReducer, {
  initialState as initialAccountState,
} from "./accounts/reducer";

const initialState = {
  accounts: initialAccountState,
};

const persistConfig = {
  key: "root",
  storage: localStorage,
  // whitelist: ["utxos", "tokens", "transactions", "settings"],
  // timeout: 0,
};

const accountsPersistConfig = {
  key: "accounts",
  storage: localStorage,
  blacklist: ["keypairsByAccount"],
};

const rootReducer = combineReducers({
  accounts: persistReducer(accountsPersistConfig, accountsReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Logger = (store) => (next) => (action) => {
  // if (__DEV__) {
    // Uncomment to enable debug logging
    let hours = new Date().getHours(); //To get the Current Hours
    let min = new Date().getMinutes(); //To get the Current Minutes
    let sec = new Date().getSeconds(); //To get the Current Seconds
       console.log(hours, ":", min, ":", sec, "::LOG_ACTION::", action);
  // };

  return next(action);
};

const middleware = [
  Logger,
  ReduxThunk
];

const getStore = () => {
  const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(...middleware)
  );
  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};

export { getStore };