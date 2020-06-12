import React from 'react'
import {connect} from 'react-redux'
import { checkingOutCart } from "../redux/actions";
import {Button} from 'semantic-ui-react'

const Checkout = (props) => {

    const checkingOut = () => {
        debugger
        checkingOutCart(props.cart)
    }

    return(
        <div>
            // checkout form here. probably a dummy form
            <Button onClick={checkingOut}>Purchase</Button> // show subtotal near purchase
            // show cart items here
        </div>
    )

}

const mapStateToProps = (state) => {
    // debugger
    return {
        // user: state.user,
        cart: state.cart,
        cartTotal: state.cartTotal
    };
};

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps")
    return {
      checkingOutCart: (info) => {dispatch( checkingOutCart(info) )}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)