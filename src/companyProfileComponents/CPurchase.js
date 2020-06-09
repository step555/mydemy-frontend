import React from 'react'

const CPurchase = (props) => {
    console.log("CPurchase", props)
    return(
        <div>

            <h5 className="account-info">Purchase ID: {props.purchase.id}</h5>
            <p className="account-info">Course ID: {props.purchase.course_id}</p>
            <p className="account-info">User ID: {props.purchase.user_id}</p>
            <br></br>
        </div>
    )
}

export default CPurchase