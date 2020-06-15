import React from 'react'
import {connect} from 'react-redux'
import {Form, TextArea, Button} from 'semantic-ui-react'
import NewLesson from './NewLesson'
import {addLessonsArrayToReduxActions} from '../redux/actions'

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

    addNextLesson = () => {
        
        let lessonName = this.state.lessonName
        let updatedLessonsArray = [...this.state.lessonsArray, lessonName, this.state.lessonText, this.state.video]
        this.setState({

            lessonsArray: updatedLessonsArray
        },() => {
            if( this.state.lessonName.includes("") || this.state.lessonText.includes("") ){
                alert("All required lesson fields must be filled in")
            }else{
            // this.props.addLessonsArrayToReduxActions(this.state.lessonsArray)
            let newNumLessons = [...this.state.numberOfLessons, 1]
            this.setState({numberOfLessons: newNumLessons})
            this.props.submit(this.state.lessonsArray)
            }
        })
        this.setState({
            lessonName: "",
            lessonText: ""
        })
    }

    // done adding lessons? Click here. send to redux which takes in lessons array as param

    onChangeLessonInformation = (lessonInformation) => { // lessonInformation event from NewLesson
        // debugger
        this.setState({[lessonInformation.target.id]: lessonInformation.target.value})
        // this.props.submit(this.state.lessonsArray)
    }

    render(){
        return (
            <div>
                <h1>Lesson Container</h1>
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
                <Button onClick={this.addNextLesson}>Add Another Lesson</Button>
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
        addLessonsArrayToReduxActions: (lessonsArray) => {dispatch( addLessonsArrayToReduxActions(lessonsArray) )}
    }
}

export default connect(null, mapDispatchToProps)(CreateNewLessonContainer)