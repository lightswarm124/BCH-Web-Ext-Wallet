/*global chrome*/ // eslint-disable-line no-unused-vars
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  // goBack,
  // goTo,
  // popToTop,
  // Link,
  Router,
  // getCurrent,
  // getComponentStack,
} from "react-chrome-extension-router";

import { getStore } from "./data/store";
import WelcomeScreen from "./screens/welcome/welcomeScreen.jsx";

const { store, persistor } = getStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <WelcomeScreen />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
