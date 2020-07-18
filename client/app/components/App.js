// @flow

import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import FetchError from './FetchError';

import { query, groupProductsByType } from '../util/graphHelper';
import type { ProductTypes_temp, ProductTypes, CartType } from '../util/datatypes';

const App = () => {
  const NO_ERROR: string = '';

  const [fetchError, setFetchError]: [string, any] = useState(NO_ERROR);
  const [loading, setLoading]: [boolean, any] = useState(false);
  const [products, setProducts]: [ProductTypes, any] = useState({});
  const [cart, setCart]: [CartType, any] = useState([]);

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

            setProducts({ Heroes, Polos, Sharps });
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
      <ProductList products={products} />
      <Cart />
    </div>
  );
};

export default App;
