// @flow

import React, { useState, useEffect, useReducer } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import Header from './Header';
import FetchError from './FetchError';

import { query, groupProductsByType } from '../util/graphHelper';
import { initialState, reducer } from '../util/reducer';
import type { ProductTypes_temp } from '../util/datatypes';

const App = () => {
  const NO_ERROR: string = '';

  const [fetchError, setFetchError]: [string, any] = useState(NO_ERROR);
  const [loading, setLoading]: [boolean, any] = useState(false);
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () => {
      const fetchProducts = async () => {
        // $FlowFixMe
        const URL: string = process.env.API_URL;
        // $FlowFixMe
        const TOKEN: string = process.env.API_TOKEN;

        try {
          const res = await fetch(
            URL,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': TOKEN,
              },
              body: JSON.stringify({ query }),
            },
          );

          if (res.ok && res.status === 200) {
            setFetchError(NO_ERROR);

            const json = await res.json();
            const { Heroes, Polo: Polos, Sharps }: ProductTypes_temp = groupProductsByType(
              json.data.products.edges.map(({ node }) => node),
              ['Heroes', 'Sharps', 'Polo'],
            );
            dispatch({
              type: 'SET_PRODUCTS',
              newProducts: { Heroes, Polos, Sharps },
            });
          } else { setFetchError('Server issue'); }
        } catch (err) {
          setFetchError(err);
        }
      };
      fetchProducts();
    },
    [],
  );

  if (fetchError) {
    return (<FetchError error={fetchError} />);
  }

  const {
    products,
    cart,
    currentPage,
  } = store;

  return (
    <div className="app">
      <Header currentPage={currentPage} dispatch={dispatch} />
      {currentPage === 'PRODUCTS_LIST' && <ProductList products={products} dispatch={dispatch} /> }
      {currentPage === 'CART' && <Cart cart={cart} dispatch={dispatch} /> }
    </div>
  );
};

export default App;
