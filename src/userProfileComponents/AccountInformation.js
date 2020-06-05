import React from 'react'
import {connect} from 'react-redux'

class AccountInformation extends React.Component{
    render(){
        console.log("account information", this.props)
        return (
            <div>
                <h1>Account information</h1>
                <h4>Name</h4> 
                {/* edit button to the right of name? */}
                    <p className="account-info">{this.props.user.name}</p>
                <h4>Email Address</h4>
                    <p className="account-info">{this.props.user.email}</p>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    user: state.user
})

export default connect(mapStateToProps)(AccountInformation)

// export default AccountInformation