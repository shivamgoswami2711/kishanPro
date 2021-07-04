export const initalState = {
    user:['shivam']
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'inc':
            console.log(state)
            return {
                ...state,
                user:[...state.user,action.id]
            };
        default:
            return state;
    };
}
export default reducer
