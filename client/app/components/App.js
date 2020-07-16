import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import NotFound from './NotFound';

import { query, getProductsByName } from '../util/graphHelper';
import { Product } from '../util/datatypes';

const App = () => {
  const [products, setProducts]: [Product, any] = useState({});

  useEffect(
    () => {
      const fetchProducts = async () => {
        try {
          const res = await fetch(
            process.env.API_URL,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': process.env.API_TOKEN,
              },
              body: JSON.stringify({ query }),
            },
          );

          if (res.ok && res.status === 200) {
            const json = await res.json();
            const { Heroes, Polo, Sharps } = getProductsByName(
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
