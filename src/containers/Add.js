import React, { Component } from 'react';
import './../App.css';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from '../actions/actions.js';

var request = require('superagent');
var JWT = require('superagent-jwt');

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
      var jwt = JWT({
        header: 'jwt', // header name to try reading JWT from responses, default to 'jwt'
        local: 'jwt'   // key to store the JWT in localStorage, also default to 'jwt'
      });

      let t = this;

      request
        .post('http://localhost:4000/articles/find')
        .field('data', data)
        .use(jwt)
        .end(function (err, res) {
          console.log("hieee", res)
          let content_ex =
          {
            title: res.title,
            context: res.context
          }
          console.log("conent_ex:", content_ex);
          t.setState({ content: content_ex })
        });
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
      this.props.onUpdate(data);
      let content1 =
      {
        title: "",
        context: ""
      }
      console.log("its here");
      this.setState({content:content1})
    }
    else {
      let dataa =
      {
        title: this.state.content.title,
        context: this.state.content.context,
        jwt:localStorage.getItem('jwt')
      }
      this.props.onAdd(dataa);
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
  console.log("after add reducer :",state.add.data)
  return {
    data: state.data
  }
}

const mapDispachToProps = dispatch => {
  return {
    onUpdate: (data) => dispatch(actionCreator.onUpdate(data)),
    onAdd: (dataa) => dispatch(actionCreator.onAdd(dataa))
  };
};

export default connect(mapStateToProps,mapDispachToProps)(Add);
