import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'semantic-ui-react'
// import ViewEditCourse from './ViewEditCourse'
import {connect} from 'react-redux'
import {deletingCourse} from '../redux/actions'

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

    handleClick = (courseId) => {
        console.log("deleting")
        this.props.deletingCourse(courseId)
    }

    render(){
    return(
        <div onClick={this.editCourse}>
            <Card>
                {/* <Link to={`/company/${this.props.course.id}/view-and-edit-course`}> */}
                    <h5 className="account-info">ID: {this.props.course.id}</h5>
                    <h5 className="account-info">Name: {this.props.course.name}</h5>
                    <h5 className="account-info">Subject: {this.props.course.subject}</h5>
                    <h5 className="account-info">Price: ${this.props.course.price}</h5>
                    <h5 className="account-info">Duration: {this.props.course.duration}</h5>
                    <h5 className="account-info">Difficulty level: {this.props.course.difficulty_level}</h5>
                    {/* <button onclick={() => this.handleClick(this.props.course.id)}>Delete</button> */}
                    <button onClick={() => this.handleClick(this.props.course.id)}>Delete</button>
                    <br></br><br></br>
                {/* {this.state.editing ?  */}
                {/* </Link> */}
            </Card>
            <br></br>
        </div>
    )}
}

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