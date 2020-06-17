import React from 'react'
import {Radio, Grid, Form, Header, Input, Segment, Image, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import {creatingNewUser, creatingNewCompany} from '../redux/actions'
import Webcam from 'react-webcam';

const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

class RegisterNew extends React.Component{
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            user_or_company: null,
            clickedNext: false, 
            face: []
        }
    }

    componentWillMount = async () => {
        this.setState({
            name: "",
            email: "",
            password: "",
            user_or_company: null
        })
        // await loadModels();
        this.setInputDevice();
    }

    setInputDevice = () => {
        navigator.mediaDevices.enumerateDevices().then(async devices => {
          let inputDevice = await devices.filter(
            device => device.kind === 'videoinput'
          );
          if (inputDevice.length < 2) {
            await this.setState({
              facingMode: 'user'
            });
          } else {
            await this.setState({
              facingMode: { exact: 'environment' }
            });
          }
        //   this.startCapture();
        });
      };
    
    //   startCapture = () => {
    //     this.interval = setInterval(() => {
    //       this.capture();
    //     }, 1500);
    //   };
    
    //   componentWillUnmount() {
    //     clearInterval(this.interval);
    //   }

    signUp = (event) => {
        console.log(event.target.id)
        this.setState({ [event.target.id]: event.target.value })
    }

    isUser = () => {
        this.setState({user_or_company: "user"})
    }

    isCompany = () => {
        this.setState({user_or_company: "organization"})
    }

    handleSubmit = () => {
        if(this.state.name === "" || this.state.email === "" || this.state.password === ""){
            alert("Invalid entry. Please enter a valid email, name, and password")
        }else{
            if(this.state.user_or_company === "user"){
                this.props.creatingNewUser(this.state)
            }else if(this.state.user_or_company === "organization"){
                this.props.creatingNewCompany(this.state)
            }
        }
    }

    // setState({state},() => {
    //     other stuff here
    // })

    next = () => {
        this.setState({ clickedNext: !this.state.clickedNext })
    }

    render(){
        const { detections, match, facingMode } = this.state;
            let videoConstraints = null;
            let camera = '';
            if (!!facingMode) {
            videoConstraints = {
                width: WIDTH,
                height: HEIGHT,
                facingMode: facingMode
            };
            if (facingMode === 'user') {
                camera = 'Front';
            } else {
                camera = 'Back';
            }
        }
        let drawBox = null;
        if (!!detections) {
          drawBox = detections.map((detection, i) => {
            let _H = detection.box.height;
            let _W = detection.box.width;
            let _X = detection.box._x;
            let _Y = detection.box._y;
            return (
              <div key={i}>
                <div
                  style={{
                    position: 'absolute',
                    border: 'solid',
                    borderColor: 'blue',
                    height: _H,
                    width: _W,
                    transform: `translate(${_X}px,${_Y}px)`
                  }}
                >
                  {!!match && !!match[i] ? (
                    <p
                      style={{
                        backgroundColor: 'blue',
                        border: 'solid',
                        borderColor: 'blue',
                        width: _W,
                        marginTop: 0,
                        color: '#fff',
                        transform: `translate(-3px,${_H}px)`
                      }}
                    >
                      {match[i]._label}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          });
        }
        return(
            <div className="user-signup"> 
                <Grid textAlign='center' style={{ height: '93vh'}} verticalAlign='middle' >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form onSubmit={this.next}>
                        <Segment stacked>
                        <Form.Field
                        control={Input}
                        label='Full Name'
                        placeholder='Full Name'
                        id="name"
                        onChange={this.signUp}
                        />
                        <Form.Field
                        control={Input}
                        label='Email'
                        placeholder='Email'
                        id="email"
                        onChange={this.signUp}
                        />
                        <Form.Field
                        control={Input}
                        label='Password'
                        placeholder='Password'
                        id="password"
                        onChange={this.signUp}
                        />

                        <Form.Field>
                            <Form.Field>
                                Selected value: <b>{this.state.user_or_company}</b>
                            </Form.Field>
                            <Radio
                                label='User'
                                name='radioGroup'
                                value='user'
                                checked={this.state.user_or_company === 'user'}
                                // onChange={this.handleRadioChange}
                                onClick={this.isUser}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Organization'
                                name='radioGroup'
                                value='organization'
                                checked={this.state.user_or_company === 'organization'}
                                onClick={this.isCompany}
                            />
                        </Form.Field>
                        {/* <Link to ={"/login"}> */}
                            <Button type="submit">Next</Button>
                            {this.state.clickedNext ? 
                           <div
                           className="Camera"
                           style={{
                             display: 'flex',
                             flexDirection: 'column',
                             alignItems: 'center'
                           }}
                         >
                           {/* <p>Camera: {camera}</p> */}
                           <h3></h3>
                           <div
                             style={{
                               width: WIDTH,
                               height: HEIGHT
                             }}
                           >
                             <div style={{ position: 'relative', width: WIDTH }}>
                               {!!videoConstraints ? (
                                 <div style={{ position: 'absolute' }}>
                                   <Webcam
                                     audio={false}
                                     width={WIDTH}
                                     height={HEIGHT}
                                     ref={this.webcam}
                                     screenshotFormat="image/jpeg"
                                     videoConstraints={videoConstraints}
                                   />
                                 </div>
                               ) : null}
                               {!!drawBox ? drawBox : null}
                             </div>
                           </div>
                         </div> : null}
                        {/* </Link> */}
                        </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      creatingNewUser: (info) => {dispatch( creatingNewUser(info) )},
      creatingNewCompany: (info) => {dispatch( creatingNewCompany(info) )}
    }
}


export default connect(null, mapDispatchToProps)(RegisterNew)