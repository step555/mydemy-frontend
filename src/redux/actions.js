const BASE_URL = 'http://localhost:3000'
const COURSES_URL = 'http://localhost:3000/courses'
const USER_URL = 'http://localhost:3000/users'
const PURCHASES_URL = 'http://localhost:3000/purchases'
const LOGIN_URL = 'http://localhost:3000/login'
const COMPANY_LOGIN_URL = 'http://localhost:3000/company-login'
const COMPANY_URL = 'http://localhost:3000/companies'

let currentUser
let currentUserId
let currentCompany
let currentCompanyId
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
            .then(user => {
                if(user.error_message){
                    alert(user.error_message)
                }else{
                    localStorage.setItem("token", user.token)
                    localStorage.setItem("user_or_company", "user")
                    currentUser = user.user
                    currentUserId = user.user.id
                    dispatch(fetchedUser(user.user))
            }
        })
    }
}

function gettingProfileFetch(){
    return dispatch => {
            if(localStorage.token && localStorage.user_or_company === "user") {
            fetch(LOGIN_URL, { // fetches user minus courses and purchases
                headers: {"Authenticate": localStorage.token}
            })
            .then(resp => resp.json())
            .then(user => { 
                currentUser = user
                currentUserId = user.id
                if(user.message){
                    localStorage.removeItem("token")
                }else{
                fetch(USER_URL + `/${currentUserId}`) // fetches user courses and purchases
                .then(resp => resp.json())
                .then(user => {
        
                    if(!user.status){
                        dispatch(gotProfileFetch(user))
                    }
                })
                }
            })
        }
    }
}

function gotProfileFetch(user){
        return {type: "GOT_PROFILE_FETCH", payload: user}
}

function editingUserInfo(newUserInfo){
    return dispatch => {
    console.log("GOT TO EDIT USER INFO", newUserInfo)
    let obj = {
        name: newUserInfo.name,
        email: newUserInfo.email
    }
    fetch(USER_URL + `/${currentUserId}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json",
        "Accept": "application/json"},
        body: JSON.stringify(obj)
    }).then(resp => resp.json())
    .then(updatedUser => {
        currentUser = updatedUser
        fetch(USER_URL + `/${currentUserId}`)
        .then(resp => resp.json())
        .then(updatedWithCoursesAndPurchases => {
            dispatch(editedUserInfo(updatedWithCoursesAndPurchases))
            })
        })
    }
}

function editedUserInfo(updatedUser){
    return {type: "EDITED_USER_INFO", payload: updatedUser}
}

function editingCompanyInfo(newCompanyInfo){
    return dispatch => {
        let obj = {
            name: newCompanyInfo.name,
            email: newCompanyInfo.email
        }
        fetch(COMPANY_URL + `/${currentCompanyId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json",
            "Accept": "application/json"},
            body: JSON.stringify(obj)
        }).then(resp => resp.json())
        .then(updatedCompany => {
            currentCompany = updatedCompany
        fetch(COMPANY_URL + `/${currentCompanyId}`)
        .then(resp => resp.json())
        .then(updatedWithCoursesAndPurchases => {
            dispatch(editedCompanyInfo(updatedWithCoursesAndPurchases))
            })

        })
    }
}

