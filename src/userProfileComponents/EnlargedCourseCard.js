import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'

const EnlargedCourseCard = (props) => {
    // console.log(props)
    return (
        <div>
            <Card className="enlarged-course-card">
                <div>
                    <img className="enlarged-course-card-image" src={props.enlargedCourse.picture} alt="course-picture"/>
                    <p className="course-side-text">Course Name: {props.enlargedCourse.name}</p>
                    <p className="course-side-text">Price: ${props.enlargedCourse.price}</p>
                    <p className="course-side-text">Duration: {props.enlargedCourse.duration}</p>
                    <p className="course-side-text">Difficulty level: {props.enlargedCourse.difficulty_level}</p>
                    {/* <div style={{paddingBottom: 12}}></div> */}
                    <h2><small>Institution:</small> <strong>{props.enlargedCourse.company.name}</strong></h2>
                    <h2><small>Subject:</small> <strong>{props.enlargedCourse.subject}</strong></h2>
                    <h5>About this course:</h5>
                    <p>{props.enlargedCourse.text_preview}</p>
                </div>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => ({
    enlargedCourse: state.enlargedCourse,
})

export default connect(mapStateToProps, null)(EnlargedCourseCard)