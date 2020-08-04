import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

import DrawTodoList from './Sections/DrawTodoList';
import constants from '../../../utils/constants';

const todoTitles = constants.todoTitles;

function LandingPage(props) {
    const todo = useSelector(state => state.todo);
    const [todos, setTodos] = useState(false);
     
    useEffect(() => {
        axios.get('/api/todo')
        .then(res => {
            // 데이터를 잘 가져온 경우!
            if(res.data.getTodosSuccess) {
                setTodos(res.data.todos);
            } else {    // 그 외에는 인증이 실패했거나 DB error로 인해 가져오지 못 한 경우이다.
                alert(res.data.message);
            }
        })
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
    
    if(todos) {
        if(todo) {
            return (
                <DrawTodoList
                    todoList={todos[todo.changedFlag]}
                    title={todoTitles[todo.changedFlag]}
                />
            );
        } else {
            return (
                <Fragment>
                    {_loading()}
                </Fragment>
            );
        }
    } else {
        return (
            <Fragment>
                {_loading()}
            </Fragment>
        );
    }
}

export default withRouter(LandingPage);