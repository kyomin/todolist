import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            email,
            password
        };

        // loginUser라는 이름의 action을 호출한다
        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess) {
                props.history.push('/');       // 로그인이 성공하면 todo list 랜딩 페이지로 이동한다.
            } else {
                alert(response.payload.message);
            }
        });
    }

    return (
        <div 
            style={{
                display: 'flex', justifyContent: 'center', alignContent: 'center',
                width: '100%', height: '100vh'
            }}
        >
            <form 
                style={{
                    display: 'flex', flexDirection: 'column'
                }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type='email' value={email} onChange={onEmailHandler} required />

                <label>Password</label>
                <input type='password' value={password} onChange={onPasswordHandler} required />

                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage;