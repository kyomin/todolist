import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {
    const [todos, setTodos] = useState({});

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

    // 리덕스 스토어에서 user 데이터를 가져올 때까지 기다려준다.
    if(todos) {
        return (
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '100%', height: '100vh'
            }}>
                
            </div>
        );
    } else {
        return (
            <div>...loading</div>
        );
    }
}

export default withRouter(LandingPage);