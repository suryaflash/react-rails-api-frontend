import axios from 'axios';
export default (state = {}, action) => {
    switch (action.type) {

        case 'signIn':
            axios.post('http://localhost:4000/user/sign_in', action.payload)
                .then((response) => {
                    console.log(response);
                    if (response.data.jwt !== null) {
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

        default:
            return state;
    }
};
