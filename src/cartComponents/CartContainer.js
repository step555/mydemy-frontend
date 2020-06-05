import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'

class CartContainer extends React.Component{
    render(){
        console.log(this.props)
        return !this.props.cart ? null : (
            // I could make columns like amazon. total price on right, cart items on left
            <div>
                <h1>Cart</h1>
                {this.props.cart.map(item => {
                    console.log(item)
                        return ( 
                                <CartItem key={item.id} item={item}/>
                        )
                    })}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        // user: state.user,
        cart: state.cart
    };
};

export default connect(mapStateToProps)(CartContainer)

// export default CartContainer