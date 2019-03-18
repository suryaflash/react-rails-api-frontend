import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input ,Alert} from 'reactstrap';
import {NavLink} from "react-router-dom";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      content: {
        title: "",
        context: ""
      },
    }
  }

  componentWillMount = () =>
  {
    console.log(this.props.match.params.id);
    if(this.props.match.params.id !== undefined)
    {
        let data = {id:this.props.match.params.id}
        axios.post('http://localhost:4000/article/find',data)
        .then( response =>{
            console.log(response)
            let content_ex = 
            {
                title :response.data.title,
                context:response.data.context
            }
            console.log("conent_ex:",content_ex);
            this.setState({content:content_ex})
          })
          .catch(function (error) {
            console.log(error)
          })
    }
  }

  handleChange = (e) => {
    let { content } = this.state;
    content[e.target.name] = e.target.value;
    this.setState({ content });
  }

  addContent = () => {
      if(this.props.match.params.id !== undefined)
      {
        let data= 
        {
            id : this.props.match.params.id,
            title : this.state.content.title,
            context : this.state.content.context
        }
        console.log("data:",data);
        axios.post('http://localhost:4000/article/update',data)
        .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })    
      }
      else
      {
    axios.post('http://localhost:4000/article/new', this.state.content)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
      }
      let content1 = 
      {
          title :"",
          context :"",
      };
      this.setState({content:content1});
  }

  render() {
    return (
      <div className="container">
      <Alert color="info">
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
        <NavLink to="/All"><Button color="primary" style={{ marginLeft: "500px", marginTop: "100px" }} onClick={this.viewAllArticle}> View All Article </Button></NavLink>

      </div>
    );
  }
}

export default Add;
