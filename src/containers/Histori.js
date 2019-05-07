import React, { Component } from 'react';
import './../App.css';
import { Alert, Button, Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';
var request = require('superagent');
var JWT = require('superagent-jwt');

class Histori extends Component {
    constructor() {
        super();
        this.state = {
            content: {
                title: '',
                context: '',
            },
            history: []
        }
    }

    componentWillMount = (e) => {
        if (localStorage.getItem('email') == null)
            window.location.href = "/";
        this.getHistory();
    }


    getHistory = () => {

        let data = { id: this.props.match.params.id }
        var t = this;
        var jwt = JWT({
            header: 'jwt',
            local: 'jwt'
        });

        request
            .post('/articles/history')
            .field('id', data.id)
            .use(jwt)
            .end(function (err, result) {
                t.setState({ history: result.body })
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

                <div >
                    <Alert color="info"> Article History </Alert>
                </div>

                <Table borderless>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Context</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.history.map((obj, index) => (
                            <tr key={index}>

                                <td> {index} </td>
                                {index !== 0 ?
                                    <div>
                                        {this.state.history[index - 1].title !== obj.title ?
                                            <td><b>{obj.title}</b></td> :
                                            <td>{obj.title}</td>}
                                    </div>
                                    :
                                    <td> {obj.title}</td>
                                }
                                <td>
                                    {index !== 0 ?
                                        <div>
                                            {this.state.history[index - 1].context !== obj.context ?
                                                <td><b>{obj.context}</b></td> :
                                                <td>{obj.context}</td>}
                                        </div>
                                        :
                                        <td>{obj.context}</td>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div>
                    <NavLink to="/articles/new"><Button color="primary" style={{ marginLeft: "400px", marginTop: "100px" }} > Add An Article </Button></NavLink>
                    <NavLink to="/articles"><Button color="info" style={{ marginLeft: "550px", marginTop: "-65px" }} > View All Article </Button></NavLink>
                </div>


            </div>

        );
    }
}

export default Histori;
