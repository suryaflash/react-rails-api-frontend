import axios from 'axios';
import $ from 'jquery';


const reducer = function (state = {}, action) {
    switch (action.type) {
        case 'signIn':
            axios.post('http://localhost:4000/user/sign_in', action.payload)
                .then((response) => {
                    console.log(response);
                    if (response.data.jwt !== null) {
                        console.log("here")
                        localStorage.setItem('email', action.payload.auth.email);
                        localStorage.setItem('jwt', response.data.jwt);
                        window.location.href = "/articles/new";
                    }
                    else
                        window.alert("Invalid Credentials");
                })
                .catch(function (error) {
                    console.log(error)
                })
            break;

        case 'signUp':
            axios.post('http://localhost:4000/user/sign_up', action.payload)
                .then((response) => {
                    console.log(response);
                    window.location.href = "/";
                })
                .catch(function (error) {
                    console.log(error)
                })
            break;

        case 'update':
            let token = "Bearer " + localStorage.getItem("jwt")
            $.ajax({
                url: "http://localhost:4000/articles/update",
                type: "POST",
                data: action.payload,
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
                context: this,
                success: function (result) {
                    console.log(result)
                }
            })
            break;

        case 'add':
            let tokenn = "Bearer " + localStorage.getItem("jwt");
            $.ajax({
                url: "http://localhost:4000/articles",
                type: "POST",
                data: action.payload,
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', tokenn) },
                context: this,
                success: function (result) {
                    console.log(result)
                }
            })

            return { data: 'added' }


        default:
            console.log("default came")
            return state;
    }
}

export default reducer;