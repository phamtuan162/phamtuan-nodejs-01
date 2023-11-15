import { legacy_createStore as createStore } from "redux";
import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
} from "../../../Buoi45/src/utils/localStorage";
const initialState = {
  carts: getLocalStorage("carts") || [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "product/addToCart": {
      const cartOld = [...state.carts];
      const product = action.payload;
      let cartNew;
      const productFind = cartOld.find(({ _id }) => _id === product._id);

      if (productFind) {
        productFind.quantity -= 1;
        productFind.amount += 1;
        cartNew = [...cartOld];
      } else {
        product.quantity -= 1;
        product.amount = 1;
        cartNew = [...cartOld, product];
      }

      setLocalStorage("carts", cartNew);

      return {
        ...state,
        carts: cartNew,
      };
    }
    case "cart/decrement": {
      const cartOld = [...state.carts];
      const product = action.payload;
      let cartNew;
      const productFind = cartOld.find(({ _id }) => _id === product._id);
      if (productFind) {
        productFind.amount -= 1;
        productFind.quantity += 1;
        cartNew = [...cartOld];
      }
      setLocalStorage("carts", cartNew);

      return { ...state, carts: cartNew };
    }
    case "cart/delete": {
      const cartOld = [...state.carts];
      const product = action.payload;
      let cartNew = cartOld.filter(({ _id }) => _id !== product._id);
      setLocalStorage("carts", cartNew);

      return { ...state, carts: cartNew };
    }
    case "cart/deleteAll": {
      clearLocalStorage("carts");
      return { ...state, carts: [] };
    }
    default:
      return state;
  }
};
export const store = createStore(rootReducer);
