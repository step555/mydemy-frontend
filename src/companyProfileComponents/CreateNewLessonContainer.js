import React from 'react'
import {connect} from 'react-redux'
import {Form, TextArea, Button} from 'semantic-ui-react'
import NewLesson from './NewLesson'
// import {} from '../redux/actions'

class CreateNewLessonContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            numberOfLessons: [1],
            lessonsArray: [],
            updatedLessonArray: []
        }
    }

    componentDidUpdate(){
        this.props.addLessonsArrayToCourseState(this.state.lessonsArray)
    }

    parentOnChangeLessonInformation = (lesson) => {
        let updatedLessonsArray = [...this.state.lessonsArray]
        updatedLessonsArray.length = this.state.numberOfLessons.length
        for(let i = 0; i < this.state.numberOfLessons.length; i++){
            if(lesson.index === i){
                updatedLessonsArray[i] = [lesson.lessonName, lesson.lessonText, lesson.video]
                if(updatedLessonsArray[i].lessonName !== "" && updatedLessonsArray[i].lessonText !== ""){
                    this.state.lessonsArray[i] = updatedLessonsArray[i]
                    this.setState({
                        lessonsArray: [...this.state.lessonsArray],
                        updatedLessonsArray: [updatedLessonsArray[i]]
                    })
                }
            }
        }
    }
   
    addToNumLessons = (lesson) => {
        let newNumLessons = [...this.state.numberOfLessons, 1]
        this.setState({numberOfLessons: newNumLessons})
    }

    render(){
        return (
            <div>
                {this.props.finishedCourseInfo === true ?
                <div>
                    <h1>Create Your Lessons Here</h1>
                    {this.state.numberOfLessons.map((input, index) => {
                        return (
                        <div>
                            <NewLesson index={index} parentOnChangeLessonInformation={this.parentOnChangeLessonInformation} addToNumLessons={this.addToNumLessons} />
                        </div>
                        )
                    })}
                    <br></br>
                    {/* <Button onClick={this.addNextLesson}>Add more lessons</Button> */}
                </div>
                : null 
                }
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {

//     };
// };

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(null, mapDispatchToProps)(CreateNewLessonContainer)