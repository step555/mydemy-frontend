import React from 'react'
import {connect} from 'react-redux'
import {Form, TextArea, Button} from 'semantic-ui-react'
import NewLesson from './NewLesson'

class CreateNewLessonContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            numberOfLessons: [1],
            lessonName: "",
            lessonText: "",
            video: ""
        }
    }

    addNextLesson = () => {
        let newNumLessons = [...this.state.numberOfLessons, 1]
        this.setState({numberOfLessons: newNumLessons})
    }

    onChangeLessonInformation = () => {

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

// const mapDispatchToProps = (dispatch) => {
//     return {
//       creatingNewLesson: (info) => {dispatch( creatingNewCourse(info) )}
//     }
// }

export default connect(null, null)(CreateNewLessonContainer)