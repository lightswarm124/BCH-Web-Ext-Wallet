import {
  GET_ACCOUNT_START,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAIL,
  LOGOUT_ACCOUNT,
  VIEW_SEED,
} from "./constants";

import { deriveAccount, generateMnemonic } from "../../utils/account-utils";

const getAccountStart = () => ({
  type: GET_ACCOUNT_START,
  payload: null,
});

const getAccountFail = () => ({
  type: GET_ACCOUNT_FAIL,
  payload: null,
});

const getAccountSuccess = (
  account,
  accountSlp,
  isNew
) => ({
  type: GET_ACCOUNT_SUCCESS,
  payload: {
    account,
    accountSlp,
    isNew,
  },
});

const getAccount = (mnemonic, accountIndex = 0, network = "mainnet") {
  const accountMnemonic = mnemonic ? mnemonic : generateMnemonic();
  const isNew = !mnemonic;

  return async (dispatch, getState) => {
    dispatch(getAccountStart());

    const derivationPathBCH = "m/44'/145'";
    const derivationPathSLP = "m/44'/245'";

    const childIndex = 0;

    //  TODO - Error or fail state
    const account = (await deriveAccount(
      accountMnemonic,
      accountIndex,
      childIndex,
      derivationPathBCH,
      network
    ));

    const accountSlp = (await deriveAccount(
      accountMnemonic,
      accountIndex,
      childIndex,
      derivationPathSLP,
      network
    ));

    dispatch(getAccountSuccess(account, accountSlp, isNew));
  }
}

const logoutAccount = () => {
  return {
    type: LOGOUT_ACCOUNT,
    payload: null,
  };
};

const viewSeed = (address) => {
  return {
    type: VIEW_SEED,
    payload: {
      address,
    },
  };
};

export {
  getAccount,
  getAccountStart,
  getAccountSuccess,
  getAccountFail,
  logoutAccount,
  viewSeed,
}