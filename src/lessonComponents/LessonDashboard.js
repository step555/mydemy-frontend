import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {selectingCourseLessons, selectingLesson} from '../redux/actions'
import LessonContainer from './LessonContainer'

class LessonDashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            courseId: "",
            lessonId: "",
            lessonId: null
        }
    }
    
    componentWillMount(){
        // let courseId = parseInt(this.props.match.params.courseId)
        // this.setState({courseId: courseId})
    }

    componentDidMount(){
        debugger
        let courseId = parseInt(this.props.match.params.courseId)
        // let courseId = parseInt(this.props.course.id)
        this.setState({courseId: courseId})
        this.props.selectingCourseLessons(courseId)
    }

    selectLesson = () => {
        // this.props.selectingLesson(this.state.lessonId)
    }

    handleClick = (lessonId) => {
        this.props.selectingLesson(lessonId)
    }

    render(){
        console.log("LESSON CONTAINER PROPS", this.props)
        return !this.props.lessons || this.props.lessons.length === 0 ? null : (
            <div>
                <h1>Lessons</h1>
                {this.props.user.currentUser ? 
                    <Link to="/profile"><Button>Back to Profile</Button></Link>
                :   <Link to="/company-profile"><Button>Back to Profile</Button></Link>
                }
                <br></br>
                
                <div class="sidenav">
                    <br></br><br></br>
                    {this.props.user.currentUser ? 
                        <Link to="/profile"><Button>Back to Profile</Button></Link>
                    :   <Link to="/company-profile"><Button>Back to Profile</Button></Link>
                    }
                    {this.props.lessons.map(lesson => {
                        return <Link to={`/course/${this.state.courseId}/lessons/${lesson.id}`} onClick={() => this.handleClick(lesson.id)}>{lesson.lesson_name}</Link>
                    })}
                </div>


                    {/* {this.props.lessons.map(lesson => {
                        return <Link to={`/course/${this.state.courseId}/lessons/${lesson.id}`} onClick={() => this.handleClick(lesson.id)}>{lesson.lesson_name}</Link>
                    })} */}
                {/* <div className="lesson-container-hide">
                    {this.props.lessons.map(lesson => {
                        return <LessonContainer lesson={lesson} key={lesson.id}/> didn't work
                    })}
                </div> */}
                {this.props.selectedLesson.id ? 
                <div>
                    <LessonContainer courseId={this.state.courseId} lessonId={this.props.selectedLesson.id}/>
                </div>
                : 
                null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      lessons: state.lessons,
      user: state.user,
      company: state.company,
      selectedLesson: state.selectedLesson
    };
};

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps")
    return {
        selectingCourseLessons: (info) => {dispatch( selectingCourseLessons(info) )},
        selectingLesson: (info) => {dispatch( selectingLesson(info) )}
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(LessonDashboard));





// import React from 'react'
// import {connect} from 'react-redux'
// import {Button} from 'semantic-ui-react'
// import {Link} from 'react-router-dom'
// import {selectingCourseLessons, selectingLesson} from '../redux/actions'

// class LessonDashboard extends React.Component{
//     constructor(){
//         super()
//         this.state = {
//             courseId: "",
//             lessonId: ""
//         }
//     }
    
//     componentWillMount(){
//         // let courseId = parseInt(this.props.match.params.courseId)
//         // this.setState({courseId: courseId})
//     }

//     componentDidMount(){
//         let courseId = parseInt(this.props.match.params.courseId)
//         this.setState({courseId: courseId})
//         this.props.selectingCourseLessons(courseId)
//     }

//     handleClick = (lessonId) => {
//     //     // this.props.selectingLesson(lessonId)
//     }

//     handleClick = (courseId) => {
//         // this.props.fetchingLessons(courseId)
//     }

//     render(){
//         console.log("LESSON CONTAINER PROPS", this.props)
//         return !this.props.lessons || this.props.lessons.length === 0 ? null : (
//             <div>
//                 <h1>Lessons</h1>
//                 <Link to="/profile"><Button>Back to Profile</Button></Link>
//                 <br></br>
//                 {this.props.lessons.map(lesson => {
//                     return <Link to={`/course/${this.state.courseId}/lessons/${lesson.id}`} onClick={() => this.handleClick(this.state.courseId)}>{lesson.lesson_name}</Link>
//                 })}
//                 <p>Here</p>
//                 {/* <Lesson /> */}
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//       lessons: state.lessons
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     console.log("mapDispatchToProps")
//     return {
//         selectingCourseLessons: (info) => {dispatch( selectingCourseLessons(info) )},
//         selectingLesson: (info) => {dispatch( selectingLesson(info) )}
//     }
// }

// export default (connect(mapStateToProps, mapDispatchToProps)(LessonDashboard));