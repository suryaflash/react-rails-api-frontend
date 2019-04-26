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

        console.log(this.props.match.params.id);
        this.getArticle();
    }


    getArticle = () => {
        let data = { id: this.props.match.params.id }

        var jwt = JWT({
            header: 'jwt', // header name to try reading JWT from responses, default to 'jwt'
            local: 'jwt'   // key to store the JWT in localStorage, also default to 'jwt'
        });

        let t = this;

        request
            .get(`http://localhost:4000/articles/${data.id}`)
            .field('data', data)
            .use(jwt)
            .end(function (err, res) {
                console.log(res)
                let content_ex =
                {
                    title: res.body.title,
                    context: res.body.context
                }
                console.log("conent_ex:", content_ex);
                t.setState({ content: content_ex })
                console.log("state:", t.state.content);
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