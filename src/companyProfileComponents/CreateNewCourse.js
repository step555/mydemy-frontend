import React from 'react'
import {Form, Button} from 'semantic-ui-react'
// import {connect} from 'react-redux'

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
            contentCovered: [],
            numberOfContentCovered: [1]
        }
    }

    onChangeInformation = (event) => {
        console.log("event", event.target.value)
        let cDuration
        let newContentCoveredIndex
        let updatedContentCoveredArr
        let individualContentCovered
        this.setState( { [event.target.id]: event.target.value } )

        if(event.target.innerText === '1-3 weeks'){
            cDuration = event.target.innerText.replace("weeks", "").replace(" ", "")
            this.setState({duration: cDuration})
        }else if(event.target.innerText === '3-6 weeks'){
            cDuration = event.target.innerText.replace("weeks", "").replace(" ", "")
            this.setState({duration: cDuration})
        }else if (event.target.innerText === '6-9 weeks'){
            cDuration = event.target.innerText.replace("weeks", "").replace(" ", "")
            this.setState({duration: cDuration})
        }else if(event.target.innerText === '9-12 weeks'){
            cDuration = event.target.innerText.replace("weeks", "").replace(" ", "")
            this.setState({duration: cDuration})
        }
        if(event.target.id === "content-covered"){
            individualContentCovered = event.target.value
            // grab last element from this array
            // updatedContentCoveredArr = [...this.state.contentCovered, newContentCoveredIndex]
            // this.setState({contentCovered: updatedContentCoveredArr})
            // updatedContentCoveredArr = [...this.state.contentCovered, newContentCoveredIndex]
            this.setState({individualContentCovered: individualContentCovered})
        }
    }
    
    addInputField = () => {
        let newNumInput = [...this.state.numberOfContentCovered, 1]
        this.setState({numberOfContentCovered: newNumInput})
        // on add input field, add individualContentCovered to contentCovered array
        let newContentCoveredArray = [...this.state.contentCovered, this.state.individualContentCovered]
        this.setState({contentCovered: newContentCoveredArray})
    }
    
    edit = () => {

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
                            <Form.Input fluid id="course-name" label='Course Name' placeholder='course name' defaultValue={""} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.TextArea fluid id="course-description" label='Course Description' placeholder='course description' defaultValue={""} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input fluid id="price" label='Price' placeholder='price' defaultValue={""} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Select fluid id="duration" label='Duration' placeholder='duration' defaultValue={""} onChange={this.onChangeInformation} required
                            fluid
                            options={durationOptions}
                            />
                            <Form.Input fluid id="subject" label='Subject' placeholder='subject' defaultValue={""} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input fluid id="video-preview" label='Video Preview' placeholder='upload video preview url here (optional)' defaultValue={""} onChange={this.onChangeInformation}/>
                        {/* </Form.Group> */}
                        {/* <Form.Group widths="equal"> */}
                            <Form.Input fluid id="picture" label='Picture' placeholder='upload picture url here (optional)' defaultValue={""} onChange={this.onChangeInformation}/>
                        </Form.Group>
                        {this.state.numberOfContentCovered.map(input => {
                        console.log(input)
                        return (
                            <div>
                                <Form.Group widths="equal">
                                    <Form.Input fluid id="content-covered" label='Content Covered' placeholder='content covered' defaultValue={""} onChange={this.onChangeInformation} required/>
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

// const mapDispatchToProps = (dispatch) => {
//     console.log("mapDispatchToProps")
//     return {
//       creatingNewCourse: (info) => {dispatch( creatingNewCourse(info) )}
//     }
// }

// export default connect(null, mapDispatchToProps)(CreateNewCourse)

export default CreateNewCourse