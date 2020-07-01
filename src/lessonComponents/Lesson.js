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
            lessonId: "",
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
            lessonId: lessonId,
        })
    }

    render(){
        console.log("lesson state", this.state)
        console.log("lesson props", this.props)
        // debugger
        return !this.props.selectedLesson ? null : (
            <div>
                <br></br><br></br>
                <div className="lesson-content-div">
                    {this.props.selectedLesson.video !== null ? // use null/nil
                    <iframe width="560" height="315" src={this.props.selectedLesson.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                    </iframe>
                    : 
                    null}
                    <br></br><br></br>
                    {/* <p>{this.props.selectedLesson.text_content}</p> */}
                    <div className="lesson-content-text-area-div">
                        <textarea className="lesson-content-text-area" value={this.props.selectedLesson.text_content}></textarea>
                    </div>
                </div>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
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