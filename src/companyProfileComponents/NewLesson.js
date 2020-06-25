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

class NewLesson extends React.Component{
    constructor(){
        super()
        this.state = {
            lessonName: "",
            lessonText: "",
            video: "",
            index: null,
            clickedAddLesson: false,
            individualLessonArray: [] // put all lessons here until submit?
        }
    }

    componentWillMount(){
        // this.setState({clickedAddLesson: false})
        this.setState({index: this.props.index})
    }

    componentDidUpdate(){
        console.log("updated")
        // this.setState({clickedAddLesson: false}) // this causes an error. don't try it
        // if(this.state.individualLessonArray.length > 0){
            this.props.parentOnChangeLessonInformation(this.state)
        // }
    }

    onChangeLessonInformation = (lessonInformation) => { 
        this.setState({[lessonInformation.target.id]: lessonInformation.target.value},() => { // set state of individual items
            this.setState({individualLessonArray: [this.state.lessonName, this.state.lessonText, this.state.video]},() => { // add items to array
            })
        })
    }

    addNextLesson = () => { 
        if(this.state.video.length > 0 && !this.state.video.includes('youtube.com/embed')){ // https://www.youtube.com/embed/nghuHvKLhJA
            alert("Please use a valid youtube embed")
        }
        else if(this.state.lessonName.length === 0 || this.state.lessonText.length === 0){
            alert("All required lesson fields must be filled in")
        }else{
            this.setState({clickedAddLesson: !this.state.clickedAddLesson})

            this.props.addToNumLessons(this.state)
        }
    }

    deleteCurrentLesson = () => {
        this.setState({individualLessonArray: []})
        this.props.decreaseNumLessons(this.state.index, this.state.individualLessonArray) // delete parent array at this index
        this.setState({clickedAddLesson: false})
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
            {this.state.clickedAddLesson === false ? 
                <Button onClick={this.addNextLesson}>Add new lesson</Button>
            : 
            <div>
                <Button onClick={this.deleteCurrentLesson}>Delete</Button>
                <br></br>
            </div>
            }
            </Form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // addFinalLessonToLessonsArray: (lessonName, lessonText, video) => {dispatch( addFinalLessonToLessonsArray(lessonName, lessonText, video) )}
    }
}

export default connect(null, mapDispatchToProps)(NewLesson)


// each lesson has it's own next lesson button. clicking the button adds to numLessonsArray and replaces add button 
// with delete button

//on change information, i add to an existing array element

// every time I click add new lesson I send a request to redux store to store my latest array element.
// on submit I grab the last lesson that was filled out and add it to the end of the array