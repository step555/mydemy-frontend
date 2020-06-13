import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {selectingCourseLessons} from '../redux/actions'
import Lesson from './Lesson'

class LessonContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            courseId: ""
        }
    }
    
    componentWillMount(){
        let courseId = parseInt(this.props.match.params.courseId)
        this.setState({courseId: courseId})
    }

    componentDidMount(){
        this.props.selectingCourseLessons(this.state.courseId)
    }

    render(){
        console.log(this.props.lessons)
        return(
            <div>
                <Link to="/profile"><Button>Back to Profile</Button></Link>
                <h1>Lessons</h1>
                {this.props.lessons.map(lesson => {
                    return <Link to={`/course/${this.state.courseId}/${lesson.id}`}>{lesson.lesson_name}</Link>
                })}
            </div>
            // <Link to={`/course-list/${this.props.course.id}/`}>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      lessons: state.lessons
    };
};

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps")
    return {
        selectingCourseLessons: (info) => {dispatch( selectingCourseLessons(info) )}
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(LessonContainer));