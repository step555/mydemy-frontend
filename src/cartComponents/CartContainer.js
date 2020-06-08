import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
// import {cartTotal} from './redux/actions'
import { checkingOutCart } from "../redux/actions";

class CartContainer extends React.Component{
    // constructor(){
    //     super()
    //     this.state = {
            // total: this.props.cartTotal.cartTotal
    //     }
    // }

    checkout = () => {
        console.log("checking out", this.props.cart)
        // this.props.cart.map(item => { item.is_purchased = true })
        // this.setState({total: this.props.cartTotal.cartTotal + })
        this.props.checkingOutCart(this.props.cart)
    }

    render(){
        // debugger
        console.log("BEFORE ERROR", this.props.cart)
        
        return !this.props.cart || this.props.cart.length === undefined ? null : (
            // I could make columns like amazon. total price on right, cart items on left
            <div>
                <h1>Shopping Cart</h1>
                {this.props.cart.map(item => {
                    // console.log(item)
                    // debugger
                        return ( 
                                <CartItem key={item.id} item={item}/>
                        )
                    })}
                    {/* card here for checkout and total price */}
                    <h3>Total: ${this.props.cartTotal.cartTotal}</h3>
                    <button onClick={() => this.checkout(this.props.cart)}>Proceed to Checkout</button>
            </div>
        )
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)
// export default connect(mapStateToProps, null)(CartContainer)
// export default CartContainer