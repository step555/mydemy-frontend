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
            return action.payload
        default:
            return state;
    }
}

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHED_USER_CART":
            return action.payload
        default:
            return state;
    }
}

const cartTotalReducer = (state = 0, action) => {
    // debugger
    switch (action.type){
        case "CART_TOTAL":
            // debugger
            // return action.payload
            return {
                cartTotal: action.payload
            }
        default:
            return state;
    }
}
// debugger
const rootReducer = combineReducers({
    courses: coursesReducer,
    user: userReducer,
    cart: cartReducer,
    //cartTotal may not be needed
    cartTotal: cartTotalReducer
  });
  
  export default rootReducer;