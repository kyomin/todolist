import { CHANGE_FLAG, GET_TODOS, CREATE_TODO } from '../_actions/types';

export default function (state={}, action) {
    switch(action.type) {
        case CHANGE_FLAG:
            return { ...state, currentFlag: action.payload }
            break;

        case GET_TODOS:
            return { ...state, todoLists: action.payload }
            break;

        case CREATE_TODO:
            return { ...state, createSuccess: action.payload }
            break;

        default:
            return state
    }
}