import React from 'react'

const PurchasedCourse = (props) => {
    console.log("props", props)
    return(
        <div>
            <h5>{props.course.name}</h5>
            <p>{props.course.subject}</p>
            <p>{props.course.duration}</p>
            <br></br>
        </div>
    )
}

export default PurchasedCourse