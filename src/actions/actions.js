import axios from 'axios';

export const onUpdateasync = (data) => {
    return { type: 'update', payload: data }
};


export const onUpdate = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:4000/articles/update', data)
            .then((res) => {
                console.log(res)
                dispatch(onUpdateasync(data))
            })
            .catch((err) => {
                console.log("error:", err);
            })
    }
}

export const onAddasync = (dataa) => {
    return { type: 'add', payload: dataa }
};


export const onAdd = (data) => {
    return (dispatch) => {
        var header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
        axios.post('http://localhost:4000/articles', data, { headers: header })
            .then((res) => {
                console.log(res)
                window.alert("article is added");
                dispatch(onAddasync(data))
            })
            .catch((err) => {
                console.log("error:", err);
            })
    }
}

export const onDeleteasync = (id) => {
    return { type: 'Delete', payload: id }
};

export const onDelete = id => {
    return (dispatch) => {
        var header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
        axios.delete(`http://localhost:4000/articles/${id}`, { headers: header })
            .then((res) => {
                console.log(res)
                dispatch(onDeleteasync(id))
                dispatch(onGetAllArticle())
            })
            .catch((err) => {
                console.log("error:", err);
            })
    }
}


export const onGetAllArticle = () => {
    return { type: 'GetArticles', payload: {} }
};




