export default (state = {}, action) => {

    switch (action.type) {

        case 'add':
            return { data: 'added' }

        case 'error':
            return { data: 'error occured' }

        default:
            return state;
    }
};
