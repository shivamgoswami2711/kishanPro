export const initalState = {
    user:[{hello:'hey'}]
}
const reducer = (state, action) =>  {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                user: [...state.user, ...action.id],
            };
            default:
                return { ...state.user,...action.id}
        }
};
export default reducer
