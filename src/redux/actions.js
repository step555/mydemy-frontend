const BASE_URL = 'http://localhost:3000'
const COURSES_URL = 'http://localhost:3000/courses'
const USER_URL = 'http://localhost:3000/users'
const PURCHASES_URL = 'http://localhost:3000/purchases'
const LOGIN_URL = 'http://localhost:3000/login'
const COMPANY_LOGIN_URL = 'http://localhost:3000/company-login'
const COMPANY_URL = 'http://localhost:3000/companies'
const LESSON_URL = 'http://localhost:3000/lessons'

let currentUser
let currentUserId
let currentCompany
let currentCompanyId
let allCourses
let currentUserCart
let newlyCreatedCourse

// function fetchingLessons(){
//     return (dispatch) => {
//         fetch(LESSON_URL)
//     }
// }

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
            .then(user => { // does not fetch courses and purchases of user
                if(user.error_message){
                    alert(user.error_message)
                }else{
                    localStorage.setItem("token", user.token)
                    localStorage.setItem("user_or_company", "user")
                    // currentUser = user.user
                    currentUserId = user.user.id
                fetch(USER_URL + `/${currentUserId}`) // fetches user courses and purchases
                .then(resp => resp.json())
                .then(user => {
                    if(!user.status){
                        currentUser = user
                        dispatch(fetchedUser(user))
                    }
                })
                // dispatch(fetchedUser(user.user))
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
                // currentUser = user
                currentUserId = user.id
                if(user.message){
                    localStorage.removeItem("token")
                }else{
                fetch(USER_URL + `/${currentUserId}`) // fetches user courses and purchases
                .then(resp => resp.json())
                .then(user => {
        
                    if(!user.status){
                        currentUser = user
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
        currentCompanyId = currentCompany.id // temporary fix
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
            for(let i = 0; i < allCourses.length; i++){
                for(let j = 0; j < updatedWithCoursesAndPurchases.courses.length; j++){
                    if(allCourses[i].id === updatedWithCoursesAndPurchases.courses[j].id){
                        allCourses[i].company.name = updatedWithCoursesAndPurchases.name
                        dispatch(changedCompanyNameOfCourse(allCourses[i]))
                    }
                }
            }
            dispatch(editedCompanyInfo(updatedWithCoursesAndPurchases))
            })

        })
    }
}

function editedCompanyInfo(updatedCompany){
    return {type: "EDITED_COMPANY_INFO", payload: updatedCompany}
}

function changedCompanyNameOfCourse(updatedCourse){
    return {type: "CHANGED_COMPANY_NAME_OF_COURSE", payload: updatedCourse}
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
            // debugger // below line is prone to having errors
            // const userPurchases = purchases.filter(p => p.user_id === currentUser.id)
            const userPurchases = purchases.filter(p => p.user_id === currentUserId)
            const userCart = userPurchases.filter(p => p.is_purchased === false)
            let total = 0
            userCart.forEach(p => total += p.course.price)

            let currentUserCart = userCart

            dispatch(fetchedUserCart(userCart))
            dispatch(cartTotal(total))
        })
    }
}

function cartTotal(total) {
    // total is correct
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
        // console.log(purchase)
        // debugger // below line is prone to errors
        currentUser.purchases = currentUser.purchases.filter(p => p.id !== purchase.id)
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
    return (dispatch, getState) => {
        let alreadyInCartOrPurchased = false
        for(let i = 0; i < course.users.length; i++){
            if(course.users[i].id === currentUserId){
                alreadyInCartOrPurchased = true
                i = course.users.length
                // alert("You already purchased this course")
                // dispatch(alreadyOwned())
            }
        }

        for(let k = 0; k < currentUser.purchases.length; k++){
            if(course.id === currentUser.purchases[k].course_id){
                alreadyInCartOrPurchased = true
                k = currentUser.purchases.length
                // j = course.purchases.length
            }
        }
            if(alreadyInCartOrPurchased === true){
                alert("You have either already purchased this course or it is currently inside your cart")
                dispatch(alreadyOwned())
            }else{
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
            // for(let i = 0; i < currentUser.purchases.length; i++){
                // if(!currentUser.purchases[i].id.includes(purchase.id)){
                    // if(currentUser.purchases[i].id === (purchase.id)){ 
                        currentUser.purchases = [...currentUser.purchases, purchase]
                    // }
            // }
            
            purchase.course = course // experimental change
            dispatch(addedToCart(purchase))
        })
        }
    }
}

