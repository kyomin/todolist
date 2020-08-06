import React, { useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { changeIndexOfClickedUpdateBtn, getTodos, updateTodo, deleteTodo } from '../../../../../_actions/todo_action';
import { Button } from 'antd';

import './DrawTodoList.scss';
import TodoTab from '../TodoTab/TodoTab';
import AddTodo from '../AddTodo/AddTodo';
import UpdateTodo from '../UpdateTodo/UpdateTodo';

function DrawTodoList() {
    const dispatch = useDispatch();
    const flag = useSelector(state => state.todo.currentFlag) || '0';   // 탭을 클릭하지 않으면 리덕스 스토어에 저장되지 않기에 디폴트로 0(할 일) 셋팅
    const todoLists = useSelector(state => state.todo.todoLists);
    const indexOfClickedUpdateBtn = useSelector(state => state.todo.indexOfClickedUpdateBtn);

    useEffect(() => {
        dispatch(getTodos());
        dispatch(changeIndexOfClickedUpdateBtn(-1));
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

    const handlePrevBtn = async (idx) => {
        const requestBody = {
            changeFlagValue: -1
        };

        const requestParam = todoLists[flag][idx].id

        /* 1. 먼저 할 일을 이전 단계로 이동시키고 */
        await dispatch(updateTodo(requestParam, requestBody))
        .then(res => {
            if(!res.payload.updateSuccess) {
                alert('할 일 수정에 실패했습니다');
            }
        });

        /* 2. 업데이트 된 리스트를 새로 불러온다. */
        await dispatch(getTodos());
    }

    const handleNextBtn = async (idx) => {
        const requestBody = {
            changeFlagValue: 1
        };

        const requestParam = todoLists[flag][idx].id

        /* 1. 먼저 할 일을 이전 단계로 이동시키고 */
        await dispatch(updateTodo(requestParam, requestBody))
        .then(res => {
            if(!res.payload.updateSuccess) {
                alert('할 일 수정에 실패했습니다');
            }
        });

        /* 2. 업데이트 된 리스트를 새로 불러온다. */
        await dispatch(getTodos());
    }

    const handleDelete = async (id) => {
        // 1. 먼저 특정 todo를 삭제하고
        await dispatch(deleteTodo(id));

        // 2. 삭제가 반영된 리스트를 새로 불러온다.
        await dispatch(getTodos());
    }

    const handleUpdateBtnClicked = (idx) => {
        dispatch(changeIndexOfClickedUpdateBtn(idx));
    }

    const drawTodoList = () => {
        return todoLists[flag].map((todo, idx) => {
            if((indexOfClickedUpdateBtn !== -1) && (idx === indexOfClickedUpdateBtn)) {
                return (
                    <div key={idx} className='todo_wrap'>
                        <UpdateTodo description={todo.description} />
                    </div>
                );
            } else {
                return (
                    <div key={idx} className='todo_wrap'>
                        <div>
                            <span className='todo_index'>{idx+1}. </span>{todo.description}
                        </div>
                        <div className='btn_container'>
                            <Button className={flag==='0' ? 'hidden' : 'prev_btn'} onClick={() => handlePrevBtn(idx)}>◁ 이전</Button>
                            <Button className={flag==='2' ? 'hidden' : 'next_btn'} onClick={() => handleNextBtn(idx)}>다음 ▷</Button>
                            <Button className='update_btn' onClick={() => handleUpdateBtnClicked(idx)}>수정</Button>
                            <Button className='delete_btn' onClick={() => handleDelete(todo.id)}>삭제</Button>
                        </div>
                    </div>
                );
            }
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