import React from 'react'
import {connect} from 'react-redux'

class AccountInformation extends React.Component{
    render(){
        console.log("account information", this.props)
        // debugger
        return !this.props.user || this.props.user.courses === undefined ? null : (
            <div>
                <h1>Account information</h1>
                <h4>Name</h4> 
                {/* edit button to the right of name? */}
                    <p className="account-info">{this.props.user.name}</p>
                <h4>Email Address</h4>
                    <p className="account-info">{this.props.user.email}</p>
                <h4>Courses</h4>
                {/* courses.forEach course check if purchase with course_id is_purchased === true OR */}
                {/* DO BINARY SEARCH */}
                <p>{this.props.user.courses[2].name}</p>
                {console.log("ERROR LINE", this.props.user)}
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    user: state.user
})

export default connect(mapStateToProps)(AccountInformation)

// export default AccountInformation