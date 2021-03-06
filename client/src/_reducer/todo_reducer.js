import { CHANGE_FLAG, CHANGE_INDEX_Of_CLICKED_UPDATE_BUTTON, GET_TODOS, CREATE_TODO, UPDATE_TODO, DELETE_TODO } from '../_actions/types';

export default function (state={}, action) {
    switch(action.type) {
        case CHANGE_FLAG:
            return { ...state, currentFlag: action.payload }
            break;

        case CHANGE_INDEX_Of_CLICKED_UPDATE_BUTTON:
            return { ...state, indexOfClickedUpdateBtn: action.payload }
            break;

        case GET_TODOS:
            return { ...state, todoLists: action.payload }
            break;

        case CREATE_TODO:
            return { ...state, createSuccess: action.payload }
            break;

        case UPDATE_TODO:
            return { ...state, updateSuccess: action.payload }
            break;

        case DELETE_TODO:
            return { ...state, deleteSuccess: action.payload }
            break;

        default:
            return state
    }
}