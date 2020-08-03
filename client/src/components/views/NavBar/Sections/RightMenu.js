import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { Menu } from 'antd';
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';

function RightMenu(props) {
    const user = useSelector(state => state.user);

    const [flag, setFlag] = useState(0);

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

    const onTodoStateHandler = (e) => {
        // setFlag(clickedFlag);
        console.log("current flag : ", e.currentTarget.getAttribute('value'));
    }

  // 로그인 한 사람들
  if (user.userData && user.userData.isAuth) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="todo">
                <a value={0} onClick={onTodoStateHandler}>todo</a>
            </Menu.Item>
            <Menu.Item key="doing">
                <a value={1} onClick={onTodoStateHandler}>doing</a>
            </Menu.Item>
            <Menu.Item key="done">
                <a value={2} onClick={onTodoStateHandler}>done</a>
            </Menu.Item>
            <Menu.Item key="logout">
                <a onClick={onLogoutHandler}>logout</a>
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