import React from 'react'
import {connect} from 'react-redux'
import {selectingLesson} from '../redux/actions'
import {Button, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Lesson from './Lesson'
// import LessonVideo from './LessonVideo'
import {selectingCourseLessons} from '../redux/actions'

class LessonContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            courseId: "",
            lessonId: "",
            lessons: [], // probably delete this
            displayIndex: 0
        }
    }

    componentWillMount(){
        let courseId = this.props.courseId
        let lessonId = this.props.lessonId

            this.setState({
                courseId: courseId,
                // lessonId: parseInt(this.props.match.params.lessonId)
                lessonId: lessonId
                // lessonId: id
            },() => {
                console.log("before selecting lesson is called", this.state)
                this.props.selectingLesson(this.state.lessonId)
            })
    }

    individualLesson = () => {
        return this.props.lessons.slice(this.state.displayIndex, this.state.displayIndex + 1)
    }

    nextLesson = () => {
        this.setState({ lessonId: this.state.lessonId + 1 })
    }

    render(){
        return(
            <div className="lesson-container-div">
                <br></br>
                <br></br><br></br>
                <div className="next-previous-lesson-div">
                    <Lesson lId={this.state.lessonId}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedLesson: state.selectedLesson,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectingLesson: (info) => {dispatch( selectingLesson(info) )},
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(LessonContainer));