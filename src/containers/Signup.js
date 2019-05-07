import React, { Component } from 'react';
import './../App.css';
import { NavLink } from "react-router-dom";
import { Button, Label, Input, Alert } from 'reactstrap';
import { connect } from "react-redux";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                email: '',
                password: '',
                password_confirmation: ''
            }
    }

    componentWillMount = () => {
        if (localStorage.getItem('email') !== null)
            window.location.href = "/articles/new";
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSignUp = (e) => {
        let userData =
        {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }
        this.props.dispatch({ type: 'signUp', payload: userData });
    }

    render() {
        return (
            <div className="container">
                <Alert color="info"> Create an account</Alert>
                <div>

                    <Label >Email</Label>
                    <Input value={this.state.email} id='email' name='email' onChange={this.handleChange} />

                </div>

                <div>
                    <Label >Password</Label>
                    <Input value={this.state.password} type='password' name='password' onChange={this.handleChange} />

                </div>

                <div>
                    <Label >Retype Password</Label>
                    <Input value={this.state.password_confirmation} type='password' name='password_confirmation' onChange={this.handleChange} />
                </div>

                <br />
                <Button color="success" onClick={this.onSignUp}>SIGN UP</Button>
                <br />

                <br />

                Already a user?<NavLink to="/"> Log In here </NavLink>

            </div>

        )
    }
}
function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(Signup);

