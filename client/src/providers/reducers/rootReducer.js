import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import ratesReducer from "./ratesReducer";
import adminReducer from "./adminReducer";
import usersReducer from "./usersReducer";
import themeReducer from "./themeReducer";
import ordersReducer from "./ordersReducer";
import groupsReducer from "./groupsReducer";
import walletReducer from "./walletReducer";
import pricesReducer from "./pricesReducer";
import productsReducer from "./productsReducer";
import parentgroupsReducer from "./parentgroupsReducer";
import transactionsReducer from "./transactionsReducer";
import nairaTransactionsReducer from "./nairaTransactionsReducer";

function rootReducer(state = {}, action) {
  if (action.dispatch == "UPDATE_STATE") {
    if (action.data) {
      return action.data;
    }
  }

  return {
    cart: cartReducer(state?.cart, action),
    user: userReducer(state?.user, action),
    theme: themeReducer(state?.theme, action),
    admin: adminReducer(state?.admin, action),
    users: usersReducer(state?.users, action),
    rates: ratesReducer(state?.rates, action),
    wallet: walletReducer(state?.wallet, action),
    orders: ordersReducer(state?.orders, action),
    groups: groupsReducer(state?.groups, action),
    prices: pricesReducer(state?.prices, action),
    products: productsReducer(state?.products, action),
    parentgroups: parentgroupsReducer(state?.parentgroups, action),
    transactions: transactionsReducer(state?.transactions, action),
    ntransactions: nairaTransactionsReducer(state?.ntransactions, action),
  };
}

export default rootReducer;
