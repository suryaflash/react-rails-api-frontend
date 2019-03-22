import React, { Component } from 'react';
import './App.css';
import { NavLink } from "react-router-dom";
import { Button, Label, Input ,Alert} from 'reactstrap';
import axios from 'axios';



class Welcome extends Component {


    constructor(props) {
        super(props);
        this.state =
            {
                email: '',
                password: ''
            }
    }

    componentWillMount = () =>
    {
        console.log(localStorage.getItem('email'));
        if(localStorage.getItem('email') !== null )
            window.location.href = "/Add";
    }
    handleChange =(e) =>
    {
        this.setState({[e.target.name] : e.target.value});

    }

    onSignIn = (e) =>
    {
        let userData =
        {
            "auth" :{
            "email" : this.state.email,
            "password" : this.state.password
            }
        }
        axios.post('http://localhost:4000/user/sign_in',userData)
        .then((response) => 
        {
            console.log(response);
            if(response.data.jwt !== null )
            {
                localStorage.setItem('email', this.state.email);
                localStorage.setItem('jwt',response.data.jwt);
                window.location.href = "/Add";    
            }
            else
                window.alert("Invalid Credentials");
        })
        .catch(function (error) {
            console.log(error)
        })
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
                    <Input value={this.state.password} type='password' name='password' onChange={this.handleChange}/>
                   
                </div>
                <br/>
                <Button color="success" onClick={this.onSignIn}>SIGN IN</Button>

                <br/>
                <br/>

                Not a User?<NavLink to="/Signup"> Create an Account</NavLink>

            </div>

        )
    }
}

export default Welcome;
