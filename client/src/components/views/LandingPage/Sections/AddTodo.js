import React, {useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getTodos, createTodo } from '../../../../_actions/todo_action';


const todoPlaceholders = [
    "할 일을 작성해 주세요", 
    "진행 중인 일을 작성해 주세요", 
    "완료된 일을 작성해 주세요"
];

function AddTodo(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const todo = useSelector(state => state.todo);
    const [todoDescription, setTodoDescription] = useState("");

    const handleChange = (e) => {
        setTodoDescription(e.currentTarget.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(todoDescription === "") {
            alert("글을 입력해 주십시오!");
            return;
        }

        const requestBody = {
            userId: user.userData.id,
            description: todoDescription,
            flag: todo.currentFlag
        };

        /* 1. 먼저 할 일 등록을 마치고 */
        await dispatch(createTodo(requestBody))
        .then(res => {
            if(!res.payload.success) {
                alert('할 일 등록에 실패했습니다');
            }
        });

        /* 2. 업데이트 된 리스트를 새로 불러온다. */
        dispatch(getTodos());

        setTodoDescription("");
    }

    // 리덕스 스토어에서 필요 데이터들 꺼내오기를 기다린다.
    if(user.userData && user.userData.isAuth && todo) {
        return (
            <div>
                <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={todoDescription}
                        placeholder={todoPlaceholders[todo.currentFlag]}
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={handleSubmit}>등록</button>
                </form>
            </div>
        );
    } else {
        return (
            <Fragment></Fragment>
        );
    }
}

export default withRouter(AddTodo);