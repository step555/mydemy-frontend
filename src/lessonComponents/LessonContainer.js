import React from 'react'
import {connect} from 'react-redux'
import {selectingLesson} from '../redux/actions'
import {Button, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Lesson from './Lesson'
import {selectingCourseLessons} from '../redux/actions'

class LessonContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            courseId: "",
            lessonId: "",
            lessons: [],
            displayIndex: 0
        }
    }

    componentWillMount(){
        let courseId = parseInt(this.props.match.params.courseId)
        let lessonId = parseInt(this.props.match.params.lessonId)
        this.setState({
            courseId: courseId,
            lessonId: lessonId
        })
        // this.props.selectingLesson(lessonId)
        this.props.selectingCourseLessons(courseId)

    }

    componentDidMount(){
        if(this.props.lessons){
            this.setState({lessons: this.props.lessons})
        }
    }



    nextLesson = () => {
        this.setState({ lessonId: this.state.lessonId + 1 })
    }

    render(){
        console.log("lesson container props", this.props)
        return(
            <div>
                <h1>LESSON CONTAINER</h1>
                <br></br>
                <Link to={`/course/${this.state.courseId}/dashboard`}><Button>Back to Course Dashboard</Button></Link>
                <br></br><br></br>
                {/* <h1 className="lesson-name-h1">{this.props.selectedLesson.course.name}</h1> */}
                <div className="next-previous-lesson-div">
                    <Grid>
                        <Grid.Column width={8}>
                            <Button>Previous Lesson</Button>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Link to={`/course/${this.state.courseId}/${this.state.lessonId + 1}`}><Button onClick={this.nextLesson}>Next Lesson</Button></Link>
                        </Grid.Column>
                    </Grid>
                    {this.props.lessons.map(l => {
                        // debugger
                        return <Lesson lesson={l} key={l.id}/>}
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // selectedLesson: state.selectedLesson,
        lessons: state.lessons
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // selectingLesson: (info) => {dispatch( selectingLesson(info) )},
        selectingCourseLessons: (info) => {dispatch( selectingCourseLessons(info) )}
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(LessonContainer));

// export default LessonContainer