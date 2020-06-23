import React from 'react'
import {Form, Button, Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {editingCourse, selectingCourse} from '../redux/actions'

class EditCourse extends React.Component{
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
                courseId: "",

                durationOptions: null,
                selectedDuration: null,
    
                difficultyOptions: null,
                selectedDifficulty: null,

            }
    }

    componentDidMount(){
        // this.props.selectingCourse(parseInt(this.props.match.params.courseId))
        this.setState({wasSubmitted: false})
        console.log(this.state.wasSubmitted)
        // if(this.props.selectedCourse.course !== undefined){
        //     debugger
        //     if(this.props.selectedCourse.course.duration === '0-3 weeks'){
        //         this.setState({selectedDuration: 1})
        //     }else if(this.props.selectedCourse.course.duration === '3-6 weeks'){
        //         this.setState({selectedDuration: 2})
        //     }else if (this.props.selectedCourse.course.duration === '6-9 weeks'){
        //         this.setState({selectedDuration: 3})
        //     }else if(this.props.selectedCourse.course.duration === '9-12 weeks'){
        //         this.setState({selectedDuration: 4})
        //     }
        // }
    }

    componentWillMount(){
        this.props.selectingCourse(parseInt(this.props.match.params.courseId))
        this.setState({ 
            durationOptions: [
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
        // if(this.props.selectedCourse.course !== undefined){
        //     debugger
        //     if(this.props.selectedCourse.course.duration === '0-3 weeks'){
        //         this.setState({selectedDuration: 1})
        //     }else if(this.props.selectedCourse.course.duration === '3-6 weeks'){
        //         this.setState({selectedDuration: 2})
        //     }else if (this.props.selectedCourse.course.duration === '6-9 weeks'){
        //         this.setState({selectedDuration: 3})
        //     }else if(this.props.selectedCourse.course.duration === '9-12 weeks'){
        //         this.setState({selectedDuration: 4})
        //     }
        // }
    }

    render(){

        // const durationOptions = [
        //     { key: '0-3', text: '0-3 weeks', value: 1 },
        //     { key: '3-6', text: '3-6 weeks', value: 2 },
        //     { key: '6-9', text: '6-9 weeks', value: 3 },
        //     { key: '9-12', text: '9-12 weeks', value: 4 },
        // ]
          
        // const difficultyOptions = [
        //     { key: 'b', text: 'beginner', value: 1 },
        //     { key: 'i', text: 'intermediate', value: 2 },
        //     { key: 'a', text: 'advanced', value: 3 },
        // ]

        console.log(this.props)
        return !this.props.selectedCourse.course ? null : (
            <div className="view-edit-course-div">
                <h3>Edit this Course</h3>
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
                        <Form.Select fluid id="duration" label='Duration' placeholder='duration' defaultValue={this.props.selectedDuration} onChange={this.onChangeInformation} required
                        fluid
                        options={this.state.durationOptions}
                        />
                        <Form.Select fluid id="dificultyLevel" label='Difficulty Level' placeholder='difficulty level' defaultValue={this.props.selectedDifficulty} onChange={this.onChangeInformation} required
                        fluid
                        options={this.state.difficultyOptions}
                        />
                        <Form.Input fluid id="subject" label='Subject' placeholder='subject' defaultValue={this.props.selectedCourse.course.subject} onChange={this.onChangeInformation} required/>
                        <Form.Input fluid id="price" label='Price' type="number" placeholder='price' defaultValue={this.props.selectedCourse.course.price} onChange={this.onChangeInformation} required/>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input fluid id="videoPreview" label='Video Preview' placeholder='upload video preview url here (optional)' defaultValue={this.props.selectedCourse.course.video_preview} onChange={this.onChangeInformation}/>
                        <Form.Input fluid id="picture" label='Picture' placeholder='upload picture url here (optional)' defaultValue={this.props.selectedCourse.course.picture} onChange={this.onChangeInformation}/>
                    </Form.Group>
                    <div>
                        <Form.Group widths="equal">
                            <Form.TextArea fluid id="contentCovered" label='Content Covered' placeholder='content covered' defaultValue={this.props.selectedCourse.course.content_covered} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                    </div>
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
    console.log("map state to props", state.selectedCourse)
    let selectedDurationValue
    let selectedDifficultyValue
        if(state.selectedCourse.course !== undefined){
            if(state.selectedCourse.course.duration === '0-3 weeks'){
                selectedDurationValue = 1
            }else if(state.selectedCourse.course.duration === '3-6 weeks'){
                selectedDurationValue = 2
            }else if (state.selectedCourse.course.duration === '6-9 weeks'){
                selectedDurationValue = 3
            }else if(state.selectedCourse.course.duration === '9-12 weeks'){
                selectedDurationValue = 4
            }
        }
        if(state.selectedCourse.course !== undefined){
            if(state.selectedCourse.course.difficulty_level === 'beginner'){
                selectedDifficultyValue = 1
            }else if(state.selectedCourse.course.difficulty_level === 'intermediate'){
                selectedDifficultyValue = 2
            }else if (state.selectedCourse.course.difficulty_level === 'advanced'){
                selectedDifficultyValue = 3
            }
        }
    return {
        selectedCourse: state.selectedCourse,
        selectedDuration: selectedDurationValue,
        selectedDifficulty: selectedDifficultyValue
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        selectingCourse: (id) => {dispatch(selectingCourse(id) )},
        editingCourse: (info) => {dispatch(editingCourse(info) )}
    //   gettingCompanyProfileFetch: () => {dispatch(gettingCompanyProfileFetch() )}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCourse)