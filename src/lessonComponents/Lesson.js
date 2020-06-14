import React from 'react'
import {Connect} from 'react-redux'

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
    }

    render(){
        console.log("lesson props", this.props)
        return(
            <div>
                <p>got to individual lesson</p>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         selectedLesson: state.lesson,
//         lessons: state.lessons
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     console.log("mapDispatchToProps")
//     return {
//         selectingCourseLessons: (info) => {dispatch( selectingCourseLessons(info) )}
//     }
// }

export default Lesson