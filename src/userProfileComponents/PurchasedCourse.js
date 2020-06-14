import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {selectingCourseLessons} from '../redux/actions'

const PurchasedCourse = (props) => {
    console.log("purchased course props", props)

    const handleClick = () => {
        props.selectingCourseLessons(props.course.id)
    }

    return(
        <div>
            <Card>
                <div className="user-course-div" onClick={null}>
                    <h5 className="course-card-text">{props.course.name}</h5>
                    <p className="course-card-text">{props.course.subject}</p>
                    <p className="course-card-text">{props.course.duration}</p>
                    <Link to={`/course/${props.course.id}/lessons`}><button onClick={handleClick}>Begin your lessons</button></Link>
                </div>
            </Card>
            <br></br>

        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps")
    return {
        selectingCourseLessons: (info) => {dispatch( selectingCourseLessons(info) )}
    }
}

export default connect(null, mapDispatchToProps)(PurchasedCourse)