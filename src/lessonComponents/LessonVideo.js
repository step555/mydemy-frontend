import React from 'react'

const LessonVideo = (props) => {
    // debugger
    console.log("lesson video props", props)
    return (
        <div>
            
            <iframe width="560" height="315" src={props.lesson.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
            </iframe>
        </div>
    )

}

export default LessonVideo