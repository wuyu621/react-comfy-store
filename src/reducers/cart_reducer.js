import { GiHealthIncrease, GiStockpiles } from "react-icons/gi";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    console.log(product);
    const tempItem = state.cartItems.find(
      (cartItem) => cartItem.id === id + color
    );
    if (tempItem) {
      const tempCart = state.cartItems.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount >= cartItem.amountMax) {
            newAmount = cartItem.amountMax;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });

      return { ...state, cartItems: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        price: product.price,
        image: product.images[0].url,
        amountMax: product.stock,
        amount,
        color,
      };
      return { ...state, cartItems: [...state.cartItems, newItem] };
    }
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cartItems: [] };
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cartItems.filter(
      (cartItem) => cartItem.id !== action.payload
    );
    return { ...state, cartItems: tempCart };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const tempCart = state.cartItems.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        if (action.payload.type === "increase") {
          let newAmount = cartItem.amount + 1;
          if (newAmount > cartItem.amountMax) {
            newAmount = cartItem.amountMax;
          }
          return { ...cartItem, amount: newAmount };
        }
        if (action.payload.type === "decrease") {
          let newAmount = cartItem.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...cartItem, amount: newAmount };
        }
      } else {
        return cartItem;
      }
    });
    return { ...state, cartItems: tempCart };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cartItems.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += amount * price;
        return total;
      },
      { total_items: 0, total_amount: 0 }
    );

    return { ...state, total_items, total_amount };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
