import React, { Component } from 'react';
import './../App.css';
import { Alert, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
var request = require('superagent');
var JWT = require('superagent-jwt');

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
        this.getArticle();
    }


    getArticle = () => {
        let data = { id: this.props.match.params.id }

        var jwt = JWT({
            header: 'jwt',
            local: 'jwt'
        });

        let t = this;

        request
            .get(`/articles/${data.id}`)
            .field('data', data)
            .use(jwt)
            .end(function (err, res) {
                let content_ex =
                {
                    title: res.body.title,
                    context: res.body.context
                }
                t.setState({ content: content_ex })
            });
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