import { filterObject } from "@/app/myCodes/Util";

export const initialCartState = {
   lineItems: []
};
export const CartReducer = (state, action) => {
   const stateQTY = state?.lineItems[action?.value?.priceID]?.Qty ? state?.lineItems[action.value.priceID].Qty : 0
   const stateTotal = state?.total ? state?.total : 0
   const actionQTY = action?.value?.Qty 
   const actionPrice = action?.value?.price * actionQTY

   console.log(state)


    switch (action.type){
        case "SAVE_CART": {
            return action.value
      }
      case "ADD_TO_CART": {
          
         return {
            ...state,
            lineItems: {...state.lineItems,  [action.value.priceID]:{...action.value, Qty: Number(actionQTY) + Number(stateQTY)}},
            total: stateTotal + actionPrice,
         };
      }
      case "SUB_FROM_CART": {
         return {
            ...state,
            lineItems: {...state.lineItems,  [action.value.priceID]:{...action.value, Qty: (stateQTY - actionQTY < 0) ? 0 : stateQTY - actionQTY  }},
            total: stateTotal - actionPrice,
         };
      }
      case "SET_CART": {
         return {
            ...state,
            lineItems: {...state.lineItems,  [action.value.priceID]:{...action.value, Qty: actionQTY  }},
            total:  actionPrice,
         };
      }
      case "REMOVE_FROM_CART": {
         return {
            ...state,
            lineItems: filterObject(state.lineItems, items => {console.log(items); return(items != action.value)}),
            total: state.total - actionPrice 
         };
      }
      case "EMPTY_CART": {
         return {
            ...state,
            lineItems: {},
            total: 0
         };
      }
       default:
        return state;
   }
};

