// import React from 'react'
// import {Form, TextArea, Button} from 'semantic-ui-react'

// const NewLesson = (props) => {

//     return (
//         <Form>
//         {/* <Form.Group widths='equal'> */}
//             <Form.Input fluid id="lessonName" label='Lesson Name' placeholder='lesson name' defaultValue={""} onChange={(event) => props.onChangeLessonInformation(event)} required/>
//         {/* </Form.Group> */}
//         {/* <Form.Group widths='equal'> */}
//             <Form.Input fluid id="video" label="Video Embed" placeholder='embed your video here' defaultValue={""} onChange={(event) => props.onChangeLessonInformation(event)}/>
//             <Form.Field fluid control={TextArea} type="text" id="lessonText" label="Lesson Text" placeholder="lesson text" defaultValue={""} onChange={(event) => props.onChangeLessonInformation(event)} required/>
//         {/* </Form.Group> */}
//         </Form>
//     )
    
// }

// export default NewLesson

import React from 'react'
import {Form, TextArea, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addFinalLessonToLessonsArray} from '../redux/actions'

class NewLesson extends React.Component{
    constructor(){
        super()
        this.state = {
            lessonName: "",
            lessonText: "",
            video: "",
            index: null
        }
    }

    componentWillMount(){
        this.setState({index: this.props.index})
    }

    componentDidUpdate(){
        this.props.lessonIndexContent(this.state)
    }

    onChangeLessonInformation = (lessonInformation) => { // lessonInformation event from NewLesson
        this.setState({[lessonInformation.target.id]: lessonInformation.target.value},() => {
            this.props.addFinalLessonToLessonsArray(this.state.lessonName, this.state.lessonText, this.state.video)
        })
    }

    render(){
        return (
            <Form>
            {/* <Form.Group widths='equal'> */}
                <Form.Input fluid id="lessonName" label='Lesson Name' placeholder='lesson name' defaultValue={this.state.lessonName} onChange={(event) => this.onChangeLessonInformation(event)} required/>
            {/* </Form.Group> */}
            {/* <Form.Group widths='equal'> */}
                <Form.Input fluid id="video" label="Video Embed" placeholder='embed your video here' defaultValue={this.state.video} onChange={(event) => this.onChangeLessonInformation(event)}/>
                <Form.Field fluid control={TextArea} type="text" id="lessonText" label="Lesson Text" placeholder="lesson text" defaultValue={this.state.lessonText} onChange={(event) => this.onChangeLessonInformation(event)} required/>
            {/* </Form.Group> */}
            </Form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFinalLessonToLessonsArray: (lessonName, lessonText, video) => {dispatch( addFinalLessonToLessonsArray(lessonName, lessonText, video) )}
    }
}

export default connect(null, mapDispatchToProps)(NewLesson)