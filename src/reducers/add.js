export default (state = {}, action) => {
    
    switch (action.type) {
        case 'update':
            return { data: action.payload }

        case 'add':
            return { data: 'added' }

        default:
            return state;
    }
};
