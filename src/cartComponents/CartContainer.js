import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
// import {cartTotal} from './redux/actions'
import { checkingOutCart } from "../redux/actions";

class CartContainer extends React.Component{
    // constructor(){
    //     super()
    //     this.state = {
    //         total: this.props.cartTotal.cartTotal
    //     }
    // }

    checkout = () => {
        console.log("checking out", this.props.cart)
        // this.props.cart.map(item => { item.is_purchased = true })
        // this.setState({total: this.props.cartTotal.cartTotal + })
        this.props.checkingOutCart(this.props.cart)
    }

    cartEmpty = () => {
        alert("Your cart is empty")
    }

    render(){
        console.log("Cart contents", this.props)
        
        return !this.props.cart || this.props.cart.length === undefined ? null : (
            <div>
                <Grid>
                    <Grid.Column width={10}>
                        <h1 className="shopping-cart">Shopping Cart</h1>
                        <br></br>
                        <div className="cart-container-div">
                        {this.props.cart.map(item => {

                            return ( 
                                    <CartItem key={item.id} item={item}/>
                            )
                        })}
                            {/* card here for checkout and total price */}
                            {/* <h3>Total: ${this.props.cartTotal.cartTotal}</h3> */}
                    </div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <h3>Total {`(${this.props.cart.length} items)`}: ${this.props.cart.reduce((sum,item)=> {
                            return sum + item.course.price
                        },0)}</h3>
                        {/* <button onClick={() => this.checkout(this.props.cart)}>Purchase these items</button> */}
                        {this.props.cart.length === 0 ? 
                            <Link><button onClick={this.cartEmpty}>Proceed to Checkout</button></Link>
                        : 
                            <Link to="/checkout"><button>Proceed to Checkout</button></Link>
                        }
                    </Grid.Column>
                </Grid>
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