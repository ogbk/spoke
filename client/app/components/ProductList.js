// @flow

import React, { useState, useEffect } from 'react';

import type { ProductTypes } from '../util/datatypes';

type Props = {
  products: ProductTypes,
  dispatch: any,
}

const ProductList = ({ products, dispatch }: Props) => {
  const productTypes = Object.keys(products);

  return (
    <div className="products">
      {`ProductList`}

      {
        productTypes.map((productType) => (
          <div key={productType}>
            <br />
            <h6>{ productType }</h6>
            {
              products[productType].map(({ id, price }) => (
                <span key={id}>
                  {id}----{price}----
                  <button
                    type="button"
                    onClick={() => {
                      dispatch({
                        type: 'ADD',
                        productId: id,
                        productType,
                        quantity: 1,
                      });
                    }}
                  >ADD
                  </button>
                </span>
              ))
            }

            <hr />
          </div>
        ))
      }
    </div>
  );
};

export default ProductList;
