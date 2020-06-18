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
            lessonName: "",
            lessonText: "",
            video: "",
            lessonsArray: []
        }
    }
    // whenver add next lesson is clicked, reset string states. X
    // send string states to redux store and have it replace old string states
    // when clicking submit, add string states to lessons arrays
    addNextLesson = () => {
        
        let lessonName = this.state.lessonName // prevents bug with updatedLessonArray array
        let updatedLessonsArray = [...this.state.lessonsArray, lessonName, this.state.lessonText, this.state.video]
        this.setState({

            lessonsArray: updatedLessonsArray
        },() => {
            if( this.state.video.length > 0 && !this.state.video.includes('youtube.com/embed') ){ // https://www.youtube.com/embed/nghuHvKLhJA
                alert("Please use a valid youtube embed")
            }else{
            if( this.state.lessonName.length === 0 || this.state.lessonText.length === 0 ){
                alert("All required lesson fields must be filled in")
            }else{
            let newNumLessons = [...this.state.numberOfLessons, 1]
            this.setState({numberOfLessons: newNumLessons})
            
            this.props.addLessonsToCourse(this.state.lessonsArray)
            this.setState({
                lessonName: "",
                lessonText: "",
                video: "",
                lessonsArray: []
            })
            // alert("Lesson has been submitted. You may now create another lesson below.")
            }
        }})     
    }

    // done adding lessons? Click here. send to redux which takes in lessons array as param

    onChangeLessonInformation = (lessonInformation) => { // lessonInformation event from NewLesson
        // debugger
        // this.setState({[lessonInformation.target.id]: lessonInformation.target.value})
        this.setState({[lessonInformation.target.id]: lessonInformation.target.value},() => {
            this.props.addFinalLessonToLessonsArray(this.state.lessonName, this.state.lessonText, this.state.video)
        })
        // this.props.submit(this.state.lessonsArray)
    }

    render(){
        return (
            <div>
                <h1>Create Your Lessons Here</h1>
                {this.state.numberOfLessons.map(input => {
                    return (
                    <div>
                        <NewLesson onChangeLessonInformation={this.onChangeLessonInformation}/>
                        {/* <Form>
                            <Form.Input fluid id="lessonName" label='Lesson Name' placeholder='lesson name' defaultValue={""} onChange={this.onChangeLessonInformation} required/>
                            <Form.Input fluid id="video" label="Video Embed" placeholder='embed your video here' defaultValue={""} onChange={this.onChangeLessonInformation}/>
                            <Form.Field fluid control={TextArea} type="text" id="lessonText" label="Lesson Text" placeholder="lesson text" defaultValue={""} onChange={this.onChangeLessonInformation} required/>
                        </Form> */}
                    </div>
                    )
                })}
                <br></br>
                <Button onClick={this.addNextLesson}>Add more lessons</Button>
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