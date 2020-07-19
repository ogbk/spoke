// @flow

import React, { useState } from 'react';

import type { ProductTypes } from '../util/datatypes';

type Props = {
  products: ProductTypes,
  dispatch: any,
}

const ProductList = ({ products, dispatch }: Props) => {
  const productTypes = Object.keys(products);
  const DEFAULT_TYPE = 'Heroes';

  const [selectedType, setSelectedType] = useState(DEFAULT_TYPE);

  return (
    <div className="products">
      <div className="page-info">ALL PRODUCTS</div>

      <div className="products-header">
        {productTypes.map((thisProductType, idx) => (
          <span
            className={thisProductType === selectedType ? 'click selected-type' : 'click'}
            onClick={() => { setSelectedType(thisProductType); }}
            key={`${thisProductType}-${idx}`}
          >
            {thisProductType}
          </span>
        ))}
      </div>

      <div>
        {
          products[selectedType]
          && products[selectedType].map(({ id, price }) => (
            <span key={id}>
              {id}----{price}----
              <button
                type="button"
                className="click"
                onClick={() => {
                  dispatch({
                    type: 'ADD',
                    productId: id,
                    productType: selectedType,
                    quantity: 1,
                  });
                }}
              >ADD
              </button>
            </span>
          ))
        }
      </div>
    </div>
  );
};

export default ProductList;
