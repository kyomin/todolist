/* 루트 리듀서를 정의한다. 여러 리듀서를 컴바인 해준다. */
import { combineReducers } from 'redux';
import user from './user_reducer';
import todo from './todo_reducer';

const rootReducer = combineReducers({
    user,
    todo
});

export default rootReducer;