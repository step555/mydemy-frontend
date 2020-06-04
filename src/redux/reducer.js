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

const rootReducer = combineReducers({
    courses: coursesReducer,
    user: userReducer
    // courseCompany: courseCompanyReducer
//     searchText: searchTextReducer,
//     paintings: paintingsReducer
  });
  
  export default rootReducer;