import React from 'react'
import {connect} from 'react-redux'
// import PurchasedCourse from './PurchasedCourse'
import {Button, Grid} from 'semantic-ui-react'
import {editingUserInfo} from '../redux/actions'
import EditUserProfile from './EditUserProfile'
// import EnlargedCourseCard from './EnlargedCourseCard'
import {Link} from 'react-router-dom'

class AccountInformation extends React.Component{
    constructor(){
        super()
        this.state = {
            clickedEditButton: false,
            hoveredOnCourseCard: false // refer to purchased course comments for more on how to proceed
        }
    }
    // componentDidMount(){
    //     console.log("got here", this)
    // }

    handleClick = () => {
        console.log("editing profile", this.props.user)
        this.setState({ clickedEditButton: !this.state.clickedEditButton})
        console.log(this.state.clickedEditButton)
        // editingUserInfo(this.props.user)
    }

    render(){
        console.log(this.props.user)
        return !this.props.user.currentUser || this.props.user.currentUser.courses === undefined ? null : (
            <div className="account-info-div">
                <h1>Account information</h1>
                {this.state.clickedEditButton === false ? 
                    <div>
                        <h4>Name</h4>
                            <p className="account-info">{this.props.user.currentUser.name}</p>
                        <h4>Email Address</h4>
                            <p className="account-info">{this.props.user.currentUser.email}</p>
                            <br></br>
                        <Button onClick={this.handleClick}>Edit Profile Information</Button>
                        <Link to={`/user-courses`}><Button>View Your Courses</Button></Link>
                    </div>
                        :
                        <div>
                            <EditUserProfile user={this.props.user} back={this.handleClick}/>
                            {/* <Button onClick={this.handleClick}>Back</Button> */}
                        </div>
                        }
                        <br></br><br></br>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    enlargedCourse: state.enlargedCourse,
    user: state.user,
    // userCourses: state.userCourses
})

export default connect(mapStateToProps, null)(AccountInformation)

// export default AccountInformation
