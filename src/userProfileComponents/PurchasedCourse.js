import React from 'react'
import {Card} from 'semantic-ui-react'

const PurchasedCourse = (props) => {
    console.log("purchased course props", props)
    return(
        <div>
            <Card>
                <div className="user-course-div" onClick={null}>
                    <h5 className="course-card-text">{props.course.name}</h5>
                    <p className="course-card-text">{props.course.subject}</p>
                    <p className="course-card-text">{props.course.duration}</p>
                </div>
            </Card>
            <br></br>
        </div>
    )
}

export default PurchasedCourse