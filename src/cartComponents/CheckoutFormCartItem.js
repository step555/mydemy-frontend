import React from 'react'
import {connect} from 'react-redux'
import {removingFromCart} from '../redux/actions'
import {Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const CartItem = (props) => {
    // console.log("cart item", props)
    const handleClick = () => {
        console.log("removing from cart")
       props.removingFromCart(props.item)
    }

    return(
        <div className="cart-item-div">
            <br></br>
            <Grid>
                <div>
                    <Grid.Column width={5}>
                            <img className="cart-checkout-item-image" src={props.item.course.picture}></img>
                    </Grid.Column>
                </div>
                <div>
                    <Grid.Column width={8}>
                        <Link to={`/course-list/${props.item.course.id}`}><h3 className="cart-item-info">{props.item.course.name}</h3></Link>
                        <div className="cart-item-info-between-name-link-and-difficulty"></div>
                        <h4 className="cart-item-info">Difficulty level: {props.item.course.difficulty_level}</h4>
                        <h4 className="cart-item-info">Duration: {props.item.course.duration}</h4>
                        <h5 className="cart-item-info">Price: ${props.item.course.price}</h5>
                        <button onClick={handleClick}>Remove from cart</button>
                        <br></br><br></br>
                    </Grid.Column> 
                </div>
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