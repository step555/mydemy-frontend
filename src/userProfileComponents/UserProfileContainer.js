import React from 'react'
import AccountInformation from './AccountInformation'
import Dashboard from './Dashboard'

class UserProfileContainer extends React.Component{


    render(){
        return(
            <div>
                Profile Container
                <AccountInformation/>
                <Dashboard/>
            </div>
        )
    }
}

export default UserProfileContainer