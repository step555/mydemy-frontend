import { combineReducers } from "redux";

const coursesReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHED_COURSES":
            return action.payload
        default:
            return state;
    }
}

const userReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHED_USER":
            debugger
            // return action.payload

            return {...state, currentUser: action.payload}

        // case "LOGGED_IN":
        //     debugger
        //     return action.payload
        default:
            return state;
    }
}

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHED_USER_CART":
            return action.payload
        case "ADD_TO_CART":
            let newState = [action.payload, ...state] // refer here if there is a bug with purchases
            // above code may not be optimal
            return newState
        case "CHECKOUT_CART":
            return action.payload
        default:
            return state;
    }
}

const cartTotalReducer = (state = 0, action) => {
    switch (action.type){
        case "CART_TOTAL":
            return {
                cartTotal: action.payload
            }
        default:
            return state;
    }
}



const rootReducer = combineReducers({
    courses: coursesReducer,
    user: userReducer,
    cart: cartReducer,
    //cartTotal may not be needed
    cartTotal: cartTotalReducer,
    checkoutCart: cartReducer
  });
  
  export default rootReducer;