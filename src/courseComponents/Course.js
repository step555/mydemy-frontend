import React from 'react'
import { connect } from "react-redux";
import { Button, Grid, Column } from "semantic-ui-react";
import { addingToCart } from "../redux/actions";

class Course extends React.Component{
    
    addToCart = (props) => {
        // debugger
        this.props.addingToCart(props.course)
        // this.props.dispatch({ type: "ADD_TO_CART", payload: props.course})
    }

    render(){
        // console.log(this.props.course)
        return !this.props.course ? null : (
            <div className="course-div">
                <Grid>
                    <Grid.Column width={9}>
                        <br></br>
                    <h1>{this.props.course.name}</h1>
                    {/* cart picture? */}
                    {localStorage.user_or_company === "user" ? 
                    <Button onClick={() => this.addToCart(this.props)}>Add to cart </Button> 
                    : 
                    null}
                    <br></br>
                    <br></br>
                    <div style={{backgroundImage: `url('${this.props.course.picture}')`}} className="course-image">
                        {/* <img src={this.props.course.picture} alt="picture" className="course-image"/> */}
                    </div>
                    <hr />    
                    <h2>About this course:</h2>
                        <p>{this.props.course.text_preview}</p>
                    {/* <p>Institution: <strong>{this.props.course.company.name}</strong></p>
                    <p>Subject: <strong>{this.props.course.subject}</strong></p> */}
                    <h5>Content covered in this course:</h5>
                    <ul>
                        {this.props.course.content_covered.split(", ").map(content => {
                            return <li>{content}</li>
                        })}
                    </ul>
                    </Grid.Column>
                    <Grid.Column width={0}>
                    <div>
                        <br></br><br></br><br></br><br></br><br></br><br></br>
                        <div className="small-clock-break">
                        </div>
                        <img className="dollar-bill" src="../../../images/bluedollarbill.png"></img>

                        <img className="blue-clock" src="../../../images/blueclock.png"></img>
                        <img className="blue-book" src="../../../images/bluebook.png"></img>
                    </div>
                    </Grid.Column>
                    <Grid.Column  width={4}>
                    <div>
                        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                        <p className="course-side-text">Price: ${this.props.course.price}</p>
                        <p className="course-side-text">Duration: {this.props.course.duration}</p>
                        <p className="course-side-text">Difficulty level: {this.props.course.difficulty_level}</p>
                        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                        <div style={{paddingBottom: 12}}></div>
                        <h2><small>Institution:</small> <strong>{this.props.course.company.name}</strong></h2>
                        <h2><small>Subject:</small> <strong>{this.props.course.subject}</strong></h2>
                    </div>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    course: state.courses.find(c => {
        return c.id === parseInt(ownProps.match.params.courseId)}),
    user: state.user
})

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps")
    return {
      addingToCart: (info) => {dispatch( addingToCart(info) )}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Course)

// export default Course