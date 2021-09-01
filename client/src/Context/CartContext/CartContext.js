import { createContext, useState } from "react";

export const CartCtx = createContext();

export function CartContext({ children }) {
  const [list, setList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  function addTotalPrice(price) {
    const total = totalPrice + Number(price);
    setTotalPrice(Number(total.toFixed(2)));
  }

  function reduceTotalPrice(price) {
    const total = totalPrice - Number(price);
    setTotalPrice(Number(total.toFixed(2)));
  }

  return (
    <CartCtx.Provider
      value={[list, setList, totalPrice, addTotalPrice, reduceTotalPrice]}
    >
      {children}
    </CartCtx.Provider>
  );
}
