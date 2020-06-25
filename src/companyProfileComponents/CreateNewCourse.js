import React from 'react'
import {Form, Button, Grid} from 'semantic-ui-react'
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
            picture: "",
            individualContentCovered: "",
            contentCovered: [],
            numberOfContentCovered: [1],
            difficultyLevel: "",
            finished: false,
            wasSubmitted: false,
            finishedCourseInfo: false,
            clickedViewLessons: false,

            durationOptions: null,
            selectedDuration: null,

            difficultyOptions: null,
            selectedDifficulty: null,

            lessonsArray: []
        }
    }

    componentWillMount(){
        this.setState({wasSubmitted: false})
        console.log(this.state.wasSubmitted)

        // create your dropdown options here? you can do a setstate in here. 
        this.setState({ durationOptions: [
            { key: '0-3', text: '0-3 weeks', value: 1 },
            { key: '3-6', text: '3-6 weeks', value: 2 },
            { key: '6-9', text: '6-9 weeks', value: 3 },
            { key: '9-12', text: '9-12 weeks', value: 4 },
            ], 
            difficultyOptions: [
                { key: 'b', text: 'beginner', value: 1 },
                { key: 'i', text: 'intermediate', value: 2 },
                { key: 'a', text: 'advanced', value: 3 },
            ],
        })
    }

    onChangeInformation = (event) => {
        let individualContentCovered
        this.setState( { [event.target.id]: event.target.value } )

        if(event.target.innerText === '0-3 weeks'){
            this.setState({
                duration: event.target.innerText,
                selectedDuration: 1
            })
        }else if(event.target.innerText === '3-6 weeks'){
            this.setState({
                duration: event.target.innerText,
                selectedDuration: 2
            })
        }else if (event.target.innerText === '6-9 weeks'){
            this.setState({
                duration: event.target.innerText,
                selectedDuration: 3
            })
        }else if(event.target.innerText === '9-12 weeks'){
            this.setState({
                duration: event.target.innerText,
                selectedDuration: 4
            })
        }

        if(event.target.innerText === 'beginner'){
            this.setState({
                difficultyLevel: event.target.innerText,
                selectedDifficulty: 1
            })
        }else if(event.target.innerText === 'intermediate'){
            this.setState({
                difficultyLevel: event.target.innerText,
                selectedDifficulty: 2
            })
        }else if (event.target.innerText === 'advanced'){
            this.setState({
                difficultyLevel: event.target.innerText,
                selectedDifficulty: 3
            })
        }

        // if(event.target.id === "contentCovered"){
        //     individualContentCovered = event.target.value // this state changes whenever you type something
        //     // this issue is dealt with by having contentCovered state be updated only after you click more
        //     this.setState({individualContentCovered: individualContentCovered})
        // }
        if(event.target.id === "subject"){
            let forcedCapitalization = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) // in case user does not capitalize first letter
            this.setState({subject: forcedCapitalization})
        }
        
    }

    // addInputField = () => { // this function does not render last element of new array when clicking submit btn
    //     console.log("adding field")
        
    //     let newNumInput = [...this.state.numberOfContentCovered, 1]
    //     this.setState({numberOfContentCovered: newNumInput})
    //     let newContentCoveredArray
    //     // on add input field, add individualContentCovered to contentCovered array
    //     // debugger
    //     if(this.state.individualContentCovered === "" && this.state.contentCovered.length === 0){
    //         newContentCoveredArray = [...this.state.contentCovered, this.props.selectedCourse.course.content_covered[0]]
    //         this.setState({contentCovered: newContentCoveredArray})
    //     }else{
    //         newContentCoveredArray = [...this.state.contentCovered, this.state.individualContentCovered]
    //         this.setState({contentCovered: newContentCoveredArray})
    //     }

    //     this.setState({individualContentCovered: ""})
    // }
    
    filledOutCourseInfo = () => {
        this.setState({finishedCourseInfo: !this.state.finishedCourseInfo})
    }

    submit = () => {
        // this.setState({lessonArray: lessonArray})
        if(this.state.courseName === "" || this.state.courseDescription === "" || this.state.difficultyLevel === "" || this.state.price === "" || this.state.duration === "" || this.state.subject === "" || this.state.contentCovered === ""){
            alert("It appears that you have left at least one course field blank. Please ensure all required fields are filled in")
        }
        else if(this.state.lessonsArray.length === 0 && this.props.finalLesson.length === 0){ //|| this.props.finalLesson.length === 0){ // this.state.lessonArray.length === 0
            alert("You have not yet submitted any lessons")
        }
        else{
            this.setState({wasSubmitted: true})
            debugger
            this.setState({ lessonsArray: [...this.state.lessonsArray, this.props.finalLesson] }, () => {
                this.props.creatingNewCourse(this.state)
            })
        }
    }

    addLessonsToCourse = (lessonArray) => {
        this.setState({lessonsArray: [...this.state.lessonsArray, lessonArray]})
    }

    filledOutLessonInfo = () => {
        if(this.state.courseName === "" || this.state.courseDescription === "" || this.state.difficultyLevel === "" || this.state.price === "" || this.state.duration === "" || this.state.subject === "" || this.state.contentCovered === ""){
            alert("It appears that you have left at least one course field blank. Please ensure all required fields are filled in")
        }else{
            this.setState({finished: !this.state.finished})
        }
        // if(this.state.courseName === "" || this.state.courseDescription === "" || this.state.difficultyLevel === "" || this.state.price === "" || this.state.duration === "" || this.state.subject === "" || this.state.contentCovered === ""){
        //     alert("It appears that you have left at least one course field blank. Please ensure all required fields are filled in")
        // }else if(this.state.lessonsArray.length === 0){
        //     alert("A course must have lessons")
        // }else{
        //     this.setState({finished: !this.state.finished})
        // }
    }

    render(){
        // const durationOptions = [
        //     { key: '0-3', text: '0-3 weeks', value: 1 },
        //     { key: '3-6', text: '3-6 weeks', value: 2 },
        //     { key: '6-9', text: '6-9 weeks', value: 3 },
        //     { key: '9-12', text: '9-12 weeks', value: 4 },
        //   ]
          
        //   const difficultyOptions = [
        //     { key: 'b', text: 'beginner', value: 1 },
        //     { key: 'i', text: 'intermediate', value: 2 },
        //     { key: 'a', text: 'advanced', value: 3 },
        //   ]

          const redirectToProfile = this.state.wasSubmitted;
          if (redirectToProfile === true) {
              return <Redirect to="/company-profile" />
          }

        return (
            <div style={{marginLeft: 80, marginRight: 80, marginTop: 40}}>
                {this.state.finishedCourseInfo === false ? 
                // if false render course form. else render lesson form container
            <div>
                <h3>New Course Creation Form</h3>
                <Form>
                        <Form.Group widths='equal'>
                            <Form.Input fluid id="courseName" label='Course Name' placeholder='course name' defaultValue={this.state.courseName} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.TextArea fluid id="courseDescription" label='Course Description' placeholder='course description' defaultValue={this.state.courseDescription} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Select fluid id="duration" label='Duration' placeholder='duration' defaultValue={this.state.selectedDuration} onChange={this.onChangeInformation} required
                            fluid
                            options={this.state.durationOptions}
                            />
                            <Form.Select fluid id="difficultyLevel" label='Difficulty Level' placeholder='difficulty level' defaultValue={this.state.selectedDifficulty} onChange={this.onChangeInformation} required
                            fluid
                            options={this.state.difficultyOptions}
                            />
                            <Form.Input fluid id="subject" label='Subject' placeholder='subject' defaultValue={this.state.subject} onChange={this.onChangeInformation} required/>
                            <Form.Input fluid id="price" label='Price' type="number" placeholder='price' defaultValue={this.state.price} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input fluid id="picture" label='Picture' placeholder='upload picture url here (optional)' defaultValue={this.state.picture} onChange={this.onChangeInformation}/>
                        </Form.Group>
                        {this.state.numberOfContentCovered.map(input => { // this was originally needed as content covered was an array in the back end. I can likely refactor this
                        return (
                            <div>
                                {/* <Form.Group widths="equal">
                                    <Form.Input fluid id="contentCovered" label='Content Covered' placeholder='content covered' defaultValue={""} onChange={this.onChangeInformation} required/>
                                </Form.Group> */}
                                <Form.Group widths="equal">
                                    <Form.TextArea fluid id="contentCovered" label='Content Covered' placeholder='content covered' defaultValue={this.state.contentCovered} onChange={this.onChangeInformation} required/>
                                </Form.Group>
                            </div>
                        )}
                        )}
                            <br></br>  

                    </Form>
            </div>
            :
            null } 
            {this.state.finishedCourseInfo === false ? 
            <div>
                <div className="add-lessons">
                    <Button onClick={this.filledOutCourseInfo} type="button">Add Lessons</Button>
                </div>
            </div>
                : 
                <Form.Field onClick={this.filledOutCourseInfo} type="button" control={Button}>Back to Course Information</Form.Field>
            }
            <div>
                <CreateNewLessonContainer finishedCourseInfo={this.state.finishedCourseInfo} addLessonsToCourse={this.addLessonsToCourse}/>
                {/* <Form.Field onClick={this.filledOutCourseInfo} type="button" control={Button}>Back to Course Information</Form.Field> */}
            </div>
                    <div className="submit-information">
                        <Button onClick={this.submit}>Submit Information</Button>
                    </div>
        </div>
        )
        // ternary for was submitted starts at top. if false renders form. else renders success message
    }
}

const mapStateToProps = (state) => {
    console.log(state.finalLesson)
    console.log("added", state.addedNewLesson)
    return {
        newLesson: state.addedNewLesson,
        finalLesson: state.finalLesson
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      creatingNewCourse: (info) => {dispatch( creatingNewCourse(info) )}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewCourse)

// export default CreateNewCourse