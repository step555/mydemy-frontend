import React from 'react'
import {Form, Button, Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {selectingCourse, editingCourse} from '../redux/actions'

class ViewEditCourse extends React.Component{
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
            numberOfContentCovered: [],
            difficultyLevel: "",
            finished: false,
            wasSubmitted: false,
            courseId: ""
        }
    }

    // componentDidMount(){
    componentWillMount(){
        // this.props.gettingCompanyProfileFetch()
        this.setState({
            finished: false,
            submitted: false   
        })
        let courseId = parseInt(this.props.match.params.courseId)
        this.props.selectingCourse(courseId)

       
    }

    componentDidMount(){
        console.log("component mounted", this.props)
        // this.setState({ courseName: this.props.selectedCourse.course.name })
        // this.setState({ 
        //     courseName: this.props.selectedCourse.course.name,
        //     courseDescription: this.props.selectedCourse.course.text_preview
        // })
    }

    addInputField = () => { // this function does not render last element of new array when clicking submit btn
        console.log("adding field")
        
        let newNumInput = [...this.state.numberOfContentCovered, 1]
        this.setState({numberOfContentCovered: newNumInput})
        // on add input field, add individualContentCovered to contentCovered array
        let newContentCoveredArray
        if(this.state.individualContentCovered === "" && this.state.contentCovered.length === 0){
            newContentCoveredArray = [...this.state.contentCovered, this.props.selectedCourse.course.content_covered[0]]
            this.setState({contentCovered: newContentCoveredArray})
        }else{
            newContentCoveredArray = [...this.state.contentCovered, this.state.individualContentCovered]
            this.setState({contentCovered: newContentCoveredArray})
        }
    }

    onChangeInformation = (event) => {
        let individualContentCovered
        if(event.target.id !== "contentCovered"){
            this.setState( { [event.target.id]: event.target.value } )
        }

        if(event.target.innerText === '1-3 weeks'){
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

    edit = () => { 
        // below lines of code are to avoid content not interable error for content covered array
            // adds final index to contentCovered array
        let newContentCoveredArray = [...this.state.contentCovered, this.state.individualContentCovered]
 
        this.setState({
            contentCovered: newContentCoveredArray 
            },() => {
            // if(this.state.courseName !== "" && this.state.courseDescription !== "" && this.state.price !== "" && this.state.duration !== "" && this.state.subject !== "" && this.state.contentCovered.length !== 0){
                // creatingNewCourse(this.state)
                console.log("array has been updated")
                }
                // calls this function only AFTER state has been updated
            )

        if(this.state.contentCovered.length === 0){
            this.setState({contentCovered: this.state.individualContentCovered})
        }
        this.setState({finished: !this.state.finished})
        if(this.state.courseName === ""){
            this.setState({courseName: this.props.selectedCourse.course.name})
        }
        if(this.state.courseDescription === ""){
            this.setState({courseDescription: this.props.selectedCourse.course.text_preview})
        }
        if(this.state.price === ""){
            this.setState({price: this.props.selectedCourse.course.price})
        }
        if(this.state.duration === ""){
            this.setState({duration: this.props.selectedCourse.course.duration})
        }
        if(this.state.subject === ""){
            this.setState({subject: this.props.selectedCourse.course.subject})
        }
        if(this.state.video_preview === ""){
            this.setState({videoPreview: this.props.selectedCourse.course.video_preview})
        }
        if(this.state.picture === ""){
            this.setState({picture: this.props.selectedCourse.course.picture})
        }
        if(this.state.contentCovered.length === 0){
            this.setState({contentCovered: this.props.selectedCourse.course.content_covered})
        }
        if(this.state.difficultyLevel === ""){
            this.setState({difficultyLevel: this.props.selectedCourse.course.difficulty_level})
        }
        this.setState({courseId: this.props.selectedCourse.course.id})
    }

    submit = () => {
        // if(this.state.courseName !== "" && this.state.courseDescription !== "" && this.state.price !== "" && this.state.duration !== "" && this.state.subject !== "" && this.state.contentCovered.length !== 0){
        this.setState({wasSubmitted: true})
        this.props.editingCourse(this.state, this.props.selectedCourse.course.id)
    }

    addingContentToState = (content) => {
        console.log("FUNC")
        this.setState({ contentCovered: [...this.state.contentCovered, content] })
    }

    render(){
        
        const durationOptions = [
            { key: '1-3', text: '1-3 weeks', value: 1 },
            { key: '3-6', text: '3-6 weeks', value: 2 },
            { key: '6-9', text: '6-9 weeks', value: 3 },
            { key: '9-12', text: '9-12 weeks', value: 4 },
          ]
          
          const difficultyOptions = [
            { key: 'b', text: 'beginner', value: 1 },
            { key: 'i', text: 'intermediate', value: 2 },
            { key: 'a', text: 'advanced', value: 3 },
          ]

        console.log("VIEWEDITCOURSE", this.props)
        return !this.props.selectedCourse.course ? null  : (
            <div className="view-edit-course-div">
                {/* {this.props.selectedCourse.course.content_covered.forEach(content => {
                    this.addingContentToState(content)
                })} */}
                <h3>View and Edit this Course</h3>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid id="courseName" label='Course Name' placeholder='course name' defaultValue={this.props.selectedCourse.course.name} onChange={this.onChangeInformation} required/>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.TextArea fluid id="courseDescription" label='Course Description' placeholder='course description' defaultValue={this.props.selectedCourse.course.text_preview} onChange={this.onChangeInformation} required/>
                    </Form.Group>
                    {/* <Form.Group widths="equal">
                        <Form.Input fluid id="price" label='Price' type="number" placeholder='price' defaultValue={this.props.selectedCourse.course.price} onChange={this.onChangeInformation} required/>
                    </Form.Group> */}
                    <Form.Group widths="equal">
                        <Form.Select fluid id="duration" label='Duration' placeholder='duration' defaultValue={this.props.selectedCourse.course.duration} onChange={this.onChangeInformation} required
                        fluid
                        options={durationOptions}
                        />
                        <Form.Select fluid id="dificultyLevel" label='Difficulty Level' placeholder='difficulty level' defaultValue={this.props.selectedCourse.course.difficulty_level} onChange={this.onChangeInformation} required
                        fluid
                        options={difficultyOptions}
                        />
                        <Form.Input fluid id="subject" label='Subject' placeholder='subject' defaultValue={this.props.selectedCourse.course.subject} onChange={this.onChangeInformation} required/>
                        <Form.Input fluid id="price" label='Price' type="number" placeholder='price' defaultValue={this.props.selectedCourse.course.price} onChange={this.onChangeInformation} required/>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input fluid id="videoPreview" label='Video Preview' placeholder='upload video preview url here (optional)' defaultValue={this.props.selectedCourse.course.video_preview} onChange={this.onChangeInformation}/>
                        <Form.Input fluid id="picture" label='Picture' placeholder='upload picture url here (optional)' defaultValue={this.props.selectedCourse.course.picture} onChange={this.onChangeInformation}/>
                    </Form.Group>
                        <div>
                            {this.props.selectedCourse.course.content_covered.map(content => {
                                // debugger
                                return (                                    
                                <Form.Group widths="equal">
                                    <Form.Input fluid id="contentCovered" label='Content Covered' placeholder='content covered' defaultValue={content} onChange={this.onChangeInformation} required/>
                                </Form.Group>)
                                })}
                        </div>
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
                        <p>Please review this information before submission</p>
                        <Form.Field onClick={this.submit} control={Button}>Confirm Submission</Form.Field>
                    </div>
                        : 
                        <Form.Field onClick={this.edit} control={Button}>Submit</Form.Field>
                        }
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // debugger
    console.log(state.selectedCourse)
    return {
        selectedCourse: state.selectedCourse
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      selectingCourse: (id) => {dispatch(selectingCourse(id) )},
      editingCourse: (info) => {dispatch(editingCourse(info) )}
    //   gettingCompanyProfileFetch: () => {dispatch(gettingCompanyProfileFetch() )}
    }
  }

// export default ViewEditCourse

export default connect(mapStateToProps, mapDispatchToProps)(ViewEditCourse)