function editedCompanyInfo(updatedCompany){
    return {type: "EDITED_COMPANY_INFO", payload: updatedCompany}
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

function removingFromCart(item){
    return (dispatch) => {
    fetch(PURCHASES_URL + `/${item.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json",
        "Accept": "application/json"}
    }).then(resp => resp.json())
    .then(purchase => {
        console.log(purchase)
        dispatch(removedFromCart(purchase))
        })
    }
}

function removedFromCart(purchase){
    return {type: "REMOVED_FROM_CART", payload: purchase}
}

function fetchedTotalCompanyRevenue(total){
    return {type: "FETCHED_TOTAL_REVENUE", payload: total}
}

function totalRevenue(){
    return(dispatch) => {
        fetch(COURSES_URL)
        .then(resp => resp.json())
        .then(courses => {
            let total = 0
            // const userPurchases = purchases.filter(p => p.user_id === currentUser.id)
            // const userCart = userPurchases.filter(p => p.is_purchased === false)
            const companyCourses = courses.filter(c => c.company_id === currentCompanyId)
            const purchasedCourses = companyCourses.filter(c => {
            for(let i = 0; i < c.purchases.length; i++){
                if(c.purchases[i].is_purchased === true){
                    total += c.price
                }
            }
            })
            dispatch(fetchedTotalCompanyRevenue(total))
        })
    }
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
    return (dispatch) => {
        let obj = {
            email: email,
            password: password
        }
            fetch(COMPANY_LOGIN_URL, {
                method: "POST",
                headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                },
                body: JSON.stringify(obj)
                }).then(resp => resp.json())
                .then(company => { 

                    if(company.error_message){
                        alert(company.error_message)
                    }else{
                        localStorage.setItem("token", company.token)
                        localStorage.setItem("user_or_company", "company")
                        currentCompany = company.company
                        currentCompanyId = company.id
                        dispatch(fetchedCompany(company.company))
                }
            })
        }
}

function fetchedCompany(company){
    return {type: "FETCHED_COMPANY", payload: company}
}

function gettingCompanyProfileFetch(){
    return (dispatch) => {
            if(localStorage.token && localStorage.user_or_company === "company") {
            fetch(COMPANY_LOGIN_URL, { // fetches user minus courses and purchases
                // method: "GET",
                headers: {"Authenticate": localStorage.token}
            })
            .then(resp => resp.json())
            .then(company =>{ 
                currentCompanyId = company.id
                if(company.message){
                    localStorage.removeItem("token")
                }else{
                fetch(COMPANY_URL + `/${currentCompanyId}`) // fetches user courses and purchases
                .then(resp => resp.json())
                .then(company => {
                    currentCompany = company
                    dispatch(gotCompanyProfileFetch(company))
                })
                }
            })
        }
    }
}

function gotCompanyProfileFetch(company){
    return {type: "GOT_COMPANY_PROFILE_FETCH", payload: company}
}

function creatingNewCourse(courseInfo){
    console.log("before dispatch", courseInfo)
    return (dispatch) => {
        if(typeof(courseInfo.contentCovered) === "string"){
            courseInfo.contentCovered = [courseInfo.contentCovered]
        }
        // let contentCovered = `${courseInfo.contentCovered}`
        let obj = {
            name: courseInfo.courseName,
            text_preview: courseInfo.courseDescription,
            video_preview: courseInfo.videoPreview,
            price: courseInfo.price,
            duration: courseInfo.duration,
            subject: courseInfo.subject,
            difficulty_level: courseInfo.difficultyLevel,
            content_covered: courseInfo.contentCovered,
            // content_covered: contentCovered,
            picture: courseInfo.picture,

            company_id: currentCompanyId
        }
        fetch(COURSES_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json",
            "Accept": "application/json"},
            body: JSON.stringify(obj)
        }).then(resp => resp.json())
        .then(course => {
            currentCompany.courses.push(course)
            dispatch(createdNewCompanyCourse(currentCompany))

            dispatch(createdNewCourse(course))
            window.location.reload()


        })
    }
}

function createdNewCourse(course){
    return {type: "CREATED_NEW_COURSE", payload: course}
}

function createdNewCompanyCourse(currentCompany){
    return {type: "CREATED_NEW_COMPANY_COURSE", payload: currentCompany}
}

// function selectingCourse(id){
//     return (dispatch) => {
//     fetch(COURSES_URL + `/${id}`)
//     .then(resp => resp.json())
//     .then(course => {
//         dispatch(selectedCourse(course))
//         })
//     }
// }

// function selectedCourse(course){
//     return {type: "EDIT_SELECTED_COURSE", payload: course}
// }

function deletingCourse(courseId){
    return (dispatch) => {
        fetch(COURSES_URL + `/${courseId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json",
            "Accept": "application/json"}
        }).then(resp => resp.json())
        .then(course => {
            console.log(course)
            dispatch(deletedCourse(course))
            let updatedCourses = currentCompany.courses.filter(course => {
                return course.id !== courseId
            })
            // dispatch(deletedCourse(updatedCourses))
            currentCompany.courses = updatedCourses
            dispatch(deletedCompanyCourse(currentCompany))
            // window.location.reload()
            })
    }
}

function deletedCompanyCourse(currentCompany){
    return {type: "DELETED_COURSE_FROM_COMPANY", payload: currentCompany}
}

function deletedCourse(course){
    return {type: "DELETED_COURSE", payload: course}
}

// export { selectingCourse, creatingNewCourse, editingCompanyInfo, editingUserInfo, removingFromCart, totalRevenue, fetchingCompany, logoutUser, fetchingCourses, fetchingUser, fetchingUserCart, cartTotal, addingToCart, checkingOutCart, gettingProfileFetch, gettingCompanyProfileFetch }
export { deletingCourse, creatingNewCourse, editingCompanyInfo, editingUserInfo, removingFromCart, totalRevenue, fetchingCompany, logoutUser, fetchingCourses, fetchingUser, fetchingUserCart, cartTotal, addingToCart, checkingOutCart, gettingProfileFetch, gettingCompanyProfileFetch }