var request = require('superagent');
var JWT = require('superagent-jwt');
var jwt = JWT({
    header: 'jwt',
    local: 'jwt'
});

export default (state = {}, action) => {
    switch (action.type) {
        case 'findEdit':
            var header = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            }
            var obj = {}
            request
                .post('/articles/findEdit')
                .use(jwt)
                .field(action.payload)
                .field(header)
                .end(function (err, res) {
                    obj.title = res.body.title;
                    obj.context = res.body.context;
                });
            return obj
        default:
            return state;
    }
};