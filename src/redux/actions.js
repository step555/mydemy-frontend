const COURSES_URL = 'http://localhost:3000/courses'
const USER_URL = 'http://localhost:3000/users/1'
const PURCHASES_URL = 'http://localhost:3000/purchases/'
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

function fetchingUserCart(){ // what if I instead fetch from purchases
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
            debugger

        })


    }
}
    //     fetch(USER_URL)
    //     .then(resp => resp.json())
    //     .then(user => {
    //         const purchases = user.purchases.filter(p => p.is_purchased === false)
    //         let cart = []
    //         for(let i = 0; i < user.courses.length; i++){
    //             for(let j = 0; j < purchases.length; j++){
    //                 if(user.courses[i].id === purchases[j].course_id){
    //                     cart.push(user.courses[i])
    //                 }
    //             }
    //         }
    //         let total = 0
    //         cart.forEach(item => total += item.price)
    //         dispatch(fetchedUserCart(cart))
    //         debugger
    //         dispatch(cartTotal(total))
    //         // put the whole user into cart?
    //         // dispatch(fetchedUserCart(cart), cartTotal(total))
    //     })
//     }
// }

function cartTotal(total) {
    // total is correct
    // console.log("TOTAL", total)
    return { type: "CART_TOTAL", payload: total };
}

function addingToCart(course){ // GET for purchases
    return (dispatch, getState) => {
        debugger
        const obj = {
            course_id: course.id,
            user_id: currentUser.id,
            is_purchased: false,
            course: course, 
            user: currentUser
        }
        fetch('http://localhost:3000/purchases', {
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
    debugger
    console.log("UPDATED CART", purchase)
    return { 
        type: "ADD_TO_CART", 
        payload: purchase}
}

// function addedToCart(addCourseToCart){
//     debugger
//     console.log("UPDATED CART", addCourseToCart)
//     return { type: "ADD_TO_CART", payload: addCourseToCart}
// }

export { fetchingCourses, fetchingUser, fetchingUserCart, cartTotal, addingToCart }