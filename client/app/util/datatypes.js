// @flow

export type Product = {
  id: string,
  price: number,
  images: Array<string>,
  productType: string,
  title: string,
  tags: Array<string>,
  updatedAt: string,
};

export type ProductList = Array<Product>;

export type ProductTypes_temp = {
  'Heroes': ProductList,
  'Sharps': ProductList,
  'Polo': ProductList
};

export type ProductTypes = {
  'Heroes': ProductList,
  'Sharps': ProductList,
  'Polos': ProductList
};
