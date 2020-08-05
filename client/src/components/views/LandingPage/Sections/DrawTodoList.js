import React, {useEffect, useState, Fragment} from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Typography } from 'antd';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getTodos } from '../../../../_actions/todo_action';

import AddTodo from './AddTodo';

const { Title } = Typography;
const todoTitles = ["할 일", "진행 중인 일", "완료된 일"];

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
                <div 
                    key={idx} 
                    style={{
                        marginBottom: '30px', fontSize: '18px', cursor: 'pointer',
                        borderBottom: '1px solid gray'
                    }}
                >
                    <div>
                        <span style={{color: 'red', fontWeight: '300', marginRight: '10px'}}>{idx+1}. </span>{todo.description}
                    </div>
                </div>
            );
        });
    }
    
    if(todoLists && flag) {
        return (
            <div style={{
                    width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    alignContent: 'center'
                }}
            >
                <div style={{
                width: '40%'
                }}>
                    <Title level={1} style={{color: '#40a9ff'}}>{todoTitles[flag]} 목록</Title>
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