import React from 'react'
import {connect} from 'react-redux'
import {selectingLesson} from '../redux/actions'
import {Button, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Lesson extends React.Component {
    constructor(){
        super()
        this.state = {
            courseId: "",
            lessonId: ""
        }
    }

    componentWillMount(){
        // let courseId = parseInt(this.props.match.params.courseId)
        // let lessonId = parseInt(this.props.match.params.lessonId)
        // this.setState({
        //     courseId: courseId,
        //     lessonId: lessonId
        // })
        // this.props.selectingLesson(lessonId)
    }

    nextLesson = () => {
        this.setState({ lessonId: this.state.lessonId + 1 })
    }

    render(){
        console.log("lesson props", this.props)
        // debugger
        return !this.props.lesson ? null : (
            <div>
                <br></br><br></br>
                <div className="lesson-content-div">
                    <iframe width="560" height="315" src={this.props.lesson.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                    </iframe>
                    <br></br><br></br>
                    <p>{this.props.lesson.text_content}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // selectedLesson: state.selectedLesson,
        // lessons: state.lessons
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // selectingLesson: (info) => {dispatch( selectingLesson(info) )}
    }
}

// // export default Lesson

export default (connect(mapStateToProps, mapDispatchToProps)(Lesson));