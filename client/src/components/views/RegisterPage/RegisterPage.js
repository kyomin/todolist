import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    }

    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    }

    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert("비밀번호 확인을 정확히 해주십시오!");
            return;
        }

        let requestBody = {
            email,
            password,
            name
        };

        dispatch(registerUser(requestBody))
        .then(res => {
            if(res.payload.success) {
                alert('회원가입을 성공적으로 마쳤습니다');
                props.history.push('/');
            } else {
                alert(res.payload.message);
            }
        })
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

                    <label>Name</label>
                    <input type='text' value={name} onChange={onNameHandler} required />

                    <label>Password</label>
                    <input type='password' value={password} onChange={onPasswordHandler} required />

                    <label>Confirm Password</label>
                    <input type='password' value={confirmPassword} onChange={onConfirmPasswordHandler} required />

                    <br />

                    <button>
                        회원가입
                    </button>
                </form>
                
                <a style={{textDecoration: 'none'}} href = '/login'>
                    <button style={{
                        display: 'block', width: '100%', textAlign: 'center'
                    }}>
                        취소
                    </button>
                </a>
            </div>
        </div>
    )
}

export default RegisterPage;