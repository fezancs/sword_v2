import { Action } from '@ngrx/store';
import { CartItems } from './cart';
import { CartActions , CartActionTypes } from './cart.actions';

export const cartFeatureKey = 'cartState';

export interface State {
  cartitems : CartItems[],
  itemscount : number,
  totalbill : number
}

export const initialState: State = {
  cartitems : [
    //{"name" : "axe1Officially Licensed Assassins Creed Aguilar Throwing Knife Set 3 Knives & Box" , "price" : 99 ,"image":"http://localhost:3000/images/product.png","quantity" : 1},
    ],
   itemscount : 0,
   totalbill : 0,
};

 
export function reducer(state = initialState, action: CartActions): State {
  switch (action.type) {

    case CartActionTypes.LoadCarts:
     return{
       ...state
     }

     case CartActionTypes.AddCartItem: return {
      ...state ,
      cartitems : [...state.cartitems, action.payload.user1],
      totalbill : action.payload.user1.price + state.totalbill,
      itemscount : state.itemscount+1
    }
 
    case CartActionTypes.RemoveCartItem: return {
      ...state,
      cartitems: [...state.cartitems.filter(item => item.name !== action.payload)],
      itemscount : state.itemscount-1,
    }

    case CartActionTypes.INCCartItem:{
      return {
        ...state,
        cartitems: state.cartitems.map(obj =>
            obj.name === action.payload.user1.name
                ? {...obj, quantity: action.payload.user1.quantity+1}
                : obj
            )
    };
    }

    case CartActionTypes.DECCartItem:{
      return {
        ...state,
        cartitems: state.cartitems.map(obj =>
            obj.name === action.payload.user1.name
                ? {...obj, quantity: action.payload.user1.quantity-1}
                : obj
            )
    };
    }

    default:
      return state;
  }
}
