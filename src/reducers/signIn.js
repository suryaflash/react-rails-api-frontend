import axios from 'axios';
import sweeta from 'sweetalert';
export default (state = {}, action) => {
    switch (action.type) {

        case 'signIn':
            axios.post('/user/sign_in', action.payload)
                .then((response) => {
                    if (response.data.jwt !== null) {
                        localStorage.setItem('email', action.payload.auth.email);
                        localStorage.setItem('jwt', response.data.jwt);
                        window.location.href = '/articles/new'
                        return { data: "yes" }
                    }  
                })
                .catch(function (error) {
                    sweeta("Oh Noez! " ,  "Invalid credentials  !" ,  "error" );
                })
            return state;
        default:
            return state;
    }
};
