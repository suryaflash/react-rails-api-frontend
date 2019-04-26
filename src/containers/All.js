import React, { Component } from 'react';
import './../App.css';
import { Alert, Table, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import * as actionCreator from '../actions/actions.js';

var request = require('superagent');
var JWT = require('superagent-jwt');

class All extends Component {
    constructor() {
        super();
        this.state = {
            content: {
                title: '',
                context: ''
            },
            contents: []
        }
    }


    componentWillMount = (e) => {
        if (localStorage.getItem('email') == null)
            window.location.href = "/";
        this.getAllArticle();
    }

    getAllArticle = () => {
       this.props.onGetAllArticle();
        var t = this;
        var jwt = JWT({
            header: 'jwt', // header name to try reading JWT from responses, default to 'jwt'
            local: 'jwt'   // key to store the JWT in localStorage, also default to 'jwt'
        });

        request
            .get('http://localhost:4000/articles')
            .use(jwt)
            .end(function (err, res) { 
                t.setState({ contents: res.body })
            });
    }


    deleteHandler = (index) => {
        this.props.onDelete(index);
        this.getAllArticle();
    }

    logout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('jwt');
        window.location.href = "/";
    }

    render() {  
        
        return (
            <div className="container">

                <p style={{ float: "right" }}> Hi , {(localStorage.getItem('email'))}
                    <Button color="danger" style={{ marginLeft: "20px" }} onClick={this.logout}>LogOut</Button>
                </p>
                <br />
                <br />
                <div >
                    <Alert color="info">
                        View All Articles
                    </Alert>
                </div>
                <div className="container">


                    <Table borderless>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Context</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.contents.arr ? this.props.contents.arr.map((obj, index) => (
                                <tr key={index}>
                                    <td> {obj.id} </td>
                                    <td> {obj.title}</td>
                                    <td> {obj.context}</td>
                                    <td><NavLink to={"/articles/" + obj.id + "/view"}> View </NavLink></td>
                                    <td><NavLink to={"/articles/" + obj.id + "/history"}> Data History </NavLink></td>
                                    <td><NavLink to={"/articles/" + obj.id + "/edit"}> Edit </NavLink></td>
                                    <td> <Button outline color="danger" onClick={() => this.deleteHandler(obj.id)}>Delete</Button> </td>
                                </tr>
                            )) : 'No Data'}  
                        </tbody>
                    </Table>
                </div>

                <NavLink to="/articles/new"><Button color="primary" style={{ marginLeft: "500px", marginTop: "100px" }} > Add An Article </Button></NavLink>

            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        contents: state.all
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onDelete : (id) => dispatch (actionCreator.onDelete(id)),
        onGetAllArticle : () => dispatch (actionCreator.onGetAllArticle())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(All);

