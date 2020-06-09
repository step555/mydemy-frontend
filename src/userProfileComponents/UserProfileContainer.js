import React from 'react'
import AccountInformation from './AccountInformation'

class UserProfileContainer extends React.Component{

    render(){
        return(
            <div>
                Profile Container
                <AccountInformation/>
            </div>
        )
    }
}

export default UserProfileContainer