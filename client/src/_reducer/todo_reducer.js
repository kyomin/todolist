import { CHANGE_FLAG } from '../_actions/types';

export default function (state={}, action) {
    switch(action.type) {
        case CHANGE_FLAG:
            return { ...state, changedFlag: action.payload }
            break;

        default:
            return state
    }
}