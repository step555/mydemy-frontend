import React from 'react'

const CartItem = (props) => {
    console.log("cart item", props)
    return(
        <div>
            <img src="" alt={props.item.picture}></img>
            <h3>{props.item.name}</h3>
            <h5>Price: ${props.item.price}</h5>
            <h4>Difficulty level: {props.item.difficulty_level}</h4>
            <h4>Duration: {props.item.duration}</h4>
        </div>
    )
}

export default CartItem