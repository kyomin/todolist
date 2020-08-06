import axios from 'axios';
import { CHANGE_FLAG, CHANGE_INDEX_Of_CLICKED_UPDATE_BUTTON, GET_TODOS, CREATE_TODO, UPDATE_TODO, DELETE_TODO } from './types';

export function changeFlag(flag) {
    return {
        type: CHANGE_FLAG,
        payload: flag
    };
}

export function changeIndexOfClickedUpdateBtn(idx) {
    return {
        type: CHANGE_INDEX_Of_CLICKED_UPDATE_BUTTON,
        payload: idx
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

export function updateTodo(id, dataToSubmit) {
    const request = axios.put(`/api/todo/${id}`, dataToSubmit)
    .then(res => res.data);

    return {
        type: UPDATE_TODO,
        payload: request
    };
}

export function deleteTodo(id) {
    const request = axios.delete(`/api/todo/${id}`)
    .then(res => res.data);

    return {
        type: DELETE_TODO,
        payload: request
    };
}