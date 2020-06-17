import React from 'react'
import {connect} from 'react-redux'
import PurchasedCourse from './PurchasedCourse'
import {Button, Grid} from 'semantic-ui-react'
import {editingUserInfo} from '../redux/actions'
import EditUserProfile from './EditUserProfile'

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
        console.log("account information", this.props)
        return !this.props.user.currentUser || this.props.user.currentUser.courses === undefined ? null : (
        // return !this.props.user.currentUser ? null : (
            <div className="account-info-div">
                <h1>Account information</h1>
                <Grid>
                    <Grid.Column width={4}>
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
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <div className="account-purchases-div">
                                <h3 className="h3-course">Courses</h3>
                                {this.props.user.currentUser.courses.map(course => {
                                    // debugger
                                    for(let i = 0; i < this.props.user.currentUser.purchases.length; i++){
                                        // debugger
                                        if(course.id === this.props.user.currentUser.purchases[i].course_id && this.props.user.currentUser.purchases[i].is_purchased === true){
                                            return (
                                                <div>
                                                    <PurchasedCourse course={course}/>
                                                </div>
                                            )
                                        }}
                                    }
                                )}
                            </div>
                        </Grid.Column>
                        {/* <Grid.Column>
                            // <EnlargedCourseCard handleHoverTrue={this.handleHoverTrue} handleHoverFalse={this.handleHoverFalse}/>
                        </Grid.Column> */}
                </Grid>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    // userCourses: state.userCourses
})

export default connect(mapStateToProps, null)(AccountInformation)

// export default AccountInformation
