import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { changeIndexOfClickedUpdateBtn, getTodos, createTodo, updateTodo } from '../../../../../_actions/todo_action';
import { Button } from 'antd';

import './UpdateTodo.scss';

function UpdateTodo(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const flag = useSelector(state => state.todo.currentFlag) || '0';
    const todoLists = useSelector(state => state.todo.todoLists);
    const indexOfClickedUpdateBtn = useSelector(state => state.todo.indexOfClickedUpdateBtn);

    const [todoDescription, setTodoDescription] = useState(props.description);

    const handleChange = (e) => {
        setTodoDescription(e.currentTarget.value);
    }

    const handleCancel = () => {
        dispatch(changeIndexOfClickedUpdateBtn(-1));
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        if(todoDescription === "") {
            alert("글을 입력해 주십시오!");
            return;
        }

        const requestBody = {
            description: todoDescription
        };

        const requestParam = todoLists[flag][indexOfClickedUpdateBtn].id

        /* 1. 먼저 할 일 수정을 마치고 */
        await dispatch(updateTodo(requestParam, requestBody))
        .then(res => {
            if(!res.payload.updateSuccess) {
                alert('할 일 수정에 실패했습니다');
            }
        });

        /* 2. 업데이트 된 리스트를 새로 불러온다. */
        await dispatch(getTodos());

        /* 3. 수정 버튼이 눌리지 않은 상태로 초기화 */
        await dispatch(changeIndexOfClickedUpdateBtn(-1));
    }

    // 리덕스 스토어에서 렌더링에 필요한 데이터들을 꺼내오기 기다린다.
    if(user.userData && user.userData.isAuth && todoLists && flag) {
        return (
            <div className='update_todo_wrap'>
                <form className='update_form' onSubmit={handleUpdate}>
                    <textarea
                        className='description'
                        onChange={handleChange}
                        value={todoDescription}
                    />
                    <br />
                    <Button className='update_btn' onClick={handleUpdate}>수정</Button>
                    <Button className='cancel_btn' onClick={() => handleCancel()}>취소</Button>
                </form>
            </div>
        );
    } else {
        return (
            <Fragment></Fragment>
        );
    }
}

export default withRouter(UpdateTodo);