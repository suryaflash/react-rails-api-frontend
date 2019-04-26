import axios from 'axios';
export default (state = {}, action) => {
    switch (action.type) {
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

        default:
            return state;
    }
}
