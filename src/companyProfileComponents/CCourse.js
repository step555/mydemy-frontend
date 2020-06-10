import React from 'react'

const CCourse = (props) => {
    return(
        <div>
            <h5 className="account-info">ID: {props.course.id}</h5>
            <h5 className="account-info">Name: {props.course.name}</h5>
            <h5 className="account-info">Subject: {props.course.subject}</h5>
            <h5 className="account-info">Price: ${props.course.price}</h5>
            <h5 className="account-info">Duration: {props.course.duration}</h5>
            <h5 className="account-info">Difficulty level: {props.course.difficulty_level}</h5>

        </div>
    )
}

export default CCourse