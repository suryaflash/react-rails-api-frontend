import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Alert, Table, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

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

        this.getAllArticle();

    }

    getAllArticle = () => {
        axios.get('http://localhost:4000/article/index')
            .then((response) => {

                console.log("data:", response.data)
                this.setState({ contents: response.data }, () => {
                    console.log("state data:", this.state.contents);
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    deleteHandler = (index) => {
        let data = { id: index }
        console.log("hiee");
        axios.post('http://localhost:4000/article/delete', data)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        this.getAllArticle();
    }

    render() {
        return (
            <div className="container">
                <Alert color="info">
                    View All Articles
      </Alert>
                <div className="container">

                <Table dark>
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
                                <td><NavLink to={"/add/" + obj.id}> Edit </NavLink></td>
                                <td> <Button outline color="danger" onClick={() => this.deleteHandler(obj.id)}>Delete</Button> </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
</div>

        );
    }
}

export default All;
