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
            individualLessonArray: [],
        }
    }

    componentWillMount(){
        this.setState({index: this.props.index})
    }

    componentDidUpdate(){
        this.props.parentOnChangeLessonInformation(this.state)
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
            this.props.addToNumLessons(this.state)
        }
    }

    render(){
        return (
            <Form>
                <Form.Input fluid id="lessonName" label='Lesson Name' placeholder='lesson name' defaultValue={this.state.lessonName} onChange={(event) => this.onChangeLessonInformation(event)} required/>
                <Form.Input fluid id="video" label="Video Embed" placeholder='embed your video here' defaultValue={this.state.video} onChange={(event) => this.onChangeLessonInformation(event)}/>
                <Form.Field fluid control={TextArea} type="text" id="lessonText" label="Lesson Text" placeholder="lesson text" defaultValue={this.state.lessonText} onChange={(event) => this.onChangeLessonInformation(event)} required/>
                <Button onClick={this.addNextLesson}>Add new lesson</Button>
            {this.props.numberOfLessons.length < 2 ? 
            null 
            :
            <div>
                <br></br>
            </div>
            }
            </Form>
        )
    }
}

export default connect(null, null)(NewLesson)
