var request = require('superagent');
var JWT = require('superagent-jwt');
var jwt = JWT({
    header: 'jwt',
    local: 'jwt'
});
export default (state = {}, action) => {
    switch (action.type) {
        case 'signUp':
            request
                .post('/user/sign_up')
                .use(jwt)
                .field(action.payload)
                .end(function (err, res) {
                    window.location.href = "/"
                });
            return state;

        default:
            return state;
    }
}
