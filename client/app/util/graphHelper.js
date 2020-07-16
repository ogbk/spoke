const query = `
  query {
    products (first: 50){
      edges {
        node {
          id
          images (first: 2) {
            edges {
              node {
                originalSrc
              }
            }
          }
          productType
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          title
          tags
          updatedAt
        }
      }
    }
  }
`;

const groupProductsByType = (products, productTypes) => {

  const ris = {};

  products.forEach((v) => {
    if (productTypes.includes(v.productType)) {
      const {
        id, images, priceRange, productType, tags, title, updatedAt,
      } = v;

      if (!ris[productType]) {
        ris[productType] = [];
      }

      ris[productType].push({
        id,
        images: images.edges.map(({ node: { originalSrc } }) => originalSrc),
        priceRange: priceRange.maxVariantPrice.amount,
        productType,
        tags,
        title,
        updatedAt,
      });
    }
  });

  return ris;
};

export { query, groupProductsByType };
