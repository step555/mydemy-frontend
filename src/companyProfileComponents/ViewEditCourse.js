import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {selectingCourse, gettingCompanyProfileFetch} from '../redux/actions'

class ViewEditCourse extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }

    // componentDidMount(){
    componentWillMount(){
        // this.props.gettingCompanyProfileFetch()
        let courseId = parseInt(this.props.match.params.courseId)
        this.props.selectingCourse(courseId)
    }

    render(){
        const durationOptions = [
            // {key: 'duration', text: 'duration', value: 0},
            { key: '1-3', text: '1-3 weeks', value: 1 },
            { key: '3-6', text: '3-6 weeks', value: 2 },
            { key: '6-9', text: '6-9 weeks', value: 3 },
            { key: '9-12', text: '9-12 weeks', value: 4 },
          ]
          
          const difficultyOptions  =[
            { key: 'b', text: 'beginner', value: 1 },
            { key: 'i', text: 'intermediate', value: 2 },
            { key: 'a', text: 'advanced', value: 3 },
          ]

        console.log("VIEWEDITCOURSE", this.props)
        return !this.props.selectedCourse.course ? null : (
            <div>
                <h3>New Course Creation Form</h3>
                <Form>
                        <Form.Group widths='equal'>
                            <Form.Input fluid id="courseName" label='Course Name' placeholder='course name' defaultValue={this.props.selectedCourse.course.name} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.TextArea fluid id="courseDescription" label='Course Description' placeholder='course description' defaultValue={this.props.selectedCourse.course.text_preview} onChange={this.onChangeInformation} required/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input fluid id="price" label='Price' type="number" placeholder='price' defaultValue={this.props.selectedCourse.course.price} onChange={this.onChangeInformation} required/>
                        </Form.Group>
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
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input fluid id="videoPreview" label='Video Preview' placeholder='upload video preview url here (optional)' defaultValue={this.props.selectedCourse.course.video_preview} onChange={this.onChangeInformation}/>
                        {/* </Form.Group> */}
                        {/* <Form.Group widths="equal"> */}
                            <Form.Input fluid id="picture" label='Picture' placeholder='upload picture url here (optional)' defaultValue={this.props.selectedCourse.course.picture} onChange={this.onChangeInformation}/>
                        </Form.Group>
                        {/* {this.state.numberOfContentCovered.map(input => {
                        return ( */}
                            <div>
                                <Form.Group widths="equal">
                                    {/* <Form.Input fluid id="contentCovered" label='Content Covered' placeholder='content covered' defaultValue={this.props.selectedCourse.course.contentCovered[0]} onChange={this.onChangeInformation} required/> */}
                                </Form.Group>
                            </div>
                        {/* )}
                        )} */}
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
    return {
        selectedCourse: state.selectedCourse
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      selectingCourse: (id) => {dispatch(selectingCourse(id) )},
    //   gettingCompanyProfileFetch: () => {dispatch(gettingCompanyProfileFetch() )}
    }
  }

// export default ViewEditCourse

export default connect(mapStateToProps, mapDispatchToProps)(ViewEditCourse)