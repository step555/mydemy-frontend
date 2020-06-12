import React from 'react'
import {connect} from 'react-redux'
import {removingFromCart} from '../redux/actions'
import {Grid} from 'semantic-ui-react'

const CartItem = (props) => {
    // console.log("cart item", props)
    const handleClick = () => {
        console.log("removing from cart")
       props.removingFromCart(props.item)
    }

    return(
        <div className="cart-item-div">
            <Grid>
                <Grid.Column width={5}>
                    <img className="cart-checkout-item-image" src={props.item.course.picture}></img>
                    {/* column */}
                </Grid.Column>
                <Grid.Column width={8}>
                    <h3 className="cart-item-info">{props.item.course.name}</h3>
                    <h4 className="cart-item-info">Difficulty level: {props.item.course.difficulty_level}</h4>
                    <h4 className="cart-item-info">Duration: {props.item.course.duration}</h4>
                    {/* column */}
                    <h5 className="cart-item-info">Price: ${props.item.course.price}</h5>
                    <button onClick={handleClick}>Remove from cart</button>
                    <br></br><br></br>
                </Grid.Column> 
            </Grid>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      removingFromCart: (info) => {dispatch( removingFromCart(info) )}
    }
}

export default connect(null, mapDispatchToProps)(CartItem)