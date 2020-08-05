import axios from 'axios';
import { CHANGE_FLAG, GET_TODOS, CREATE_TODO } from './types';

export function changeFlag(flag) {
    return {
        type: CHANGE_FLAG,
        payload: flag
    };
}

export function getTodos() {
    const request = axios.get('/api/todo')
    .then(res => res.data.todos);

    return {
        type: GET_TODOS,
        payload: request
    };
}

export function createTodo(dataToSubmit) {
    const request = axios.post('/api/todo', dataToSubmit)
    .then(res => res.data)

    return {
        type: CREATE_TODO,
        payload: request
    };
}