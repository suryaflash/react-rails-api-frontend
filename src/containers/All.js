import React, { Component } from 'react';
import './../App.css';
import { Alert, Table, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import $ from 'jquery';

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
        let toke = "Bearer " + localStorage.getItem("jwt")
        $.ajax({
            url: "http://localhost:4000/articles",
            type: "GET",
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', toke) },
            context: this,
            success: function (result) {
                this.setState({ contents: result })
                console.log("sss", result);
            }
        })
    }


    deleteHandler = (index) => {
        let data = { id: index }
        let token1 = "Bearer " + localStorage.getItem("jwt")
        $.ajax({
            url: `http://localhost:4000/articles/${data.id}`,
            type: "DELETE",
            data: data,
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token1) },
            context: this,
            success: function (result) {
                console.log(result)
            }
        })
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
                            {this.state.contents.map((obj, index) => (
                                <tr key={index}>
                                    <td> {obj.id} </td>
                                    <td> {obj.title}</td>
                                    <td> {obj.context}</td>
                                    <td><NavLink to={"/articles/" + obj.id + "/view"}> View </NavLink></td>
                                    <td><NavLink to={"/articles/" + obj.id + "/history"}> Data History </NavLink></td>
                                    <td><NavLink to={"/articles/" + obj.id + "/edit"}> Edit </NavLink></td>
                                    <td> <Button outline color="danger" onClick={() => this.deleteHandler(obj.id)}>Delete</Button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <NavLink to="/articles/new"><Button color="primary" style={{ marginLeft: "500px", marginTop: "100px" }} > Add An Article </Button></NavLink>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(All);

