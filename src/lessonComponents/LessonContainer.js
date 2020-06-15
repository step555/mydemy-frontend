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
        let courseId = parseInt(this.props.match.params.courseId)
        let lessonId = parseInt(this.props.match.params.lessonId)
        // debugger
        // if( lessonId !== "Video" ){ // prevents lessonId from becoming string "video"
        // if(typeof(lessonId !== "string")){
        //     const id = lessonId
        //     // debugger
        // }

        if( this.props.match.params.lessonId !== "Video" ){ // prevents lessonId from becoming string "video"
            this.setState({
                courseId: courseId,
                lessonId: parseInt(this.props.match.params.lessonId)
                // lessonId: lessonId
                // lessonId: id
            },() => {
                // debugger
                console.log("before selecting lesson is called", this.state)
                this.props.selectingLesson(this.state.lessonId)
            })
        }

        // this.props.selectingLesson(this.state.lessonId)
        // console.log(this.state.lessonId)
    }

    individualLesson = () => {
        // return this.state.lessons.slice(this.state.displayIndex, this.state.displayIndex + 1)
        return this.props.lessons.slice(this.state.displayIndex, this.state.displayIndex + 1)
    }

    nextLesson = () => {
        this.setState({ lessonId: this.state.lessonId + 1 })
    }

    render(){
        // console.log("lesson container props", this.props)
        // console.log("Lesson container lessons state", this.state)
        return(
            <div>
                <h1>LESSON CONTAINER</h1>
                <br></br>
                <Link to={`/course/${this.state.courseId}/dashboard`}><Button>Back to Course Dashboard</Button></Link>
                <br></br><br></br>
                {/* <h1 className="lesson-name-h1">{this.props.selectedLesson.course.name}</h1> */}
                <div className="next-previous-lesson-div">
                    {/* {this.individualLesson().map(l => {
                        // debugger
                        return <Lesson lesson={l} key={l.id}/>}
                    )} */}
                    {/* {this.props.lessons.map(l => {
                        // debugger
                        return <Lesson lesson={l} key={l.id}/>}
                    )} */}
                    {/* <LessonVideo lessonVideo={this.props.selectedLesson.video}/> */}
                    <Lesson lId={this.state.lessonId}/>
                </div>
            </div>
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
        selectingLesson: (info) => {dispatch( selectingLesson(info) )},
        // selectingCourseLessons: (info) => {dispatch( selectingCourseLessons(info) )}
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(LessonContainer));

// export default LessonContainer




// import React from 'react'

// class LessonContainer extends React.Component {
//     constructor(){
//         super()
//         this.state = {
//             lessonId: ""
//         }
//     }

//     componentDidMount(){

//     }
    
//     render(){
//         console.log(this.props)
//         return(
//             <div>
//                 <h1>Container that should be hidden</h1>
//             </div>
//         )
//     }
// }

// export default LessonContainer