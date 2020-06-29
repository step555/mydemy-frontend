import React from 'react'
import AccountInformation from './AccountInformation'

class UserProfileContainer extends React.Component{

    render(){
        return(
            <div>
                <div className="gray-field">
                    <div className="white-field">
                        <AccountInformation/>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfileContainer