import {
  goTo,
  // goBack,
  // goTo,
  // popToTop,
  // Link,
  // Router,
  // getCurrent,
  // getComponentStack,
} from "react-chrome-extension-router";

import logo from "../../assets/logo.svg";

import MainScreen from "../mainScreen";

const WelcomeScreen = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>BCH Web Extension Wallet</p>
        <button
          // component={MainScreen}
          onClick={() => {
            goTo(MainScreen);
          }}
        >
          Getting Started
        </button>
      </header>
    </div>
  );
};

export default WelcomeScreen;
