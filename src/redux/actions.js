const COURSES_URL = 'http://localhost:3000/courses'
const USER_URL = 'http://localhost:3000/users'
const PURCHASES_URL = 'http://localhost:3000/purchases'
const LOGIN_URL = 'http://localhost:3000/login'
const COMPANY_URL = 'http://localhost:3000/company'

let currentUser
let currentUserId
let allCourses

function fetchedCourses(courses){
    return {type: "FETCHED_COURSES", payload: courses}
} 

function fetchingCourses(){
    return (dispatch) => {
        fetch(COURSES_URL)
        .then(resp => resp.json())
        .then(courses => {
            allCourses = courses
            dispatch(fetchedCourses(courses))
        })
    }
}

// function fetchedUser(user){
//     return {type: "FETCHED_USER", payload: user}
// }

// function fetchingUser(){
//     return (dispatch) => {
//         fetch(USER_URL)
//         .then(resp => resp.json())
//         .then(user => {
//             currentUser = user
//             dispatch(fetchedUser(user))
//         })
//     }
// }

function fetchedUser(user){
    return {type: "FETCHED_USER", payload: user}
}

function fetchingUser(email, password){
    return (dispatch) => {
    let obj = {
        email: email,
        password: password
    }
        fetch(LOGIN_URL, {
            method: "POST",
            headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json",
            },
            body: JSON.stringify(obj)
            }).then(resp => resp.json())
            .then(user => { // user here does not include user courses and user purchases
                if(user.error_message){
                    alert(user.error_message)
                }else{
                    localStorage.setItem("token", user.token)
                    currentUser = user.user
                    currentUserId = user.id
                    dispatch(fetchedUser(user.user))
            }
        })
    }
}

function gettingProfileFetch(){
    return dispatch => {
            if(localStorage.token) {
            fetch(LOGIN_URL, { // fetches user minus courses and purchases
                // method: "GET",
                headers: {"Authenticate": localStorage.token}
            })
            .then(resp => resp.json())
            .then(user =>{ 
                currentUserId = user.id
                if(user.message){
                    localStorage.removeItem("token")
                }else{
                fetch(USER_URL + `/${currentUserId}`) // fetches user courses and purchases
                .then(resp => resp.json())
                .then(user => {
                    dispatch(gotProfileFetch(user))
                })
                }
            })
        }
    }
}

function gotProfileFetch(user){
    return {type: "GOT_PROFILE_FETCH", payload: user}
}

function logoutUser(currentUser){
    return {type: 'LOGOUT_USER', payload: currentUser}
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

function addingToCart(course){
    // here check if user already has course in cart. if yes then return null? else do the below
    // I may need to add a unique course code to the database for each course
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
            "Accept": "application/json",
        },
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

function fetchingCompany(email, password){
    console.log("GOT HERE")
    
}

export { fetchingCompany, logoutUser, fetchingCourses, fetchingUser, fetchingUserCart, cartTotal, addingToCart, checkingOutCart, gettingProfileFetch}