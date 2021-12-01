/*global chrome*/ // eslint-disable-line no-unused-vars
import WelcomeScreen from "./screens/welcome/welcomeScreen.jsx";

import {
  // goBack,
  // goTo,
  // popToTop,
  // Link,
  Router,
  // getCurrent,
  // getComponentStack,
} from "react-chrome-extension-router";

const App = () => {
  return (
    <Router>
      <WelcomeScreen />
    </Router>
  );
};

export default App;
