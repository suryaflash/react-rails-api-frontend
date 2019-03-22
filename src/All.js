import React, { Component } from 'react';
import './App.css';
import { Alert, Table, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import $ from 'jquery'; 

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
        if(localStorage.getItem('email') == null )
        window.location.href = "/";
        this.getAllArticle();

    }

    getAllArticle = () => {
        let token = "Bearer " + localStorage.getItem("jwt")
        $.ajax({
            url: "http://localhost:4000/article/index",
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', token)},
            context: this,
            success: function (result) {
              console.log(result)
              this.setState({contents: result})
            }
          })

        // let token = "Bearer " + localStorage.getItem("jwt")
        // axios.get('http://localhost:4000/article/index')
        //     .then((response) => {

        //         console.log("data:", response)
        //         this.setState({ contents: response.data }, () => {
        //             console.log("state data:", this.state.contents);
        //         })
        //     })
        //     .catch(function (error) {
        //         console.log(error)
        //     })
    }

    deleteHandler = (index) => {

        let data = { id: index }
        let token = "Bearer " + localStorage.getItem("jwt")
        $.ajax({
            url: "http://localhost:4000/article/delete",
            type: "POST",
            data: data,
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', token)},
            context: this,
            success: function (result) {
              console.log(result)
            }
          })



        // let data = { id: index }
        // console.log("hiee");
        // axios.post('http://localhost:4000/article/delete', data)
        //     .then(function (response) {
        //         console.log(response)
        //     })
        //     .catch(function (error) {
        //         console.log(error)
        //     })

        this.getAllArticle();
    }

    logout =() =>
    {
      localStorage.removeItem('email');
      localStorage.removeItem('jwt');
      window.location.href="/";
    }

    render() {
        return (
            <div className="container">

      <p style = {{float:"right"}}> Hi , {(localStorage.getItem('email'))}
      <Button color="danger" style = {{marginLeft:"20px"}}onClick={this.logout}>LogOut</Button> 
      </p>
      <br/>
      <br/>

                <div >
                    <Alert color="info">
                        View All Articles
                    </Alert>
                    
                </div>
                <div className="container">

                    <Table borderless>
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

                <NavLink to="/Add"><Button color="primary" style={{ marginLeft: "500px", marginTop: "100px" }} > Add An Article </Button></NavLink>

            </div>

        );
    }
}

export default All;
