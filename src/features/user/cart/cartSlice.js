import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const calculateTotals = (state) => {
  state.tax = 0.1 * state.cartTotal;
  state.orderTotal = state.cartTotal + state.shipping + state.tax;
  localStorage.setItem("cart", JSON.stringify(state));
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return defaultState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultState;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadState(),
  reducers: {
    increaseAmount: (state, { payload }) => {
      const item = state.cartItems.find((product) => product.id === payload);
      if (item) {
        item.amount += 1;
        state.cartTotal += item.price;
        calculateTotals(state);
      }
    },

    decreaseAmount: (state, { payload }) => {
      const item = state.cartItems.find((product) => product.id === payload);
      if (item && item.amount > 0) {
        item.amount -= 1;
        state.cartTotal -= item.price;
        calculateTotals(state);
      }
    },

    addItem: (state, { payload }) => {
      const { product } = payload;
      const item = state.cartItems.find((i) => i.id === product.id);

      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      calculateTotals(state);
      toast.success("Item added to cart");
    },

    removeItem: (state, { payload }) => {
      const { id } = payload;
      const product = state.cartItems.find((i) => i.id === id);
      if (product) {
        state.cartItems = state.cartItems.filter((i) => i.id !== id);
        state.numItemsInCart -= product.amount;
        state.cartTotal -= product.price * product.amount;
        calculateTotals(state);
        toast.success("Item removed from cart");
      }
    },
  },
});

export const { addItem, removeItem, increaseAmount, decreaseAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
