import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {creatingNewCourse} from '../redux/actions'

class CreateNewCourse extends React.Component {
    constructor(){
        super()
        this.state = {
            courseName: "",
            courseDescription: "",
            price: "",
            duration: "",
            subject: "",
            videoPreview: "",
            picture: "",
            individualContentCovered: "",
            contentCovered: null,
            numberOfContentCovered: [1]
        }
    }

    onChangeInformation = (event) => {
        console.log("event", event.target.value)
        let cDuration
        const regexforNumericInputOnly = /^[0-9\b]+$/;
        let individualContentCovered
        if(event.target.id !== "contentCovered"){
            this.setState( { [event.target.id]: event.target.value } )
        }

        if(event.target.innerText === '1-3 weeks'){
        //     cDuration = event.target.innerText.replace("weeks", "").replace(" ", "")
            this.setState({duration: event.target.innerText})
        }else if(event.target.innerText === '3-6 weeks'){
        //     cDuration = event.target.innerText.replace("weeks", "").replace(" ", "")
            this.setState({duration: event.target.innerText})
        }else if (event.target.innerText === '6-9 weeks'){
        //     cDuration = event.target.innerText.replace("weeks", "").replace(" ", "")
            this.setState({duration: event.target.innerText})
        }else if(event.target.innerText === '9-12 weeks'){
        //     cDuration = event.target.innerText.replace("weeks", "").replace(" ", "")
            this.setState({duration: event.target.innerText})
        }

        if(event.target.id === "contentCovered"){
            individualContentCovered = event.target.value // this state changes whenever you type something
            // this issue is dealt with by having contentCovered state be updated only after you click more
            this.setState({individualContentCovered: individualContentCovered})
        }
        if(event.target.id === "subject"){
            let forcedCapitalization = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) // in case user does not capitalize first letter
            this.setState({subject: forcedCapitalization})
        }
    }
    
    addInputField = () => { // this function does not render last element of new array when clicking submit btn
        let newNumInput = [...this.state.numberOfContentCovered, 1]
        this.setState({numberOfContentCovered: newNumInput})
        // on add input field, add individualContentCovered to contentCovered array
        let newContentCoveredArray = [...this.state.contentCovered, this.state.individualContentCovered]
        this.setState({contentCovered: newContentCoveredArray})
    }
    
    edit = () => { 
        // below lines of code are to avoid content not interable error for content covered array
        if(this.state.contentCovered === null){
            return null
        }else{
            // adds final index to contentCovered array
        let newContentCoveredArray = [...this.state.contentCovered, this.state.individualContentCovered]
 
        // this.setState({
        //     contentCovered: newContentCoveredArray 
        // },() => {creatingNewCourse(this.state); }) // calls this function only AFTER state has been updated
        this.setState({
            contentCovered: newContentCoveredArray 
        },() => {
            if(this.state.courseName !== "" && this.state.courseDescription !== "" && this.state.price !== "" && this.state.duration !== "" && this.state.subject !== "" && this.state.contentCovered !== null){
                creatingNewCourse(this.state)}; }) // calls this function only AFTER state has been updated
            }
    }

    render(){
        const durationOptions = [
            // {key: 'duration', text: 'duration', value: 0},
            { key: '1-3', text: '1-3 weeks', value: 1 },
            { key: '3-6', text: '3-6 weeks', value: 2 },
            { key: '6-9', text: '6-9 weeks', value: 3 },
            { key: '9-12', text: '9-12 weeks', value: 4 },
          ]
        return (
            <div>
                <h3>New Course Creation Form</h3>
                <Form>
                        <Form.Group widths='equal'>
                            <Form.Input fluid id="courseName" label='Course Name' placeholder='course name' defaultValue={""} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.TextArea fluid id="courseDescription" label='Course Description' placeholder='course description' defaultValue={""} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input fluid id="price" label='Price' type="number" placeholder='price' defaultValue={""} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Select fluid id="duration" label='Duration' placeholder='duration' defaultValue={""} onChange={this.onChangeInformation} required
                            fluid
                            options={durationOptions}
                            />
                            <Form.Input fluid id="subject" label='Subject' placeholder='subject' defaultValue={""} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input fluid id="videoPreview" label='Video Preview' placeholder='upload video preview url here (optional)' defaultValue={""} onChange={this.onChangeInformation}/>
                        {/* </Form.Group> */}
                        {/* <Form.Group widths="equal"> */}
                            <Form.Input fluid id="picture" label='Picture' placeholder='upload picture url here (optional)' defaultValue={""} onChange={this.onChangeInformation}/>
                        </Form.Group>
                        {this.state.numberOfContentCovered.map(input => {
                        console.log(input)
                        return (
                            <div>
                                <Form.Group widths="equal">
                                    <Form.Input fluid id="contentCovered" label='Content Covered' placeholder='content covered' defaultValue={""} onChange={this.onChangeInformation} required/>
                                </Form.Group>
                            </div>
                        )}
                        )}
                            <button onClick={this.addInputField}>More</button>
                            <br></br>
                        <Form.Field onClick={() => this.edit(this.props)} control={Button}>Submit</Form.Field>
                    </Form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps")
    return {
      creatingNewCourse: (info) => {dispatch( creatingNewCourse(info) )}
    }
}

export default connect(null, mapDispatchToProps)(CreateNewCourse)

// export default CreateNewCourse