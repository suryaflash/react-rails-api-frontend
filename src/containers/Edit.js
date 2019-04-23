import React, { Component } from 'react';
import './../App.css';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { NavLink } from "react-router-dom";
import $ from 'jquery';

class Edit extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            content: {
                title: "",
                context: "",
            },
            latest: {
                title: "",
                context: ""
            }
        }
    }


    componentWillMount = () => {
        if (localStorage.getItem('email') == null)
            window.location.href = "/";

        if (this.props.match.params.id !== undefined) {
            let data = {
                id: this.props.match.params.id,
            }

            let token = "Bearer " + localStorage.getItem("jwt")
            $.ajax({
                url: "http://localhost:4000/articles/findEdit",
                type: "POST",
                data: data,
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
                context: this,
                success: function (result) {
                    let content_ex =
                    {
                        title: result.title,
                        context: result.context
                    }
                    console.log("recieved to put in edit:", content_ex);
                    this.setState({ content: content_ex })
                }
            })
        }

        let data = {
            id: this.props.match.params.id,
        }



        let token = "Bearer " + localStorage.getItem("jwt")
        $.ajax({
            url: "http://localhost:4000/articles/latest",
            type: "POST",
            data: data,
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
            context: this,
            success: function (result) {
                let latest1 =
                {
                    title: result.title,
                    context: result.context
                }
                console.log("recieved to put in latest:", latest1);
                this.setState({ latest: latest1 })
            }
        })
    }

    handleChange = (e) => {
        let { content } = this.state;
        content[e.target.name] = e.target.value;
        this.setState({ content });
    }


    addContent = () => {
        let data =
        {
            id: this.props.match.params.id,
            title: this.state.content.title,
            context: this.state.content.context,
        }
        console.log("data:", data);

        let token = "Bearer " + localStorage.getItem("jwt")
        $.ajax({
            url: "http://localhost:4000/articles/update",
            type: "POST",
            data: data,
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
            context: this,
            success: function (result) {
                console.log(result)
            }
        })
        window.location.href = "/articles/";

        let content1 =
        {
            title: "",
            context: "",
        };
        this.setState({ content: content1 });
    }

    editArticle = () => {
        let data =
        {
            id: this.props.match.params.id,
            title: this.state.content.title,
            context: this.state.content.context,
        }

        let token = "Bearer " + localStorage.getItem("jwt")
        $.ajax({
            url: "http://localhost:4000/articles/edit",
            type: "POST",
            data: data,
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
            context: this,
            success: function (result) {
                console.log("after edit clicked:", result)
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

                <Alert color="info" style={{ marginTop: "30px" }}>
                    Create An Article
                </Alert>
                <div>

                    <Form className="formGroup">
                        <FormGroup>
                            <Label >Title</Label>
                            <Input name="title" id="exampleType" value={this.state.content.title} onChange={this.handleChange} placeholder="enter title" />

                        </FormGroup>
                        <FormGroup>
                            <Label >Context</Label>
                            <Input name="context" id="exampleContext" value={this.state.content.context} onChange={this.handleChange} placeholder="enter context" />

                        </FormGroup>



                        <Button color="warning" onClick={this.editArticle} style={{ marginRight: "100px" }}>Edit Article</Button>
                        <Button color="success" onClick={this.addContent} >Approve Article</Button>

                    </Form>

                    <div>
                        <p><b> Latest Version</b></p> <br />
                        <p >TITLE : {this.state.latest.title}</p>
                        <br />
                        <p>CONTEXT : {this.state.latest.context}</p>
                    </div>
                </div>
                <NavLink to="/articles"><Button color="primary" style={{ marginLeft: "500px", marginTop: "100px" }} > View All Article </Button></NavLink>

            </div>
        );
    }
}

export default Edit;
