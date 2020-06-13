import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Form, Grid} from 'semantic-ui-react'
// import ViewEditCourse from './ViewEditCourse'
import {connect} from 'react-redux'
import {deletingCourse} from '../redux/actions'
import CCourseModal from './CCourseModal'
import ReactDOM from 'react-dom'

// const CCourse = (this.props) => {
class CCourse extends React.Component{
    constructor(){
        super()
        this.state = {
            editing: false,
            show: false,
            numberOfContentCovered: [],
            individualContentCovered: "",
            contentCovered: []
        }
    }

    showModal = () => {
        this.setState({ show: true })
    }

    hideModal = () => {
        this.setState({ show: false });
    };
    
    editCourse = () => {
        this.setState({editing: !this.state.editing})
    }

    handleClick = (courseId) => {
        console.log("deleting")
        this.props.deletingCourse(courseId)
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

        if(event.target.id === "contentCovered"){ // potentially problematic conditional statement
            let individualContentCovered = event.target.value // this state changes whenever you type something
        //     // this issue is dealt with by having contentCovered state be updated only after you click more
            this.setState({individualContentCovered: individualContentCovered})
        } 

        if(event.target.id === "subject"){
            let forcedCapitalization = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) // in case user does not capitalize first letter
            this.setState({subject: forcedCapitalization})
        }
    }

    addInputField = () => { // adds to length of this.state.numContentCovered array
        let newNumInput = [...this.state.numberOfContentCovered, 1]
        this.setState({ numberOfContentCovered: newNumInput })
        
        // adds string of individual content covered to state.contentCovered array
        this.setState({ contentCovered: [...this.state.contentCovered, this.state.individualContentCovered] })
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
                <Form style={{overflow: 'auto', maxHeight: 500 }}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid id="courseName" label='Course Name' placeholder='course name' defaultValue={this.props.course.name} onChange={this.onChangeInformation} required/>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.TextArea fluid id="courseDescription" label='Course Description' placeholder='course description' defaultValue={this.props.course.text_preview} onChange={this.onChangeInformation} required/>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Select fluid id="duration" label='Duration' placeholder='duration' defaultValue={this.props.course.duration} onChange={this.onChangeInformation} required
                        fluid
                        options={durationOptions}
                        />
                        <Form.Select fluid id="dificultyLevel" label='Difficulty Level' placeholder='difficulty level' defaultValue={this.props.course.difficulty_level} onChange={this.onChangeInformation} required
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


                        <br></br><br></br>
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
        deletingCourse: (info) => {dispatch( deletingCourse(info) )}
    }
}

// const mapDispatchToProps = (dispatch) => {
//     console.log("mapDispatchToProps")
//     return {
//       addingToCart: (info) => {dispatch( addingToCart(info) )}
//     }
// }


export default connect(null, mapDispatchToProps)(CCourse)

// export default CCourse