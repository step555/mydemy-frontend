const COURSES_URL = 'http://localhost:3000/courses'
const USER_URL = 'http://localhost:3000/users/1'
const PURCHASES_URL = 'http://localhost:3000/purchases'
let currentUser

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
            currentUser = user
            dispatch(fetchedUser(user))
        })
    }
}

function fetchedUserCart(cart){
    return {type: "FETCHED_USER_CART", payload: cart}
}

function fetchingUserCart(){
    return (dispatch) => {
        fetch(PURCHASES_URL)
        .then(resp => resp.json())
        .then(purchases => {
            const userPurchases = purchases.filter(p => p.user_id === currentUser.id)
            const userCart = userPurchases.filter(p => p.is_purchased === false)
            let total = 0
            userCart.forEach(p => total += p.course.price)
            // dispatch(fetchedUserCart(userCart), cartTotal(total))
            dispatch(fetchedUserCart(userCart))
            dispatch(cartTotal(total))
        })


    }
}

function cartTotal(total) {
    // total is correct
    console.log("TOTAL", total)
    return { type: "CART_TOTAL", payload: total };
}

function addingToCart(course){ // GET for purchases
    return (dispatch, getState) => {
        const obj = {
            course_id: course.id,
            user_id: currentUser.id,
            is_purchased: false,
            course: course, 
            user: currentUser
        }
        fetch(PURCHASES_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json",
            "Accept": "application/json"},
            body: JSON.stringify(obj)
        })
        .then(resp => resp.json())
        .then(purchase => {
            purchase.course = course // experimental change
            dispatch(addedToCart(purchase))
        })
    }
}

function addedToCart(purchase){

    console.log("UPDATED CART", purchase)
    return { 
        type: "ADD_TO_CART", 
        payload: purchase}
}

function checkingOutCart(cart){
    return (dispatch, getState) => {
    let i = 0
    while(i < cart.length){
        let obj = {
            is_purchased: true,
            course: cart[i].course
        }

        fetch(PURCHASES_URL + `/${cart[i].id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json",
            "Accept": "application/json"},
            body: JSON.stringify(obj)
        })
        .then(resp => resp.json())
        .then(updated => {
            for(let j = 0; j < cart.length; j++){
                if(updated.course_id === cart[j].course.id)
                    updated.course = cart[j].course
            }
            dispatch(checkedOutCart(updated))
        })
        i++
    }}
}

function checkedOutCart(updatedPurchase){
    return {
        type: "CHECKOUT_CART",
        payload: updatedPurchase
    }
}

export { fetchingCourses, fetchingUser, fetchingUserCart, cartTotal, addingToCart, checkingOutCart }