function addedToCart(purchase){

    console.log("UPDATED CART", purchase)
    return { 
        type: "ADD_TO_CART", 
        payload: purchase}
}

function alreadyOwned(){
    return {
        type: "ALREADY_OWNED",

    }
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
                        // currentCompany = company.company
                        currentCompanyId = company.company.id
                        fetch(COMPANY_URL + `/${currentCompanyId}`) // fetches user courses and purchases
                        .then(resp => resp.json())
                        .then(company => {
                            if(!company.status){
                                // currentCompany = company.company // why was this changed to company.company?
                                currentCompany = company
                                dispatch(gotCompanyProfileFetch(company))
                            }
                })
                    // dispatch(fetchedCompany(company.company))
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

function addFinalLessonToLessonsArray(lessonName, lessonText, video){
    // debugger
    let finalLesson = [lessonName, lessonText, video]
    return {type: "ADDED_FINAL_LESSON", payload: finalLesson}
}

function creatingNewCourse(courseInfo){
    console.log("before dispatch", courseInfo)
    return (dispatch) => {
        // if(typeof(courseInfo.contentCovered) === "string"){
        //     courseInfo.contentCovered = [courseInfo.contentCovered]
        // }else if(courseInfo.contentCovered.includes("")){
        //     courseInfo.contentCovered = courseInfo.contentCovered.filter(i => i !== "")
        // }

        // let contentCovered = `${courseInfo.contentCovered}`
        let courseObj = {
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
            company_id: currentCompanyId,
            // lessons: {
            //     text_content: courseInfo.
            // }
        }
        debugger
        fetch(COURSES_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json",
            "Accept": "application/json"},
            body: JSON.stringify(courseObj)
        }).then(resp => resp.json())
        .then(course => {
            currentCompany.courses.push(course)
            course.company = currentCompany

            let lessonObj = {}
            debugger
            for(let i = 0; i < courseInfo.lessonsArray.length; i++){ // [i][0] === lesson name, [i][1] === text content, [i][2] === video, lesson number === [i][i]
                // if video === "" then obj excludes video
                if(courseInfo.lessonsArray[i][2] === ""){
                    lessonObj = {
                        course_id: course.id,
                        lesson_name: courseInfo.lessonsArray[i][0],
                        text_content: courseInfo.lessonsArray[i][1],
                        // video: null,
                        lesson_number: courseInfo.lessonsArray[i][i]
                    }
                }
                // else include video
                else{
                    lessonObj = {
                        course_id: course.id,
                        lesson_name: courseInfo.lessonsArray[i][0],
                        text_content: courseInfo.lessonsArray[i][1],
                        video: courseInfo.lessonsArray[i][2],
                        lesson_number: courseInfo.lessonsArray[i][i]
                    }
                }
                newlyCreatedCourse = course
                newlyCreatedCourse.lessons = []
                fetch(LESSON_URL, {
                    method: "POST",
                    headers: {"Content-Type": "application/json",
                    "Accept": "application/json"},
                    body: JSON.stringify(lessonObj)
                }).then(resp => resp.json())
                .then(lesson => {
                    newlyCreatedCourse.lessons = [...newlyCreatedCourse.lessons, lesson]
                    dispatch(createdNewLesson)
                })
            }
            dispatch(createdNewCompanyCourse(currentCompany))
            dispatch(createdNewCourse(newlyCreatedCourse))

            // window.location.reload()
            // alert("Adding your course to our system. Click Ok to continue")
        })
    }
}

function createdNewLesson(lesson){
    return {type: "CREATED_NEW_LESSON", payload: lesson}
}

function createdNewCourse(course){
    return {type: "CREATED_NEW_COURSE", payload: course}
}

function createdNewCompanyCourse(currentCompany){
    return {type: "CREATED_NEW_COMPANY_COURSE", payload: currentCompany}
}

function selectingCourseLessons(id){
    return (dispatch) => {
        fetch(COURSES_URL + `/${id}`)
        .then(resp => resp.json())
        .then(course => {
            dispatch(selectedCourseLessons(course.lessons))
        })
    }
}

function selectedCourseLessons(lessons){
    return {type: "FETCHED_LESSONS", payload: lessons}
}

