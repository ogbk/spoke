import React, { useState, useEffect } from 'react';
import type { CartType } from '../util/datatypes';

type Props = {
  cart: CartType,
  dispatch: any,
}

const Cart = ({ cart }): Props => {

  return (
    <div className="cart">
      Cart : {cart.length}
    </div>
  );
};

export default Cart;
