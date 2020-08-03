import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { Form, Input, Typography, Button } from 'antd';

const { Title } = Typography;

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

        console.log('form submit 이벤트에 진입!')

        let requestBody = {
            email,
            password
        };

        dispatch(loginUser(requestBody))
        .then(res => {
            console.log('login response : ', res);
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
                <Title level={2} style={{color: '#40a9ff'}}>Log In</Title>
                <form 
                    style={{
                        display: 'flex', flexDirection: 'column', marginBottom: '1%'
                    }}
                    onSubmit={onSubmitHandler}
                >
                    <Form.Item>
                        <label>Email</label>
                        <Input
                            id="email"
                            placeholder="이메일을 입력하십시오!"
                            type="email"
                            value={email}
                            onChange={onEmailHandler}
                            required
                        />
                    </Form.Item>

                    <Form.Item>
                        <label>Password</label>
                        <Input
                            id="password"
                            placeholder="비밀번호를 입력하십시오!"
                            type="password"
                            value={password}
                            onChange={onPasswordHandler}
                            required
                        />
                    </Form.Item>
                    <br />

                    <Button type="primary" htmlType="submit">
                        로그인
                    </Button>
                </form>
                
                <a style={{textDecoration: 'none'}} href = '/register'>
                    <Button style={{
                        display: 'block', width: '100%', textAlign: 'center'
                    }}>
                        회원가입
                    </Button>
                </a>
            </div>
        </div>
    )
}

export default withRouter(LoginPage);