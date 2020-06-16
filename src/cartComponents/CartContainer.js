import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
// import {cartTotal} from './redux/actions'
import { checkingOutCart, fetchingUserCart } from "../redux/actions";

class CartContainer extends React.Component{

    componentDidMount(){
        this.props.fetchingUserCart()
    }

    checkout = () => {
        console.log("checking out", this.props.cart)
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
                    </div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <h3>Total {`(${this.props.cart.length} items)`}: ${this.props.cart.reduce((sum,item)=> {
                            return sum + item.course.price
                        },0)}</h3>
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
    return {
        cart: state.cart,
        cartTotal: state.cartTotal
    };
};

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps")
    return {
      checkingOutCart: (info) => {dispatch( checkingOutCart(info) )},
      fetchingUserCart: (info) => {dispatch( fetchingUserCart(info) )}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)