import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'semantic-ui-react'
import ViewEditCourse from './ViewEditCourse'

// const CCourse = (this.props) => {
class CCourse extends React.Component{
    constructor(){
        super()
        this.state = {
            editing: false,
        }
    }
    
    editCourse = () => {
        this.setState({editing: !this.state.editing})
    }

    render(){
    return(
        <div onClick={this.editCourse}>
            <Card>
                <Link to={`/company/${this.props.course.id}/view-and-edit-course`}>
                    <h5 className="account-info">ID: {this.props.course.id}</h5>
                    <h5 className="account-info">Name: {this.props.course.name}</h5>
                    <h5 className="account-info">Subject: {this.props.course.subject}</h5>
                    <h5 className="account-info">Price: ${this.props.course.price}</h5>
                    <h5 className="account-info">Duration: {this.props.course.duration}</h5>
                    <h5 className="account-info">Difficulty level: {this.props.course.difficulty_level}</h5>
                {/* {this.state.editing ?  */}
                <br></br>
                </Link>
            </Card>
        </div>
    )}
}

export default CCourse