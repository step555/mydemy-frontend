const COURSES_URL = 'http://localhost:3000/courses'
const USER_URL = 'http://localhost:3000/users'
const PURCHASES_URL = 'http://localhost:3000/purchases'
const LOGIN_URL = 'http://localhost:3000/login'
const COMPANY_URL = 'http://localhost:3000/company'

let currentUser
let currentUserId
let allCourses
// let 

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
    // debugger
        fetch(LOGIN_URL, {
            method: "POST",
            headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
            },
            body: JSON.stringify(obj)
            }).then(resp => resp.json())
            .then(user => { // user here does not include user courses and user purchases
                if(user.error_message){
                    alert(user.error_message)
                }else{
                    currentUserId = user.id // above POST request is to retrieve user_id of logged in user
                        fetch(USER_URL + `/${currentUserId}`)
                        .then(resp => resp.json())
                        .then(user => { // includes user courses and user purchases

                            currentUser = user
                            dispatch(fetchedUser(user))
                        })
            }
        })
    }
}

// function loggingIn(email, password){
//     return(dispatch, getState) => {
//     let obj = {
//         email: email,
//         password: password
//     }
//     console.log("arrived at redux actions")
//     // debugger
//     fetch(LOGIN_URL, {
//         method: "POST",
//         headers: {
//         "Content-Type" : "application/json",
//         "Accept" : "application/json"
//         },
//         body: JSON.stringify(obj)
//     }).then(resp => resp.json())
//     .then(userData => {
//         debugger
//         dispatch(loggedIn(userData))
//     })
// }}

// function loggedIn(userData){
//     debugger
//     return {
//         type: "LOGGED_IN",
//         payload: userData
//     }
// }

function userPurchasedCourses(){

}

function fetchedUserCart(cart){
    debugger
    return {type: "FETCHED_USER_CART", payload: cart}
}

function fetchingUserCart(){
    debugger
    return (dispatch) => {
        fetch(PURCHASES_URL)
        .then(resp => resp.json())
        .then(purchases => {
            debugger
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

function loggingIn(email, password){
    return(dispatch, getState) => {
    let obj = {
        email: email,
        password: password
    }
    console.log("arrived at redux actions")
    // debugger
    fetch(LOGIN_URL, {
        method: "POST",
        headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
        },
        body: JSON.stringify(obj)
    }).then(resp => resp.json())
    .then(userData => {
        debugger
        dispatch(loggedIn(userData))
    })
}}

function loggedIn(userData){
    debugger
    return {
        type: "LOGGED_IN",
        payload: userData
    }
}


// handleLoginSubmit = () => {
//     console.log("attempting to log in")
//     // fetch("http://localhost:3000/api/v1/login", {
//     fetch("http://localhost:3000/login", {
//       method:"POST",
//       headers: {
//         "Content-Type" : "application/json",
//         "Accept" : "application/json"
//       },
//       body: JSON.stringify({
//         email: this.state.email,
//         password: this.state.password
//         // if using postgres you would put match: this.state.match (that was changed via input) in here
//       })
//     }).then(res => res.json())
//     .then(userData => {

//       // if(this.state.match[0]._label !== userData.name || this.state.match[0]._label === undefined){
//       //   this.setState({ error: "true" })
//       //   alert("wrong face")
//       // }
//       console.log("response from the server", userData)
//       // if this.state.faceMatcher.findBestMatch(descriptor) from vidInput returns name that matches userdata
//       // alert(wrong person message)
//       // debugger
//       if(userData.error_message || this.state.match === undefined || this.state.match[0]._label !== userData.name){
//         this.setState({ error: "true" })
//         alert(userData.error_message)
//       }else{
//         this.setState({ error: "false" })
//         this.props.updateCurrentUser(userData)
//         // alert("Welcome To Bassy Jobs!")
//       }
//     })
//   };

export { fetchingCourses, fetchingUser, fetchingUserCart, cartTotal, addingToCart, checkingOutCart, loggingIn }