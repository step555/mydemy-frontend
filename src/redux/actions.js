const COURSES_URL = 'http://localhost:3000/courses'
const USER_URL = 'http://localhost:3000/users/1'
// let id

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

export { fetchingCourses, fetchingUser }