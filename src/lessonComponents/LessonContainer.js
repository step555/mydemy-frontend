import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {selectingCourseLessons} from '../redux/actions'

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
        console.log("LESSON CONTAINER PROPS", this.props)
        return(
            <div>
                <h1>Lessons</h1>
                <Link to="/profile"><Button>Back to Profile</Button></Link>
                <br></br>
                {this.props.lessons.map(lesson => {
                    return <Link to={`/course/${this.state.courseId}/${lesson.id}`}>{lesson.lesson_name}</Link>
                })}
                <p>Here</p>
                {/* <Lesson /> */}
            </div>
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