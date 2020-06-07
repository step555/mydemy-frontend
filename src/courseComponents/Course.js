import React from 'react'
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { addingToCart } from "../redux/actions";

class Course extends React.Component{
    
    addToCart = (props) => {
        console.log("adding to cart")
        debugger
        this.props.addingToCart(props.course)
        // this.props.dispatch({ type: "ADD_TO_CART", payload: props.course})
    }

    render(){
        // console.log(this.props.course)

        return !this.props.course ? null : (
            <div>
                <h1>{this.props.course.name}</h1>
                {/* cart picture? */}
                <Button onClick={() => this.addToCart(this.props)}>Add to cart </Button> 
                <br></br>
                <br></br>
                <h2>About this course</h2>
                    <p>{this.props.course.text_preview}</p>
                    <img src={this.props.course.picture} alt="picture"/>
        <br></br>
                <h5>Institution: {this.props.course.company.name}</h5>
                <h5>Subject: {this.props.course.subject}</h5>
                <h5>Price: ${this.props.course.price}</h5>
                <h5>Duration: {this.props.course.duration}</h5>
                <h5>Difficulty level: {this.props.course.difficulty_level}</h5>
                <h5>Content covered in this course:</h5>
                <ul>
                    {this.props.course.content_covered.map(content => {
                        return <li>{content}</li>
                    })}
                </ul>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    course: state.courses.find(c => {
        return c.id === parseInt(ownProps.match.params.courseId)})
})

const mapDispatchToProps = (dispatch) => {
    // debugger
    console.log("mapDispatchToProps")
    return {
      addingToCart: (info) => {dispatch( addingToCart(info) )}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Course)

// export default Course