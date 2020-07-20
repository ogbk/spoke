// @flow

import React, { useEffect, useState } from 'react';
import type { CartType } from '../util/datatypes';

type Props = {
  cart: CartType,
  dispatch: any,
}

const NO_IMAGE = 'img/image_missing.png';

const Cart = ({ cart, dispatch }: Props) => {
  const [total, setTotal] = useState(0);

  useEffect(
    () => {
      let ris = 0;
      cart.forEach(({ quantity, price }) => {
        ris += (quantity * price);
      });
      setTotal(ris);
    },
  );

  return (
    <div className="products">
      <div className="products-header">
        <span>MY CART - TOTAL: </span> <span className="input-quantity">{total} </span>
      </div>

      {cart.map(({ id, title, images, price, productType, quantity }) => (
        <div key={id} className="productslist-entry productslist-entry-cart">
          <div className="image-container-cart">
            <img
              className="cart-image"
              src={images[0] || NO_IMAGE}
              alt={title}
            />
          </div>

          <div className="productslist-details">
            <div>{productType} - {title}</div>
            <div className="detail-add">
              £{price.toFixed(2)} x <span className="input-quantity">{quantity} </span>
              <button
                type="button"
                className="click delete-cart"
                onClick={() => {
                  dispatch({
                    type: 'DELETE',
                    productId: id,
                  });
                }}
              >DELETE
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
