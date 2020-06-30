import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {selectingCourseLessons, selectingLesson, clickedBackButton} from '../redux/actions'
import LessonContainer from './LessonContainer'

class LessonDashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            courseId: "",
            lessonId: "",
            lessonId: null,
            showLesson: false
        }
    }
    
    componentWillMount(){
        // let courseId = parseInt(this.props.match.params.courseId)
        // this.setState({courseId: courseId})
        // this.props.clickedBackButton()
        this.setState({showLesson: false})
        this.setState({lessonId: null})
    }

    componentDidMount(){
        let courseId = parseInt(this.props.match.params.courseId)
        // let courseId = parseInt(this.props.course.id)
        this.setState({courseId: courseId})
        this.props.selectingCourseLessons(courseId) 
    }

    componentWillUnmount(){
        this.props.clickedBackButton()
        this.setState({showLesson: false})
    }

    selectLesson = () => {
        // this.props.selectingLesson(this.state.lessonId)
        this.setState({showLesson: true})
    }

    handleClick = (lessonId) => {
        this.props.selectingLesson(lessonId)
        this.setState({showLesson: true})
    }

    render(){
        console.log("LESSON CONTAINER PROPS", this.props)
        // return !this.props.lessons || this.props.lessons.length === 0 ? null : (
        return !this.props.lessons ? null : (
            <div>
                {/* {this.props.user.currentUser ? 
                    <Link to="/profile"><Button>Back to Profile</Button></Link>
                :   <Link to="/company-profile"><Button>Back to Profile</Button></Link>
                } */}
                <br></br>
                
                <div class="sidenav">
                    {this.props.user.currentUser ? 
                        <Link to="/user-courses"><Button>Back to all courses</Button></Link>
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
                {this.props.selectedLesson.id && this.state.showLesson === true ? 
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
        selectingLesson: (info) => {dispatch( selectingLesson(info) )},
        clickedBackButton: () => {dispatch( clickedBackButton() )}
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(LessonDashboard));