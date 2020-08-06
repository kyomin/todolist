import React, { useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getTodos, deleteTodo } from '../../../../../_actions/todo_action';
import { Button } from 'antd';

import './DrawTodoList.scss';
import TodoTab from '../TodoTab/TodoTab';
import AddTodo from '../AddTodo/AddTodo';

function DrawTodoList() {
    const dispatch = useDispatch();
    const flag = useSelector(state => state.todo.currentFlag) || '0';   // 탭을 클릭하지 않으면 리덕스 스토어에 저장되지 않기에 디폴트로 0(할 일) 셋팅
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

    const handleDelete = async (id) => {
        // 1. 먼저 특정 todo를 삭제하고
        await dispatch(deleteTodo(id));

        // 2. 삭제가 반영된 리스트를 새로 불러온다.
        await dispatch(getTodos());
    }

    const drawTodoList = () => {
        return todoLists[flag].map((todo, idx) => {
            return (
                <div key={idx} className='todo_wrap'>
                    <div>
                        <span className='todo_index'>{idx+1}. </span>{todo.description}
                    </div>
                    <div className='btn_container'>
                        <Button type="primary" className='update_btn'>수정</Button>
                        <Button className='delete_btn' onClick={() => handleDelete(todo.id)}>삭제</Button>
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