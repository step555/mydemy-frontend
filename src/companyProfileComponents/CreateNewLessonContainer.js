import React from 'react'
import {connect} from 'react-redux'
import {Form, TextArea, Button} from 'semantic-ui-react'
import NewLesson from './NewLesson'
import {addFinalLessonToLessonsArray} from '../redux/actions'

class CreateNewLessonContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            numberOfLessons: [1],
            // lessonName: "",
            // lessonText: "",
            // video: "",
            lessonsArray: [],
            updatedLessonArray: []
        }
    }

    parentOnChangeLessonInformation = (lesson) => {
        // debugger
        let updatedLessonsArray = [...this.state.lessonsArray]
        updatedLessonsArray.length = this.state.numberOfLessons.length
        for(let i = 0; i < this.state.numberOfLessons.length; i++){
            // debugger
            if(lesson.index === i){
                updatedLessonsArray[i] = [lesson.lessonName, lesson.lessonText, lesson.video]
                // updatedLessonsArray.push(lesson)
                if(updatedLessonsArray[i].lessonName !== "" && updatedLessonsArray[i].lessonText !== ""){
                    this.state.lessonsArray[i] = updatedLessonsArray[i]
                    this.setState({
                        // lessonsArray: [...this.state.lessonsArray, updatedLessonsArray[i]],
                        lessonsArray: [...this.state.lessonsArray],
                        updatedLessonsArray: [updatedLessonsArray[i]]
                    })
                    // debugger
                }
            }
        }
        // this.setState({lessonsArray: updatedLessonsArray})
    }

    // addNextLesson = () => {
    //     // grab last element from array and do these checks?
    //     if(this.state.lessonsArray.length > 0){
    //         debugger
    //         if(this.state.video.length > 0 && !this.state.video.includes('youtube.com/embed')){ // https://www.youtube.com/embed/nghuHvKLhJA
    //             alert("Please use a valid youtube embed")
    //         }
    //         else if(this.state.lessonName.length === 0 || this.state.lessonText.length === 0){
    //             alert("All required lesson fields must be filled in")
    //         }else{
    //             let newNumLessons = [...this.state.numberOfLessons, 1]
    //             this.setState({numberOfLessons: newNumLessons})

    //             let lessonName = this.state.lessonName // prevents bug with updatedLessonArray array
    //             let updatedLessonsArray = [...this.state.lessonsArray, lessonName, this.state.lessonText, this.state.video]
    //             this.setState({
    //                 lessonsArray: updatedLessonsArray
    //             }, () => {
    //                 this.props.addLessonsToCourse(this.state.lessonsArray)
    //                 this.setState({
    //                     lessonName: "",
    //                     lessonText: "",
    //                     video: "",
    //                     lessonsArray: []
    //                 })  
    //             })
    //         }   
    //     }else{
    //         alert("All required lesson fields must be filled in")
    //     }
    // }
   
    addToNumLessons = (lesson) => {
        let newNumLessons = [...this.state.numberOfLessons, 1]
        this.setState({numberOfLessons: newNumLessons}, () => {
            // this.addingToLessonsArray(lesson)
        })
    }
    
    // addingToLessonsArray = (lesson) => {
    //     const t = this
    //     debugger
    //     let updatedLessonsArray = [...this.state.lessonsArray, [lesson.lessonName, lesson.lessonText, lesson.video]]
    //     this.setState({
    //         lessonsArray: updatedLessonsArray // from here the lessons array needs to travel to createNewCourse
    //     }, () => console.log())//function here to bring this state to createnewcourse...)
    // }

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
//       company: state.company,
//       totalRevenue: state.totalRevenue,
//       courses: state.courses,
//     //   purchases: state.purchases // does not currently exist in store
//     };
// };

const mapDispatchToProps = (dispatch) => {
    return {
        addFinalLessonToLessonsArray: (lessonName, lessonText, video) => {dispatch( addFinalLessonToLessonsArray(lessonName, lessonText, video) )}
    }
}

export default connect(null, mapDispatchToProps)(CreateNewLessonContainer)