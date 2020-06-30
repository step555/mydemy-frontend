import React from 'react'
import {connect} from 'react-redux'
import { checkingOutCart } from "../redux/actions";
import {Button, Form, Input, Grid, Header, Card, Segment} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'
import CheckoutFormCartItem from './CheckoutFormCartItem'

class Checkout extends React.Component {
    constructor(){
        super()
        this.state = {
            clickedShowItems: false,
            checkedOut: false
        }
    }

    componentDidMount(){
        this.setState({clickedShowItems: false})
    }

    checkingOut = () => {
        // debugger
        this.setState({checkedOut: true})
        this.props.checkingOutCart(this.props.cart)
    }

    handleClick = () => {
        this.setState({clickedShowItems: !this.state.clickedShowItems})
    }

    render(){
    console.log(this.props.cartTotal)

        // const redirectToCourses = false;
        if (this.state.checkedOut) {
            return <Redirect to="/course-list" />
        }

    // return !props.user.curentUser && props.cart && props.cartTotal ? null : (
        return this.props.user.length === 0 || this.props.cartTotal === undefined ? null : (
        // return (
            <div>
                <br></br>
                <h2 className="review-before-submission-h2">Please review your order before final submission</h2>
                    <Grid>

                            <Grid.Column width={7}>
                                <br></br><br></br>
                            <div className="checkout-form-details">
                                <Form>
                                    <div className="checkout-back-button">
                                        <Link to="/cart"><Button>Back</Button></Link>
                                        <br></br><br></br>
                                    </div>
                                    <Form.Field
                                        control={Input}
                                        label='Full Name'
                                        placeholder='Full Name'
                                        id="name"
                                        value={this.props.user.currentUser.name}
                                        required
                                        onChange={null}
                                    />
                                    <Form.Field
                                        control={Input}
                                        label='Email'
                                        placeholder='Email'
                                        id="email"
                                        value={this.props.user.currentUser.email}
                                        required
                                        onChange={null}
                                    />
                                    <Form.Field
                                        control={Input}
                                        label='Credit Card Number'
                                        placeholder='Credit Card Number'
                                        id="creditCardNumber"
                                        required
                                        onChange={null}
                                    />
                                </Form>
                            </div>
                            </Grid.Column>

                        <div className="purchase-box-div">
                            <Grid.Column width={3}>
                                <Button onClick={this.checkingOut}>Purchase</Button>
                                <h3>Order Summary</h3>
                                <h5>{this.props.cart.length} Courses</h5>
                                <h5>Order Total: ${this.props.cartTotal.cartTotal}</h5>
                            </Grid.Column>
                        </div>
                    </Grid>
                    <br></br><br></br>
                    <Grid>
                        <Grid.Column width={8}>
                            <div className="checkout-courses-div">
                                <h3 className="checkout-show-items" onClick={this.handleClick}>Courses</h3>
                            </div>
                            {/* <Segment> */}
                            {/* style={{overflow: 'auto', maxHeight: 500 }} */}
                            <Card style={{minWidth: 800 }}>
                                {this.state.clickedShowItems && this.props.cart.length > 0 ? 
                                this.props.cart.map(item => <CheckoutFormCartItem item={item} key={item.id}/>)
                                : null}
                            </Card>
                            <br></br><br></br><br></br><br></br><br></br><br></br>
                            {/* </Segment> */}
                        </Grid.Column>
                    </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // debugger
    return {
        user: state.user,
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