import React, { Component } from 'react';
import './../App.css';
import { NavLink } from "react-router-dom";
import { Button, Label, Input, Alert } from 'reactstrap';

import { connect } from "react-redux";



class Welcome extends Component {


    constructor(props) {
        super(props);
        this.state =
            {
                email: '',
                password: ''
            }
    }

    componentWillMount = () => {
        console.log(localStorage.getItem('email'));
        if (localStorage.getItem('email') !== null)
            window.location.href = "/articles/new";
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    onSignIn = (e) => {
        let userData =
        {
            "auth": {
                "email": this.state.email,
                "password": this.state.password
            }
        }
        this.props.dispatch({ type: 'signIn', payload: userData })
    }


    render() {
        return (
            <div className="container">
                <Alert color="info"> Sign In</Alert>
                <div>

                    <Label >Email</Label>
                    <Input value={this.state.email} id='email' name='email' onChange={this.handleChange} />

                </div>

                <div>
                    <Label >Password</Label>
                    <Input value={this.state.password} type='password' name='password' onChange={this.handleChange} />

                </div>
                <br />
                <Button color="success" onClick={this.onSignIn}>SIGN IN</Button>

                <br />
                <br />

                Not a User?<NavLink to="/Signup"> Create an Account</NavLink>>

            </div>

        )
    }
}

function mapStateToProps(state) {
    console.log('stp', state);
    return {
        //email : state.email
    }
}

export default connect(mapStateToProps)(Welcome);
