// @flow

import React, { useState, useEffect } from 'react';
import { openProductsList } from '../util/actions';
import type { CartType } from '../util/datatypes';

type Props = {
  cart: CartType,
  dispatch: any,
}

const Cart = ({ cart, dispatch }: Props) => {

  return (
    <div className="cart">
      {cart.length}
    </div>
  );
};

export default Cart;
