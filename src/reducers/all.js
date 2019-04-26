export default (state = {}, action) => {
    var request = require('superagent');
    var JWT = require('superagent-jwt');
    var jwt = JWT({
        header: 'jwt', // header name to try reading JWT from responses, default to 'jwt'
        local: 'jwt'   // key to store the JWT in localStorage, also default to 'jwt'
    });
    switch (action.type) {
        case 'Delete':
            return { data: "deleted" }

        case 'GetArticles':
            let array = []
            const obj = {}
            request
                .get('http://localhost:4000/articles')
                .use(jwt)
                .end(function (err, res) {
                    array = res.body.slice();
                    obj.arr = [...array];
                });
            return obj;
        default:
            return state;
    }
};
