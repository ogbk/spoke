import type { CartType } from './datatypes.ts';

const computeTotal = (cart: CartType) => {
  let ris = 0;
  cart.forEach(({ quantity, price }) => {
    ris += (quantity * price);
  });

  return (ris);
};

export { computeTotal };
