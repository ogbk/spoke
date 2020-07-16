const query = `
  query {
    products (first: 50){
      edges {
        node {
          id
          images (first: 50) {
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

export { query };
