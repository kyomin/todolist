import { CHANGE_FLAG } from './types';

export function changeFlag(flag) {
    return {
        type: CHANGE_FLAG,
        payload: flag
    };
}