import { StoreType } from './datatypes';
import { getItemCartIndexById, findProduct, updateCartQuantity } from './reducerHelper';

const initialState: StoreType = {
  'cart': [],
  'products': {},
  'currentPage': 'PRODUCTS_LIST',
};

const reducer = (state: StoreType, action: any) => {
  switch (action.type) {
    case 'SET_PRODUCTS': {
      return {
        ...state,
        'products': action.newProducts,
      };
    }

    case 'SET_PAGE': {
      return {
        ...state,
        'currentPage': action.page,
      };
    }

    case 'ADD': {
      const foundIndex = getItemCartIndexById(state, action.productId);
      if (foundIndex >= 0) {
        return (
          updateCartQuantity(state, foundIndex, action.quantity, true)
        );
      }

      const foundProduct = findProduct(state, action.productType, action.productId);
      const newState = { ...state };
      newState.cart.push({
        ...foundProduct,
        quantity: action.quantity,
      });

      return newState;
    }

    default: {
      return state;
    }
  }
};

export { initialState, reducer };
