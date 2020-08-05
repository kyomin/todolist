import React, {useEffect, useState, Fragment} from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Typography } from 'antd';
import { useSelector } from "react-redux";

import constants from '../../../../utils/constants';

const { Title } = Typography;
const todoTitles = constants.todoTitles;

function DrawTodoList() {
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
        });
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
        return todos[todo.changedFlag].map((todo, idx) => {
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
    
    if(todos && todo) {
        return (
            <div style={{
                    width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    alignContent: 'center'
                }}
            >
                <div style={{
                width: '40%'
                }}>
                    <Title level={1} style={{color: '#40a9ff'}}>{todoTitles[todo.changedFlag]} List</Title>
                    {drawTodoList()}
                </div> 
            </div>
        );
    } else {
        return (
            <Fragment>
                {_loading()}
            </Fragment>
        )
    }
}

export default withRouter(DrawTodoList);