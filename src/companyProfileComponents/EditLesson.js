import React from 'react'
import {connect} from 'react-redux'
import {Button, Form} from 'semantic-ui-react'

const EditLesson = (props) => {
    return(
        <div>
            <h1>EditLesson</h1>            
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