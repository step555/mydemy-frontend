import React from 'react'
import {connect} from 'react-redux'
import PurchasedCourse from './PurchasedCourse'
import {Button} from 'semantic-ui-react'
import {editingUserInfo} from '../redux/actions'
import EditUserProfile from './EditUserProfile'

class AccountInformation extends React.Component{
    constructor(){
        super()
        this.state = {
            clickedEditButton: false
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
        console.log("account information", this.props)
        return !this.props.user.currentUser || this.props.user.currentUser.courses === undefined ? null : (
        // return !this.props.user.currentUser ? null : (
            <div>
                <h1>Account information</h1>
                <h4>Name</h4>
                    <p className="account-info">{this.props.user.currentUser.name}</p>
                <h4>Email Address</h4>
                    <p className="account-info">{this.props.user.currentUser.email}</p>
                <Button onClick={this.handleClick}>Edit Profile Information</Button>
                {this.state.clickedEditButton === true ? 
                <div>
                    <EditUserProfile user={this.props.user}/>
                </div>
                :
                null
                }
                <h4>Courses</h4>
                 {this.props.user.currentUser.courses.map(course => {
                    for(let i = 0; i < this.props.user.currentUser.purchases.length; i++){
                        if(course.id === this.props.user.currentUser.purchases[i].course_id && this.props.user.currentUser.purchases[i].is_purchased === false){
                            return (
                                <div>
                                    <PurchasedCourse course={course}/>
                                </div>
                            )
                        }}
                    }
                )}
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    // userCourses: state.userCourses
})

// const mapDispatchToProps = (dispatch) => {
//     console.log("mapDispatchToProps")
//     return {
//       editingUserInfo: (info) => {dispatch( editingUserInfo(info) )}
//     }
// }

export default connect(mapStateToProps, null)(AccountInformation)

// export default AccountInformation
