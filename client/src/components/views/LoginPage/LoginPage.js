import React, { useState } from 'react';
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

        let requestBody = {
            email,
            password
        };

        dispatch(loginUser(requestBody))
        .then(res => {
            if(res.payload.loginSuccess) {
                props.history.push('/');       // 로그인이 성공하면 todo list 랜딩 페이지로 이동한다.
            } else {
                alert(res.payload.message);
            }
        });
    }

    return (
        <div 
            style={{
                width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
                alignContent: 'center'
            }}
        >
            <div style={{
                width: '20%'
            }}>
                <form 
                    style={{
                        display: 'flex', flexDirection: 'column', marginBottom: '1%'
                    }}
                    onSubmit={onSubmitHandler}
                >
                    <label>Email</label>
                    <input type='email' value={email} onChange={onEmailHandler} required />

                    <label>Password</label>
                    <input type='password' value={password} onChange={onPasswordHandler} required />

                    <br />

                    <button>
                        로그인
                    </button>
                </form>
                
                <a style={{textDecoration: 'none'}} href = '/register'>
                    <button style={{
                        display: 'block', width: '100%', textAlign: 'center'
                    }}>
                        회원가입
                    </button>
                </a>
            </div>
        </div>
    )
}

export default LoginPage;