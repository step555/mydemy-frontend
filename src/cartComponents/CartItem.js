import React from 'react'

const CartItem = (props) => {
    console.log("cart item", props)
    return(
        <div>
            <img src="" alt={props.item.course.picture}></img>
            {/* column */}
            <h3 className="cart-item-info">{props.item.course.name}</h3>
            <h4 className="cart-item-info">Difficulty level: {props.item.course.difficulty_level}</h4>
            <h4 className="cart-item-info">Duration: {props.item.course.duration}</h4>
            {/* column */}
            <h5 className="cart-item-info">Price: ${props.item.course.price}</h5>
            <br></br>
        </div>
    )
}

export default CartItem