function selectedCourse(course){
    return {type: "EDIT_SELECTED_COURSE", payload: course}
}

function selectingLesson(lessonId){
    return (dispatch) => {
        // console.log("selecting", lessonId)
        fetch(LESSON_URL + `/${lessonId}`)
        .then(resp => resp.json())
        .then(lesson => {
            dispatch(selectedLesson(lesson))
        })
    }
}

function selectedLesson(lesson){
    return {type: "SELECTED_LESSON", payload: lesson}
}

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

function editingCourse(courseInfo){
    return (dispatch) => {
        let contentCovered
        if(typeof(courseInfo.contentCovered) === "string"){
            courseInfo.contentCovered = [courseInfo.contentCovered]
        }else if(courseInfo.contentCovered.includes("")){
            courseInfo.contentCovered = courseInfo.contentCovered.filter(i => i !== "")
        }
        let obj = {
            name: courseInfo.name,
            text_preview: courseInfo.textPreview,
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
        fetch(COURSES_URL + `/${courseInfo.courseId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json",
            "Accept": "application/json"},
            body: JSON.stringify(obj)
        }).then(resp => resp.json())
        .then(course => {
            // dispatch(editedCourse(course))

            window.location.reload()
        })
    }
}

function editedCourse(course){
    return {type: "EDITED_COURSE", payload: course}
}

function creatingNewUser(userInfo){
    return (dispatch) => {
        let obj = {
            user: { // must be nested to avoid "password can't be blank" in backend create action
                name: userInfo.name,
                email: userInfo.email, 
                password: userInfo.password,
                password_confirmation: userInfo.password
            }
        }
        fetch(USER_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json",
                "Accept": "application/json"},
            body: JSON.stringify(obj)
        }).then(resp => resp.json())
        .then(user => {
            localStorage.setItem("token", user.token)
            localStorage.setItem("user_or_company", "user")
            currentUserId = user.id
            dispatch(gettingProfileFetch())
            // fetch(USER_URL + `/${currentUserId}`)
            // fetch(LOGIN_URL + `/${currentUserId}`)
            // .then(resp => resp.json())
            // .then(user => {
                // dispatch(fetchingUser(user.email, user.password))
                // dispatch(gettingProfileFetch())
                // gettingProfileFetch()
            // })
            // window.location.reload()
        })
    }
}

function creatingNewCompany(companyInfo){
    return (dispatch) => {
        let obj = {
            company: {// must be nested to avoid "password can't be blank" in backend create action
            name: companyInfo.name,
            email: companyInfo.email,
            password: companyInfo.password,
            password_confirmation: companyInfo.password
            }
        }
        fetch(COMPANY_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json",
                "Accept": "application/json"},
            body: JSON.stringify(obj)
        }).then(resp => resp.json())
        .then(company => {
            localStorage.setItem("token", company.token)
            localStorage.setItem("user_or_company", "company")
            currentCompanyId = company.id
            dispatch(gettingCompanyProfileFetch())
        })
    }
}

function fetchingAllUsers(){
    return (dispatch) => {
        fetch(USER_URL)
        .then(resp => resp.json())
        .then(users => {
            dispatch(fetchedAllUsers(users))
        })
    }
}

function fetchedAllUsers(users){
    return {type: "FETCHED_ALL_USERS", payload: users}
}

function changeSearchText(value) {
    return { type: "CHANGE_SEARCH_TEXT", payload: value };
}

function sortByDuration(value){
    return { type: "SORTED_BY_DURATION", payload: value }
}

function sortByPrice(value){
    return { type: "SORTED_BY_PRICE", payload: value }
}

function sortByDifficultyLevel(value){
    return { type: "SORTED_BY_DIFFICULTY_LEVEL", payload: value }
}

export { addFinalLessonToLessonsArray, createdNewLesson, selectingLesson, sortByDuration, sortByPrice, sortByDifficultyLevel, changeSearchText, fetchingAllUsers, creatingNewUser, creatingNewCompany, editingCourse, selectingCourseLessons, deletingCourse, creatingNewCourse, editingCompanyInfo, editingUserInfo, removingFromCart, totalRevenue, fetchingCompany, logoutUser, fetchingCourses, fetchingUser, fetchingUserCart, cartTotal, addingToCart, checkingOutCart, gettingProfileFetch, gettingCompanyProfileFetch }