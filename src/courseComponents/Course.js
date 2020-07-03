import React from 'react'
import { connect } from "react-redux";
import { Button, Grid, Column } from "semantic-ui-react";
import { addingToCart } from "../redux/actions";
import {Link} from 'react-router-dom'

class Course extends React.Component{
    
    addToCart = (props) => {
        this.props.addingToCart(props.course)
    }

    render(){
        return !this.props.course ? null : (
            <div className="course-div">
                <br></br>
                <div className="course-inner-div">
                    <Link to="/course-list"><Button>Back to course list</Button></Link>
                    <br></br><br></br>
                </div>
                <Grid>
                    <Grid.Column width={9}>
                    <h1>{this.props.course.name}</h1>
                    {localStorage.user_or_company === "user" ? 
                    <Button onClick={() => this.addToCart(this.props)}>Add to cart </Button> 
                    : 
                    null}
                    <br></br><br></br>
                    <div style={{backgroundImage: `url('${this.props.course.picture}')`}} className="course-image">
                    </div>
                    <hr />    
                    <h2>About this course:</h2>
                        <p>{this.props.course.text_preview}</p>
                    <h5>Content covered in this course:</h5>
                    <div className="content-covered-text-area-div">
                        <textarea className="content-covered-text-area" value={this.props.course.content_covered}></textarea>
                        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    </div>
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