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
        let courseId = parseInt(this.props.match.params.courseId)
        let lessonId = parseInt(this.props.match.params.lessonId)
        this.setState({
            courseId: courseId,
            lessonId: lessonId
        })
        this.props.selectingLesson(lessonId)
    }

    render(){
        console.log("lesson props", this.props)
        return !this.props.selectedLesson.course ? null : (
            <div>
                <br></br>
                <h1>{this.props.selectedLesson.lesson_number}</h1>
                <Link to={`/course/${this.state.courseId}/lessons`}><Button>Back to course Dashboard</Button></Link>
                <h1 className="lesson-name-h1">{this.props.selectedLesson.course.name}</h1>
                <div className="next-previous-lesson-div">
                    <Grid>
                        <Grid.Column width={8}>
                            <Button>Previous Lesson</Button>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Link to={`/course/${this.state.courseId}/${this.state.lessonId + 1}`}><Button onClick={null}>Next Lesson</Button></Link>
                        </Grid.Column>
                    </Grid>
                    <br></br>
                    <div className="lesson-content-div">
                        <iframe width="560" height="315" src={this.props.selectedLesson.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                        </iframe>
                        <br></br><br></br>
                        <p>{this.props.selectedLesson.text_content}</p>
                    </div>
                    {/* <iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe> */}
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
    console.log("mapDispatchToProps")
    return {
        selectingLesson: (info) => {dispatch( selectingLesson(info) )}
    }
}

// export default Lesson

export default (connect(mapStateToProps, mapDispatchToProps)(Lesson));