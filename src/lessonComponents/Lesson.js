import React from 'react'
import {connect} from 'react-redux'
import {selectingLesson} from '../redux/actions'
import {Button, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import LessonVideo from './LessonVideo'

class Lesson extends React.Component {
    constructor(){
        super()
        this.state = {
            // courseId: "",
            // lessonId: ""
        }
    }

    componentWillMount(){
        // debugger
        // let courseId = parseInt(this.props.match.params.courseId)
        // let lessonId = parseInt(this.props.match.params.lessonId)
        
        // console.log("lessonId", this.state.lessonId)

        // this.props.selectingLesson(this.props.lessonId)
        //     this.setState({
        //         // courseId: courseId,
        //         lessonId: this.props.lessonId
        // })
    }

    componentDidMount(){
        // debugger
        // this.props.selectingLesson(this.props.lessonId)
        let lessonId = this.props.lId
        this.setState({
            // courseId: courseId,
            // lessonId: this.props.lessonId
            lessonId: lessonId
        })
    }

    // nextLesson = () => {
    //     this.setState({ lessonId: this.state.lessonId + 1 })
    // }

    render(){

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
        // return !this.props.selectedLesson ? null : (
        // // return (
        //     <div>
        //     <br></br><br></br>
        //     <div className="lesson-content-div">
        //         {/* <iframe width="560" height="315" src={this.props.selectedLesson.video} title="video" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
        //         </iframe> */}
        //         <LessonVideo lesson={this.props.selectedLesson}/>
        //         <br></br><br></br>
        //         <p>{this.props.selectedLesson.text_content}</p>
        //     </div>
        // </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedLesson: state.selectedLesson,
        // lessons: state.lessons
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectingLesson: (info) => {dispatch( selectingLesson(info) )}
    }
}

// // export default Lesson

export default (connect(mapStateToProps, mapDispatchToProps)(Lesson));