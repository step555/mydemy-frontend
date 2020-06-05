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

    componentDidMount(){
        let totalPrice = 0
        const cart = this.props.cart
        // debugger
        // cart.forEach(item => {
        //     totalPrice += item.price})
        // this.setState({total: totalPrice})
        // debugger
    }

    render(){

        // let totalPrice = 0
        // const cart = this.props.cart
        // console.log("cart", cart)
        // cart.forEach(item => totalPrice += item.price)
        // this.setState({total: totalPrice})
            // debugger
        // console.log("price", this.totalPrice)
        // console.log("price", this.state)
        return !this.props.cart ? null : (
            // I could make columns like amazon. total price on right, cart items on left
            <div>
                <h1>Shopping Cart</h1>
                {this.props.cart.map(item => {
                    console.log(item)
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
    // debugger
    return {
        // user: state.user,
        cart: state.cart,
        cartTotal: state.cartTotal
    };
};

export default connect(mapStateToProps)(CartContainer)

// export default CartContainer