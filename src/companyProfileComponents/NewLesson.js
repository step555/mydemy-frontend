import React from 'react'
import {Form, TextArea, Button} from 'semantic-ui-react'

const NewLesson = (props) => {

    return (
        <Form>
        {/* <Form.Group widths='equal'> */}
            <Form.Input fluid id="lessonName" label='Lesson Name' placeholder='lesson name' defaultValue={""} onChange={props.onChangeLessonInformation} required/>
        {/* </Form.Group> */}
        {/* <Form.Group widths='equal'> */}
            <Form.Input fluid id="video" label="Video Embed" placeholder='embed your video here' defaultValue={""} onChange={props.onChangeLessonInformation}/>
            <Form.Field fluid control={TextArea} type="text" id="lessonText" label="Lesson Text" placeholder="lesson text" defaultValue={""} onChange={props.onChangeLessonInformation} required/>
        {/* </Form.Group> */}
        </Form>
    )
    
}

export default NewLesson