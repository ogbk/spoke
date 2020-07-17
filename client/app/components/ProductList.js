// @flow

import React, { useState, useEffect } from 'react';

import type { ProductTypes } from '../util/datatypes';

type Props = {
  products: ProductTypes
}

const ProductList = ({ products }: Props) => {
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
                  <button type="button">ADD</button>
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
