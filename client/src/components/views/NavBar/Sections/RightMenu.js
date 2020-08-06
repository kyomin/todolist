import React, { Fragment } from 'react';
import axios from 'axios';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
    const user = useSelector(state => state.user);
    
    const onLogoutHandler = () => {
        axios.get('/api/user/logout')
        .then(res => {
            if(res.data.logoutSuccess) {
                alert('로그아웃 되었습니다.');
                props.history.push('/login');
            } else {
                alert('로그아웃에 실패했습니다.');
            }
        });
    }

    // 로그인 한 사람들
    if(user.userData && user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="update">
                    <a href='/update'>비밀번호 변경</a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={onLogoutHandler}>로그아웃</a>
                </Menu.Item>
            </Menu>
        )
    } else {  // 로그인 안 한 사람들
        return (
        <Fragment></Fragment>
        )
    }
}

export default withRouter(RightMenu);