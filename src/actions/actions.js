import sweeta from 'sweetalert';
var request = require('superagent');
var JWT = require('superagent-jwt');
var jwt = JWT({
    header: 'jwt',
    local: 'jwt'
});

export const onUpdateasync = (data) => {
    return { type: 'update', payload: data }
};


export const onUpdate = (data) => {
    return (dispatch) => {
        request
            .post('/articles/update')
            .use(jwt)
            .field(data)
            .end(function (err, res) {
                if (res) {
                    dispatch(onUpdateasync(data))
                }
                else {
                    dispatch({ type: 'error', error: err });
                }
            });
    }
};

export const onAddasync = (dataa) => {
    return { type: 'add', payload: dataa }
};


export const onAdd = (data) => {
    return (dispatch) => {
        request
            .post('/articles')
            .use(jwt)
            .send(data)
            .end(function (err, res) {
                if (res) {
                    sweeta("Aww Yeah!", "You added an article!!", "success");
                    dispatch(onAddasync(data))
                }
                else {
                    dispatch({ type: 'error', error: err });
                }
            });
    }
};

export const onDeleteasync = (id) => {
    return { type: 'Delete', payload: id }
};

export const onDelete = id => {
    return (dispatch) => {
        request
            .delete(`/articles/${id}`)
            .use(jwt)
            .end(function (err, res) {
                if (res) {
                    dispatch(onGetAllArticle())
                    dispatch(onDeleteasync(id))
                }
                else {
                    dispatch({ type: 'error', error: err });
                }
            });
    }
};


export const onGetAllArticle = () => {
    return { type: 'GetArticles' }
};

export const onFindEdit = (data) => {
    return { type: 'findEdit', payload: data }
};



