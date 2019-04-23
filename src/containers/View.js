import React, { Component } from 'react';
import './../App.css';
import { Alert, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

class View extends Component {
    constructor() {
        super();
        this.state = {
            content: {
                title: '',
                context: '',
            },
            contents: []
        }
    }

    componentWillMount = (e) => {
        if (localStorage.getItem('email') == null)
            window.location.href = "/";

        console.log(this.props.match.params.id);
        this.getArticle();
    }


    getArticle = () => {
        let data = { id: this.props.match.params.id }
        let token = "Bearer " + localStorage.getItem("jwt")
        $.ajax({
            url: `http://localhost:4000/articles/${data.id}`,
            type: "GET",
            data: data,
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
            context: this,
            success: function (result) {
                console.log(result)
                let content_ex =
                {
                    title: result.title,
                    context: result.context
                }
                console.log("conent_ex:", content_ex);
                this.setState({ content: content_ex })
                console.log("state:", this.state.content);
            }
        })
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

                <div>
                    <Alert color="info">
                        Article View
                    </Alert>
                </div>

                <div>
                    <p >TITLE : {this.state.content.title}</p>
                    <br />
                    <p style={{}}>CONTEXT : {this.state.content.context}</p>
                </div>

                <div>

                    <NavLink to="/articles/new"><Button color="primary" style={{ marginLeft: "400px", marginTop: "300px" }} > Add An Article </Button></NavLink>

                    <NavLink to="/articles"><Button color="info" style={{ marginLeft: "550px", marginTop: "-65px" }} > View All Article </Button></NavLink>

                </div>


            </div>

        );
    }
}

export default View;