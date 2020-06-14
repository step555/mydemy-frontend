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

    handleClick = (courseId) => {
        console.log("deleting")
        this.props.deletingCourse(courseId)
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
            <CCourseModal show={this.state.show} handleClose={this.hideModal} course={this.props.course}>
                <Form style={{overflow: 'auto', maxHeight: 600 }}>
                    <h1>Review your course details here</h1>
                    <Form.Group widths='equal'>
                        <Form.Input fluid id="name" label='Course Name' placeholder='course name' value={this.props.course.name} onChange={this.onChangeInformation}/>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.TextArea fluid id="textPreview" label='Course Description' placeholder='course description' value={this.props.course.text_preview} onChange={this.onChangeInformation}/>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input fluid id="duration" label='Duration' placeholder='duration' text={this.props.course.duration} value={this.props.course.duration} onChange={this.onChangeInformation}
                        fluid
                        options={durationOptions}
                        />

                        <Form.Input fluid id="dificultyLevel" label='Difficulty Level' placeholder='difficulty level' text={this.props.course.difficulty_level} value={this.props.course.difficulty_level} onChange={this.onChangeInformation}
                        fluid
                        options={difficultyOptions}
                        />
                        <Form.Input fluid id="subject" label='Subject' placeholder='subject' value={this.props.course.subject} onChange={this.onChangeInformation}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input id="price" label='Price' type="number" placeholder='price' value={this.props.course.price} onChange={this.onChangeInformation}/>
                        <Form.Input id="videoPreview" label='Video Preview' placeholder='upload video preview url here (optional)' value={this.props.course.video_preview} onChange={this.onChangeInformation}/>
                        <Form.Input id="picture" label='Picture' placeholder='upload picture url here (optional)' value={this.props.course.picture} onChange={this.onChangeInformation}/>
                        {/* <Form.Input fluid the FLUID messes up the form input field/> */}
                    </Form.Group>
                        <div>
                            {this.props.course.content_covered.map(content => {
                                return (                                    
                                <Form.Group widths="equal">
                                    {/* <Form.Input fluid id="contentCovered" label='Content Covered' placeholder='content covered' onClick={(event) => this.selectedExistingContentCoveredIndex(event)} value={content} onChange={this.onChangeContentCoveredInformation}/> */}
                                    <Form.Input fluid id="contentCovered" label='Content Covered' placeholder='content covered' value={content}/>
                                </Form.Group>)
                                })}
                        </div>

                        <br></br><br></br>
                </Form>
            </CCourseModal>
            {/* <button type="button" onClick={this.showModal}>Open</button>             */}
                <Card onClick={this.showModal}>
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
                            
                            {/* <button onClick={() => this.handleClick(this.props.course.id)}>Delete</button> */}
                            <br></br>
                </Card>
                <Grid>
                    <Grid.Column width={5}>
                        <button>View Lessons</button>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <button onClick={() => this.handleClick(this.props.course.id)}>Delete</button>
                    </Grid.Column>
                </Grid>
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