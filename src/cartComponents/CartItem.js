import React from 'react'

const CartItem = (props) => {
    console.log("cart item", props)
    return(
        <div>
            <img src="" alt={props.item.picture}></img>
            {/* column */}
            <h3 className="cart-item-info">{props.item.name}</h3>
            <h4 className="cart-item-info">Difficulty level: {props.item.difficulty_level}</h4>
            <h4 className="cart-item-info">Duration: {props.item.duration}</h4>
            {/* column */}
            <h5 className="cart-item-info">Price: ${props.item.price}</h5>
        </div>
    )
}

export default CartItem