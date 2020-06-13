import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Form, Grid, Button} from 'semantic-ui-react'
// import ViewEditCourse from './ViewEditCourse'
import {connect} from 'react-redux'
import {deletingCourse, editingCourse} from '../redux/actions'
import CCourseModal from './CCourseModal'
import ReactDOM from 'react-dom'

// const CCourse = (this.props) => {
class CCourse extends React.Component{
    constructor(){
        super()
        this.state = {
            editing: true,
            show: false,
            numberOfContentCovered: [],
            individualContentCovered: "",
            contentCovered: [],
            editingContentCoveredArrayIndex: "",
            // below state is for this.props.course
            id: "",
            name: "",
            textPreview: "",
            videoPreview: "",
            picture: "",
            contentCovered: "",
            difficultyLevel: "",
            duration: "",
            price: "",
            subject: "",
        }
    }

    componentWillMount(){
        this.setState({
            editing: true,
            // submitted: false   
        })
    }

    showModal = () => {
        this.setState({ show: true })
    }

    hideModal = () => {
        this.setState({ show: false });
    };
    
    reviewCourseDetails = () => {
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
        this.setState({contentCovered: [...this.props.course.content_covered, this.state.individualContentCovered]})
    }
    this.setState({finished: !this.state.finished})
    if(this.state.name === ""){
        this.setState({name: this.props.course.name})
    }
    if(this.state.textPreview === ""){
        this.setState({textPreview: this.props.course.text_preview})
    }
    if(this.state.price === ""){
        this.setState({price: this.props.course.price})
    }
    if(this.state.duration === ""){
        this.setState({duration: this.props.course.duration})
    }
    if(this.state.subject === ""){
        this.setState({subject: this.props.course.subject})
    }
    if(this.state.video_preview === ""){
        this.setState({videoPreview: this.props.course.video_preview})
    }
    if(this.state.picture === ""){
        this.setState({picture: this.props.course.picture})
    }
    if(this.state.contentCovered.length === 0){
        this.setState({contentCovered: this.props.course.content_covered})
    }
    if(this.state.difficultyLevel === ""){
        this.setState({difficultyLevel: this.props.course.difficulty_level})
    }
    this.setState({courseId: this.props.course.id})



        // if(this.state.name === ""){
        //     this.setState({name: this.props.course.name})
        // }
        // if(this.state.textPreview === ""){
        //     this.setState({name: this.props.course.text_preview})
        // }
        // if(this.state.contentCovered.length === 0){
        // this.setState({ contentCovered: [...this.props.course.content_covered, this.state.individualContentCovered] })
        // }
        // this.setState({finished: !this.state.finished})
        // if(this.state.courseName === ""){
        //     this.setState({name: this.props.course.name})
        // }
        // if(this.state.courseDescription === ""){
        //     this.setState({textPreview: this.props.course.text_preview})
        // }
        // if(this.state.price === ""){
        //     this.setState({price: this.props.course.price})
        // }
        // if(this.state.duration === ""){
        //     this.setState({duration: this.props.course.duration})
        // }
        // if(this.state.subject === ""){
        //     this.setState({subject: this.props.course.subject})
        // }
        // if(this.state.video_preview === ""){
        //     this.setState({videoPreview: this.props.course.video_preview})
        // }
        // if(this.state.picture === ""){
        //     this.setState({picture: this.props.course.picture})
        // }

        // if(this.state.difficultyLevel === ""){
        //     this.setState({difficultyLevel: this.props.course.difficulty_level})
        // }
        // this.setState({courseId: this.props.course.id})

