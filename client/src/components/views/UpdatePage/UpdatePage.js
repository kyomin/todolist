import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../_actions/user_action';
import { Form, Input, Typography, Button } from 'antd';

const { Title } = Typography;

function UpdatePage(props) {
    const dispatch = useDispatch();

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const onNewPasswordHandler = (e) => {
        setNewPassword(e.currentTarget.value);
    }

    const onConfirmNewPasswordHandler = (e) => {
        setConfirmNewPassword(e.currentTarget.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(newPassword !== confirmNewPassword) {
            alert("새 비밀번호 확인을 정확히 해주십시오!");
            return;
        }

        let requestBody = {
            password: newPassword
        };

        dispatch(updateUser(requestBody))
        .then(res => {
            if(res.payload.updateSuccess) {
                alert('비밀번호 변경을 성공적으로 마쳤습니다');
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
                <Title level={2} style={{color: '#40a9ff'}}>비밀번호 변경</Title>
                <form 
                    style={{
                        display: 'flex', flexDirection: 'column', marginBottom: '1%'
                    }}
                    onSubmit={onSubmitHandler}
                >
                    <Form.Item>
                        <label>새 비밀번호</label>
                        <Input
                            id="new_password"
                            placeholder="새 비밀번호를 입력하십시오!"
                            type="password"
                            value={newPassword}
                            onChange={onNewPasswordHandler}
                            required
                        />
                    </Form.Item>

                    <Form.Item>
                        <label>새 비밀번호 확인</label>
                        <Input
                            id="confirm_new_password"
                            placeholder="새 비밀번호를 다시 입력하십시오!"
                            type="password"
                            value={confirmNewPassword}
                            onChange={onConfirmNewPasswordHandler}
                            required
                        />
                    </Form.Item>
                    <br />

                    <Button type="primary" htmlType="submit">
                        비밀번호 변경
                    </Button>
                </form>
                
                <a style={{textDecoration: 'none'}} href = '/'>
                    <Button style={{
                        display: 'block', width: '100%', textAlign: 'center'
                    }}>
                        취소
                    </Button>
                </a>
            </div>
        </div>
    )
}

export default withRouter(UpdatePage);