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
        this.handleChange = this.handleChange.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }

    componentWillMount() {
        if (localStorage.getItem('email') !== null)
            window.location.href = "/articles/new";
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    onSignIn() {
        let userData =
        {
            "auth": {
                "email": this.state.email,
                "password": this.state.password
            }
        }
        this.props.onSignIn(userData);
    }


    render() {

        return (
            <div className="container">
                <Alert color="info"> Sign In</Alert>
                <div>

                    <Label >Email</Label>
                    <Input value={this.state.email} type='text' id='email' name='email' onChange={this.handleChange} />

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

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (data) => dispatch({ type: 'signIn', payload: data })
    }
}


export default connect(null, mapDispatchToProps)(Welcome);