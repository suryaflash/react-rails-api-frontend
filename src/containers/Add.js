import React, { Component } from 'react';
import './../App.css';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { NavLink } from "react-router-dom";
import $ from 'jquery';
import { connect } from "react-redux";

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

  componentWillMount = () => {
    if (localStorage.getItem('email') == null)
      window.location.href = "/";

    if (this.props.match.params.id !== undefined) {
      let data = { id: this.props.match.params.id }
      let token = "Bearer " + localStorage.getItem("jwt")
      $.ajax({
        url: "http://localhost:4000/articles/find",
        type: "POST",
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
        }
      })
    }
  }

  handleChange = (e) => {
    let { content } = this.state;
    content[e.target.name] = e.target.value;
    this.setState({ content });
  }

  addContent = () => {
    if (this.props.match.params.id !== undefined) {
      let data =
      {
        id: this.props.match.params.id,
        title: this.state.content.title,
        context: this.state.content.context,
      }
      this.props.dispatch({ type: 'update', payload: data })
    }
    else {
      let data =
      {
        title: this.state.content.title,
        context: this.state.content.context,
      }
      this.props.dispatch({ type: 'add', payload: data })
    }
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



          <Button color="success" onClick={this.addContent}>Submit Article</Button>

        </Form>
        <NavLink to="/articles"><Button color="primary" style={{ marginLeft: "500px", marginTop: "100px" }} > View All Article </Button></NavLink>

      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('add', state);
  return {
    data: state.data
  }
}

export default connect(mapStateToProps)(Add);
