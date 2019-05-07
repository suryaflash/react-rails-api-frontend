import React, { Component } from 'react';
import './../App.css';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from '../actions/actions.js';


class Add extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      content: {
        title: "",
        context: "",
      },
    }
  }

  componentWillMount() {
    if (localStorage.getItem('email') == null)
      window.location.href = "/";
  }


  handleChange = (e) => {
    let { content } = this.state;
    content[e.target.name] = e.target.value;
    this.setState({ content });
  }

  addContent = () => {
    let dataa =
    {
      title: this.state.content.title,
      context: this.state.content.context,
      jwt: localStorage.getItem('jwt')
    }
    this.props.onAdd(dataa);
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
        <Form>
          <FormGroup>
            <Label >Title</Label>
            <Input name="title" id="exampleType" value={this.state.content.title} onChange={this.handleChange} placeholder="enter title" />

          </FormGroup>
          <FormGroup>
            <Label >Context</Label>
            <Input name="context" id="exampleContext" value={this.state.content.context} onChange={this.handleChange} placeholder="enter context" />

          </FormGroup>

          <Button color="success" name="submit" onClick={() => this.addContent()}>Submit Article</Button>

        </Form>
        <NavLink to="/articles"><Button color="primary" style={{ marginLeft: "500px", marginTop: "100px" }} > View All Article </Button></NavLink>

      </div>
    );
  }
}

const mapDispachToProps = dispatch => {
  return {
    onAdd: (dataa) => dispatch(actionCreator.onAdd(dataa))
  };
};

export default connect(null, mapDispachToProps)(Add);
