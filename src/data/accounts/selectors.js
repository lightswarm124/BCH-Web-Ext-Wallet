import { createSelector } from "reselect";

const accountsByIdSelector = (state) => state.accounts.byId;

const activeAccountIdSelector = (state) => state.accounts.activeId;

const activeAccountSelector = createSelector(
  accountsByIdSelector,
  activeAccountIdSelector,
  (byId, activeId) => {
    return activeId ? byId[activeId] : null;
  }
);

export {
  activeAccountSelector
}