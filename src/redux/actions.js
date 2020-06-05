const COURSES_URL = 'http://localhost:3000/courses'
const USER_URL = 'http://localhost:3000/users/1'

function fetchedCourses(courses){
    return {type: "FETCHED_COURSES", payload: courses}
} 

function fetchingCourses(){
    return (dispatch) => {
        fetch(COURSES_URL)
        .then(resp => resp.json())
        .then(courses => {
            dispatch(fetchedCourses(courses))
        })
    }
}

function fetchedUser(user){
    return {type: "FETCHED_USER", payload: user}
}

function fetchingUser(){
    return (dispatch) => {
        fetch(USER_URL)
        .then(resp => resp.json())
        .then(user => {
            dispatch(fetchedUser(user))
        })
    }
}

function fetchedUserCart(cart){
    return {type: "FETCHED_USER_CART", payload: cart}
}

function fetchingUserCart(){
    return (dispatch) => {
        fetch(USER_URL)
        .then(resp => resp.json())
        .then(user => {
            const purchases = user.purchases.filter(p => p.is_purchased === false)
            let cart = []
            for(let i = 0; i < user.courses.length; i++){
                for(let j = 0; j < purchases.length; j++){
                    if(user.courses[i].id === purchases[j].course_id){
                        cart.push(user.courses[i])
                    }
                }
            }
            let total = 0
            cart.forEach(item => total += item.price)
            dispatch(fetchedUserCart(cart))
            dispatch(cartTotal(total))
            // dispatch(fetchedUserCart(cart), cartTotal(total))
        })
    }
}

function cartTotal(total) {
    // total is correct
    console.log("TOTAL", total)
    return { type: "CART_TOTAL", payload: total };
}

export { fetchingCourses, fetchingUser, fetchingUserCart, cartTotal }