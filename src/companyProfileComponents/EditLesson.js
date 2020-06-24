import React from 'react'
import {connect} from 'react-redux'
import {Button, Form} from 'semantic-ui-react'

const EditLesson = (props) => {
    return(
        <div>
            <h1>EditLesson</h1>
            {/* <Form>
                <Form.Input fluid id="lessonName" label='Lesson Name' placeholder='lesson name' defaultValue={props.lessonName} onChange={(event) => props.onChangeLessonInformation(event)} required/>
                <Form.Input fluid id="video" label="Video Embed" placeholder='embed your video here' defaultValue={props.video} onChange={(event) => props.onChangeLessonInformation(event)}/>
                <Form.Field fluid control={TextArea} type="text" id="lessonText" label="Lesson Text" placeholder="lesson text" defaultValue={props.lessonText} onChange={(event) => props.onChangeLessonInformation(event)} required/>
            </Form> */}
            
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log("map state to props", state.selectedCourse)
    return {
        selectedCourse: state.selectedCourse,
    };
};

export default connect(mapStateToProps, null)(EditLesson)