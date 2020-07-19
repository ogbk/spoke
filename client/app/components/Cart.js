import React, { useState, useEffect } from 'react';
import { openProductsList } from '../util/actions';
import type { CartType } from '../util/datatypes';

type Props = {
  cart: CartType,
  dispatch: any,
}

const Cart = ({ cart, dispatch }): Props => {

  return (
    <div className="cart">
      <div className="page-header">
        <div
          className="page-main click"
          onClick={() => { dispatch(openProductsList); }}
        >BACK: {cart.length}
        </div>
      </div>

    </div>
  );
};

export default Cart;
