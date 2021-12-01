import { useState, useEffect } from "react";

import {
  // goBack,
  goTo,
  // popToTop,
  // Link,
  // Router,
  // getCurrent,
  // getComponentStack,
} from "react-chrome-extension-router";

import logo from "../assets/logo.svg";
import "./mainScreen.css";
import {
  generateMnemonic,
  deriveAccount,
  toSLPAddr,
  toCashAddr,
} from "../utils/account-utils";
import { bchjs } from "../utils/bch-js-utils";
import WelcomeScreen from "./welcome/welcomeScreen";

const MainScreen = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [cashAddr, setCashAddr] = useState("");
  const [slpAddr, setSlpAddr] = useState("");
  const [input, setInput] = useState("");
  const [BCHBalance, setBCHBalance] = useState(0);
  const [SLPBalance, setSLPBalance] = useState(0);

  useEffect(() => {
    const getAccount = async () => {
      const cashAddress = await deriveAccount(
        mnemonic,
        "m/44'/145'",
        "0",
        "0",
        "mainnet"
      );
      const slpAddress = await deriveAccount(
        mnemonic,
        "m/44'/245'",
        "0",
        "0",
        "mainnet"
      );
      setCashAddr(cashAddress);
      setSlpAddr(toSLPAddr(slpAddress));
    };
    getAccount();
  }, [mnemonic]);

  useEffect(() => {
    if (!cashAddr || !slpAddr) return;
    const getBalances = async () => {
      const balances = await bchjs.Electrumx.balance([
        cashAddr,
        toCashAddr(slpAddr),
      ]).then((res) => {
        return [
          res.balances[0].balance.confirmed +
            res.balances[0].balance.unconfirmed,
          res.balances[1].balance.confirmed +
            res.balances[1].balance.unconfirmed,
        ];
      });
      // console.log(balance);
      setBCHBalance(balances[0]);
      setSLPBalance(balances[1]);
    };
    getBalances();
  }, [cashAddr, slpAddr]);

  return (
    <div className="App">
      <header className="App-header">
        <p>BCH Web Extension Wallet</p>
        <img src={logo} className="App-logo" alt="logo" />
        {cashAddr && (
          <>
            <p className="Address">{cashAddr}</p>
            <p className="Address">{BCHBalance} satoshis</p>
            <p className="Address">{slpAddr}</p>
            <p className="Address">{SLPBalance} satoshis</p>
          </>
        )}
        <button onClick={() => setMnemonic(generateMnemonic)}>
          New Wallet
        </button>
        <button onClick={() => setMnemonic("")}>Clear Wallet</button>
        <label>
          Mnemonic
          <input type="text" onChange={(e) => setInput(e.target.value)} />
        </label>
        <button onClick={() => setMnemonic(input)}>Restore Wallet</button>
        <p className="Address">{mnemonic}</p>
        <button onClick={() => goTo(WelcomeScreen)}>Log Out</button>
      </header>
    </div>
  );
};

export default MainScreen;