        // // this.setState({contentCovered: this.props.course.content_covered})
        // // if(this.state.contentCovered[0][0] !== undefined && ){
        // // this.state.contentCovered.unshift(this.props.course.content_covered)
        // // this.state.contentCovered.flat()
        // // let contentCoveredFlattened = this.state.contentCovered.flat()
        // // this.setState({contentCovered: contentCoveredFlattened})
        // // }
        this.setState({editing: false})
        // debugger
    }

    handleClick = (courseId) => {
        console.log("deleting")
        this.props.deletingCourse(courseId)
    }

    // onChangeInformation = (event) => {
    //     if(event.target.id !== "contentCovered"){ // contentCovered requires special attention due to being an array
    //         this.setState( { [event.target.id]: event.target.value } )
    //     }

    //     if(event.target.innerText === '0-3 weeks'){
    //         this.setState({duration: event.target.innerText})
    //     }else if(event.target.innerText === '3-6 weeks'){
    //         this.setState({duration: event.target.innerText})
    //     }else if (event.target.innerText === '6-9 weeks'){
    //         this.setState({duration: event.target.innerText})
    //     }else if(event.target.innerText === '9-12 weeks'){
    //         this.setState({duration: event.target.innerText})
    //     }

    //     if(event.target.innerText === 'beginner'){
    //         this.setState({difficultyLevel: event.target.innerText})
    //     }else if(event.target.innerText === 'intermediate'){
    //         this.setState({difficultyLevel: event.target.innerText})
    //     }else if (event.target.innerText === 'advanced'){
    //         this.setState({difficultyLevel: event.target.innerText})
    //     }

    //     if(event.target.id === "subject"){
    //         let forcedCapitalization = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) // in case user does not capitalize first letter
    //         this.setState({subject: forcedCapitalization})
    //     }

    // }

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

    // addInputField = () => { // adds to length of this.state.numContentCovered array // called when you click more
    //     let newNumInput = [...this.state.numberOfContentCovered, 1]
    //     this.setState({ numberOfContentCovered: newNumInput })
        
    //     // adds string of individual content covered to state.contentCovered array
    //     this.setState({ contentCovered: [...this.state.contentCovered, this.state.individualContentCovered] },
    //         () => {
    //             console.log("state has been updated")
    //         })

    //     this.setState({individualContentCovered: ""}) // prevents duplicate entries after the first one
    // }

    addInputField = () => { // this function does not render last element of new array when clicking submit btn
        let newNumInput = [...this.state.numberOfContentCovered, 1]
        this.setState({numberOfContentCovered: newNumInput})
        let newContentCoveredArray
        // on add input field, add individualContentCovered to contentCovered array
        if(this.state.individualContentCovered === "" && this.state.contentCovered.length === 0){
            // debugger
            newContentCoveredArray = [...this.state.contentCovered, this.props.course.content_covered[0]]
            this.setState({contentCovered: newContentCoveredArray})
        }else{
            newContentCoveredArray = [...this.state.contentCovered, this.state.individualContentCovered]
            this.setState({contentCovered: newContentCoveredArray})
        }
        this.setState({ individualContentCovered: "" })
    }

    submit = () => {
        this.setState({ editing: true }) 
        // at this point if you open several input fields but leave content_covered untouched it doesn't add it to contentCovered array
        debugger

        this.props.editingCourse(this.state)
    }

    selectedExistingContentCoveredIndex = (event) => {
        this.setState({
            editingContentCoveredArrayIndex: event.target.value // existing input field becomes the state
            // editingContentCoveredArrayIndex: content
            },() => {
                const t = this
        })
    }

    onChangeContentCoveredInformation = (event) => { // finds course content and replaces it with state
        event.persist()
        let individualContentCovered // this is used in 2 contentCovered states and a few conditionals
        if(event.target.id === "contentCovered"){ // potentially problematic conditional statement
            individualContentCovered = event.target.value // this state changes whenever you type something
        //     // this issue is dealt with by having contentCovered state be updated only after you click more
            const t = this
            this.setState({individualContentCovered: individualContentCovered},() => {
        // if(event.target.id === "contentCovered" && this.state.contentCovered.length === 0){ // these lines are problematic
        //     this.setState({contentCovered: individualContentCovered})
        // }
        for(let i = 0; i < this.props.course.content_covered.length; i++){
            if(this.props.course.content_covered[i] === this.state.editingContentCoveredArrayIndex){ 
                // this.props.course.content_covered[i] = this.state.editingContentCoveredArrayIndex
                this.props.course.content_covered[i] = event.target.value

                    }
                }
            })
        } 
    }

    deleteContentIndex = (content) => {
        const t = this
        for(let i = 0; i < this.props.course.content_covered.length; i++){
            if(content === this.props.course.content_covered[i]){
                this.props.course.content_covered = this.props.course.content_covered.filter(c => c !== content)
                debugger
            }
        }
        // debugger
    }

    render(){

        const durationOptions = [
            { key: '0-3', text: '0-3 weeks', value: 1 },
            { key: '3-6', text: '3-6 weeks', value: 2 },
            { key: '6-9', text: '6-9 weeks', value: 3 },
            { key: '9-12', text: '9-12 weeks', value: 4 },
          ]
          
          const difficultyOptions = [
            { key: 'b', text: 'beginner', value: 1 },
            { key: 'i', text: 'intermediate', value: 2 },
            { key: 'a', text: 'advanced', value: 3 },
          ]

    return !this.props.course ? null : (
        <div onClick={this.editCourse}>
            <h1>React Modal</h1>
{/* you might need </main> */}
            <CCourseModal show={this.state.show} handleClose={this.hideModal} course={this.props.course}>
                <Form style={{overflow: 'auto', maxHeight: 600 }}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid id="name" label='Course Name' placeholder='course name' defaultValue={this.props.course.name} onChange={this.onChangeInformation} required/>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.TextArea fluid id="textPreview" label='Course Description' placeholder='course description' defaultValue={this.props.course.text_preview} onChange={this.onChangeInformation} required/>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Select fluid id="duration" label='Duration' placeholder='duration' text={this.props.course.duration} defaultValue={this.props.course.duration} onChange={this.onChangeInformation} required
                        fluid
                        options={durationOptions}
                        />
                        <Form.Select fluid id="dificultyLevel" label='Difficulty Level' placeholder='difficulty level' text={this.props.course.difficulty_level} defaultValue={this.props.course.difficulty_level} onChange={this.onChangeInformation} required
                        fluid
                        options={difficultyOptions}
                        />
                        <Form.Input fluid id="subject" label='Subject' placeholder='subject' defaultValue={this.props.course.subject} onChange={this.onChangeInformation} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input id="price" label='Price' type="number" placeholder='price' defaultValue={this.props.course.price} onChange={this.onChangeInformation} required/>
                        <Form.Input id="videoPreview" label='Video Preview' placeholder='upload video preview url here (optional)' defaultValue={this.props.course.video_preview} onChange={this.onChangeInformation}/>
                        <Form.Input id="picture" label='Picture' placeholder='upload picture url here (optional)' defaultValue={this.props.course.picture} onChange={this.onChangeInformation}/>
                        {/* <Form.Input fluid the FLUID messes up the form input field/> */}
                    </Form.Group>
                        <div>
                            {this.props.course.content_covered.map(content => {
                                return (                                    
                                <Form.Group widths="equal">
                                    {/* <Form.Input fluid id="contentCovered" label='Content Covered' placeholder='content covered' onClick={(event) => this.selectedExistingContentCoveredIndex(event)} defaultValue={content} onChange={this.onChangeContentCoveredInformation} required/> */}
                                    <Form.Input fluid id="contentCovered" label='Content Covered' placeholder='content covered' onClick={(event) => this.selectedExistingContentCoveredIndex(event)} defaultValue={content} onChange={this.onChangeInformation} required/><button onClick={() => this.deleteContentIndex(content)}>X</button>
                                </Form.Group>)
                                })}
                        </div>

                        {this.state.numberOfContentCovered.map(input => { 

                            return (
                                <div>
                                    <Form.Group widths="equal">
                                        <Form.Input fluid id="contentCovered" label='Content Covered' placeholder='content covered' defaultValue={""} onChange={this.onChangeContentCoveredInformation} required/>
                                    </Form.Group>
                                </div>
                            )}
                        )}

                        <button onClick={this.addInputField}>More</button>
                        <br></br><br></br>
                        {this.state.editing === false ? 
                        <div>
                            <p>Please review this information before final submission</p>
                            <Form.Field onClick={this.submit} control={Button}>Confirm Submission</Form.Field>
                        </div>
                        : 
                            <Form.Field onClick={this.reviewCourseDetails} control={Button}>Submit</Form.Field>
                        }
                </Form>
            </CCourseModal>
            <button type="button" onClick={this.showModal}>Open</button>            
            <Card>
                {/* <Link to={`/company/${this.props.course.id}/view-and-edit-course`}> */}
                {/* <Link to={`/company/view-and-edit-course`}> */}

                    <h5 className="account-info">ID: {this.props.course.id}</h5>
                    <h5 className="account-info">Name: {this.props.course.name}</h5>
                    <h5 className="account-info">Subject: {this.props.course.subject}</h5>
                    <h5 className="account-info">Price: ${this.props.course.price}</h5>
                    <h5 className="account-info">Duration: {this.props.course.duration}</h5>
                    <h5 className="account-info">Difficulty level: {this.props.course.difficulty_level}</h5>

                    {/* <button onclick={() => this.handleClick(this.props.course.id)}>Delete</button> */}
                {/* {this.state.editing ?  */}
                {/* </Link> */}
                    <button onClick={() => this.handleClick(this.props.course.id)}>Delete</button>
                    <br></br>
            </Card>
            <br></br>
        </div>
    )}
}

const container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<CCourse />, container)

const mapDispatchToProps = (dispatch) => {
    return {
        deletingCourse: (info) => {dispatch( deletingCourse(info) )},
        editingCourse: (info) => {dispatch(editingCourse(info) )}
    }
}

export default connect(null, mapDispatchToProps)(CCourse)