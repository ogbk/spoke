// @flow

import React, { useState, useEffect } from 'react';
// import Profile from './Profile';
// import NotFound from './NotFound';

import { query, groupProductsByType } from '../util/graphHelper';
import type { ProductTypes_temp, ProductTypes } from '../util/datatypes';

const App = () => {
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
            const json = await res.json();
            const { Heroes, Polo, Sharps }: ProductTypes_temp = groupProductsByType(
              json.data.products.edges.map(({ node }) => node),
              ['Heroes', 'Sharps', 'Polo'],
            );

            setProducts({
              Heroes,
              Polos: Polo,
              Sharps,
            });
          } else {
            console.log('ERROR---');
          }
        } catch (err) {
          console.log('REQUEST FAILED--', err);
        }
      };
      fetchProducts();
    },
    [],
  );

  return (
    <div className="App">
      tbc
    </div>
  );
};

export default App;
