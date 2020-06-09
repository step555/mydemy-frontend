import React from 'react'
import {connect} from 'react-redux'
import {removingFromCart} from '../redux/actions'

const CartItem = (props) => {
    // console.log("cart item", props)
    const handleClick = () => {
        console.log("removing from cart")
       props.removingFromCart(props.item)
    }

    return(
        <div>
            <img src="" alt={props.item.course.picture}></img>
            {/* column */}
            <h3 className="cart-item-info">{props.item.course.name}</h3>
            <h4 className="cart-item-info">Difficulty level: {props.item.course.difficulty_level}</h4>
            <h4 className="cart-item-info">Duration: {props.item.course.duration}</h4>
            {/* column */}
            <h5 className="cart-item-info">Price: ${props.item.course.price}</h5>
            <button onClick={handleClick}>Remove from cart</button>
            <br></br><br></br><br></br>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      removingFromCart: (info) => {dispatch( removingFromCart(info) )}
    }
}

export default connect(null, mapDispatchToProps)(CartItem)