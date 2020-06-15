import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {creatingNewCourse} from '../redux/actions'
import {Link, Redirect} from 'react-router-dom'
import CreateNewLessonContainer from './CreateNewLessonContainer'

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
            numberOfContentCovered: [1],
            difficultyLevel: "",
            finished: false,
            wasSubmitted: false,
            finishedCourseInfo: false,
        }
    }

    componentWillMount(){
        this.setState({wasSubmitted: false})
        console.log(this.state.wasSubmitted)
    }

    onChangeInformation = (event) => {
        let individualContentCovered
        if(event.target.id !== "contentCovered"){
            this.setState( { [event.target.id]: event.target.value } )
        }

        if(event.target.innerText === '0-3 weeks'){
            this.setState({duration: event.target.innerText})
        }else if(event.target.innerText === '3-6 weeks'){
            this.setState({duration: event.target.innerText})
        }else if (event.target.innerText === '6-9 weeks'){
            this.setState({duration: event.target.innerText})
        }else if(event.target.innerText === '9-12 weeks'){
            this.setState({duration: event.target.innerText})
        }

        if(event.target.innerText === 'beginner'){
            this.setState({difficultyLevel: event.target.innerText})
        }else if(event.target.innerText === 'intermediate'){
            this.setState({difficultyLevel: event.target.innerText})
        }else if (event.target.innerText === 'advanced'){
            this.setState({difficultyLevel: event.target.innerText})
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
        console.log("adding field")
        
        let newNumInput = [...this.state.numberOfContentCovered, 1]
        this.setState({numberOfContentCovered: newNumInput})
        let newContentCoveredArray
        // on add input field, add individualContentCovered to contentCovered array
        if(this.state.individualContentCovered === "" && this.state.contentCovered.length === 0){
            // debugger
            newContentCoveredArray = [...this.state.contentCovered, this.props.selectedCourse.course.content_covered[0]]
            this.setState({contentCovered: newContentCoveredArray})
        }else{
            newContentCoveredArray = [...this.state.contentCovered, this.state.individualContentCovered]
            this.setState({contentCovered: newContentCoveredArray})
        }

        this.setState({individualContentCovered: ""})
    }
    
    edit = () => { 
        // below lines of code are to avoid content not interable error for content covered array
            // adds final index to contentCovered array
        let newContentCoveredArray = [...this.state.contentCovered, this.state.individualContentCovered]
 
        this.setState({
            contentCovered: newContentCoveredArray 
            },() => {
                console.log("array has been updated")
                }
                // calls this function only AFTER state has been updated
            )
            if(this.state.contentCovered.length === 0){
                this.setState({contentCovered: this.state.individualContentCovered})
            }
            this.setState({finished: !this.state.finished})
    }

    filledOutCourseInfo = () => {
        this.setState({finishedCourseInfo: !this.state.finishedCourseInfo})
    }

    submit = () => {
        this.setState({wasSubmitted: true})
        this.props.creatingNewCourse(this.state)
    }

    filledOutLessonInfo = () => {

    }

    render(){
        const durationOptions = [
            { key: '0-3', text: '0-3 weeks', value: 1 },
            { key: '3-6', text: '3-6 weeks', value: 2 },
            { key: '6-9', text: '6-9 weeks', value: 3 },
            { key: '9-12', text: '9-12 weeks', value: 4 },
          ]
          
          const difficultyOptions  =[
            { key: 'b', text: 'beginner', value: 1 },
            { key: 'i', text: 'intermediate', value: 2 },
            { key: 'a', text: 'advanced', value: 3 },
          ]

          const redirectToProfile = this.state.wasSubmitted;
          if (redirectToProfile === true) {
              return <Redirect to="/company-profile" />
          }

        return (
            <div>
                {this.state.finishedCourseInfo === false ? 
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
                            <Form.Select fluid id="duration" label='Duration' placeholder='duration' defaultValue={""} onChange={this.onChangeInformation} required
                            fluid
                            options={durationOptions}
                            />
                            <Form.Select fluid id="dificultyLevel" label='Difficulty Level' placeholder='difficulty level' defaultValue={""} onChange={this.onChangeInformation} required
                            fluid
                            options={difficultyOptions}
                            />
                            <Form.Input fluid id="subject" label='Subject' placeholder='subject' defaultValue={""} onChange={this.onChangeInformation} required/>
                            <Form.Input fluid id="price" label='Price' type="number" placeholder='price' defaultValue={""} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input fluid id="videoPreview" label='Video Preview' placeholder='upload video preview url here (optional)' defaultValue={""} onChange={this.onChangeInformation}/>
                            <Form.Input fluid id="picture" label='Picture' placeholder='upload picture url here (optional)' defaultValue={""} onChange={this.onChangeInformation}/>
                        </Form.Group>
                        {this.state.numberOfContentCovered.map(input => {
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
                        {this.state.finished === true ? 
                        <div>
                            <p>Please review this information before submission. THIS ACTION IS FINAL AND CANNOT BE UNDONE</p>
                            <Form.Field onClick={this.filledOutCourseInfo} control={Button}>Confirm Submission</Form.Field>
                        </div>
                            : 
                            <Form.Field onClick={this.edit} control={Button}>Done</Form.Field>
                        }
                    </Form>
            </div>
            :
            <h2><CreateNewLessonContainer/></h2>
            } 




                {this.state.finished === true ? 
                    <div>
                        <p>Please review this information before submission. THIS ACTION IS FINAL AND CANNOT BE UNDONE</p>
                        <Form.Field onClick={this.submit} control={Button}>Confirm Submission</Form.Field>
                    </div>
                        : 
                        <Form.Field onClick={this.filledOutLessonInfo} control={Button}>Submit</Form.Field>
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      creatingNewCourse: (info) => {dispatch( creatingNewCourse(info) )}
    }
}

export default connect(null, mapDispatchToProps)(CreateNewCourse)

// export default CreateNewCourse