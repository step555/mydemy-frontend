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
            show: false
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

    render(){
    return !this.props.course ? null : (
        <div onClick={this.editCourse}>
            <h1>React Modal</h1>
{/* you might need </main> */}
            <CCourseModal show={this.state.show} handleClose={this.hideModal} course={this.props.course}>
                <p>Modal</p>
                <p>{this.props.course.name}</p>
                <p>Data</p>
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