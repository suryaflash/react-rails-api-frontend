export default (state = {}, action) => {
    var request = require('superagent');
    var JWT = require('superagent-jwt');
    var jwt = JWT({
        header: 'jwt',
        local: 'jwt'
    });
    switch (action.type) {
        case 'Delete':
            window.location.href = '/articles';
            return { data: "deleted" }

        case 'GetArticles':
            let array = []
            const obj = {}
            request
                .get('/articles')
                .use(jwt)
                .end(function (err, res) {
                    array = res.body.slice();
                    obj.arr = [...array];
                });
            return obj;

        case 'error':
            return { data: 'error occured' }
        default:
            return state;
    }
};
