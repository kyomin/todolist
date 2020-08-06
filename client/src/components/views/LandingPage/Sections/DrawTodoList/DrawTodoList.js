import React, { useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getTodos } from '../../../../../_actions/todo_action';

import './DrawTodoList.scss';
import TodoTab from '../TodoTab/TodoTab';
import AddTodo from '../AddTodo/AddTodo';

function DrawTodoList() {
    const dispatch = useDispatch();
    const flag = useSelector(state => state.todo.currentFlag) || '0';   // 탭을 클릭하지 않으면 리덕스 스토어에 저장되지 않으므로 디폴트로 0(할 일)
    const todoLists = useSelector(state => state.todo.todoLists);

    useEffect(() => {
        dispatch(getTodos());
    }, []);

    const _loading = () => {
        return (
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '100%', height: '100vh'
            }}>
                ...loading
            </div>
        );
    }

    const drawTodoList = () => {
        return todoLists[flag].map((todo, idx) => {
            return (
                <div key={idx} className='todo_wrap'>
                    <div>
                        <span className='todo_index'>{idx+1}. </span>{todo.description}
                    </div>
                </div>
            );
        });
    }
    
    if(todoLists && flag) {
        return (
            <div className='todo_list_wrap'>
                <div className='container'>
                    <TodoTab />
                    {drawTodoList()}
                    <AddTodo />
                </div> 
            </div>
        );
    } else {
        return (
            <Fragment>
                {_loading()}
            </Fragment>
        );
    }
}

export default withRouter(DrawTodoList);