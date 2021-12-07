import {
  GET_ACCOUNT_START,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAIL,
  LOGOUT_ACCOUNT,
  VIEW_SEED,
} from "./constants";

export const initialState = {
  byId: {},
  allIds: [],
  activeId: null,
  keypairsByAccount: {},
};

const addAccount = (
  state,
  payload,
) => {
  const { account, accountSlp, isNew } = payload;
  const { keypair, ...removedKeypair } = account;
  const { address } = account;

  const combinedAccount = {
    ...removedKeypair,
    addressSlp: accountSlp.address,
    seedViewed: !isNew,
  };

  const keypairSlp = accountSlp.keypair;

  const existingAcounts = state.allIds;

  // TODO - Investigate this early-exit, may not be needed anymore.
  if (existingAcounts.includes(address)) {
    return {
      ...state,
      keypairsByAccount: {
        ...state.keypairsByAccount,
        [address]: {
          bch: keypair,
          slp: keypairSlp,
        },
      },
    };
  }

  return {
    ...state,
    byId: {
      ...state.byId,
      [address]: combinedAccount,
    },
    keypairsByAccount: {
      ...state.keypairsByAccount,
      [address]: {
        bch: keypair,
        slp: keypairSlp,
      },
    },
    allIds: [...state.allIds, address],
    activeId: address,
  };
};

const logoutAccount = (state) => {
  return initialState;
};

const accounts = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_START:
      return state;

    case GET_ACCOUNT_SUCCESS:
      return addAccount(state, action.payload);

    case LOGOUT_ACCOUNT:
      return logoutAccount(state);
      
    default:
      return state;
  }
}

export default accounts;