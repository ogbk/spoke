// @flow

import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import FetchError from './FetchError';

import { query, groupProductsByType } from '../util/graphHelper';
import type { ProductTypes_temp, ProductTypes } from '../util/datatypes';

const App = () => {
  const NO_ERROR: string = '';

  const [fetchError, setFetchError]: [string, any] = useState(NO_ERROR);
  const [loading, setLoading]: [boolean, any] = useState(false);
  const [products, setProducts]: [ProductTypes, any] = useState({});

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

console.log('json', json);

            const { Heroes, Polo, Sharps }: ProductTypes_temp = groupProductsByType(
              json.data.products.edges.map(({ node }) => node),
              ['Heroes', 'Sharps', 'Polo'],
            );

console.log({ Heroes, Polo, Sharps });

            setProducts({
              Heroes,
              Polos: Polo,
              Sharps,
            });
          } else {
            setFetchError('Server issue');
          }
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

  return (
    <div className="app">
      <ProductList />
      <Cart />
    </div>
  );
};

export default App;
