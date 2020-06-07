import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
// import {cartTotal} from './redux/actions'

class CartContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            total: 0
        }
    }

    render(){
        // debugger
        return !this.props.cart ? null : (
            // I could make columns like amazon. total price on right, cart items on left
            <div>
                <h1>Shopping Cart</h1>
                {this.props.cart.map(item => {
                    console.log(item)
                    debugger
                        return ( 
                                <CartItem key={item.id} item={item}/>
                        )
                    })}
                    {/* card here for checkout and total price */}
                    <h3>Total: ${this.props.cartTotal.cartTotal}</h3>
                    <button>Proceed to Checkout</button>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    debugger
    return {
        // user: state.user,
        cart: state.cart,
        cartTotal: state.cartTotal
    };
};

export default connect(mapStateToProps)(CartContainer)

// export default CartContainer