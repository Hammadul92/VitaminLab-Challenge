import { combineReducers } from 'redux';

const INITIAL_USER_STATE = {
  user: null,
  products: [],
  product: null,
  new_product: null,
  updated_product: null
}

const Data = (state=INITIAL_USER_STATE, action) => {
  switch(action.type){
    case 'FETCH_USER':
      return {...state,
        user: action.payload,
      }
    case 'FETCH_PRODUCTS':
      return {...state,
        products: action.payload,
      }
    case 'FETCH_PRODUCT':
      return {...state,
        product: action.payload,
      }
    case 'ADD_PRODUCT':
      return {...state,
        new_product: action.payload,
      }
    case 'UPDATE_PRODUCT':
      return {...state,
        updated_product: action.payload,
      }
    case 'LOGOUT':
      return {...state,
        user: null,
        products: [],
        product: null,
        new_product: null,
        updated_product: null
      }
    default:
      return state;
  }
};


export default combineReducers({
  Data: Data,
})
